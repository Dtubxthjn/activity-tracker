// ===========================
// DATA MANAGEMENT
// ===========================

class ActivityTracker {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.checkAuth();
        this.setupEventListeners();
        this.updateCurrentDate();
    }

    // ===========================
    // AUTHENTICATION
    // ===========================

    checkAuth() {
        const savedPassword = localStorage.getItem('userPassword');
        if (savedPassword) {
            this.currentUser = savedPassword;
            this.showDashboard();
        } else {
            this.showLogin();
        }
    }

    login(password) {
        if (!password || password.trim() === '') {
            this.showError('Please enter a password');
            return false;
        }

        const savedPassword = localStorage.getItem('userPassword');
        
        if (!savedPassword) {
            // First time user - create account
            localStorage.setItem('userPassword', password);
            this.currentUser = password;
            this.showDashboard();
            return true;
        } else if (savedPassword === password) {
            // Existing user - correct password
            this.currentUser = password;
            this.showDashboard();
            return true;
        } else {
            // Wrong password
            this.showError('Incorrect password');
            return false;
        }
    }

    logout() {
        this.currentUser = null;
        this.showLogin();
    }

    showError(message) {
        const errorElement = document.getElementById('loginError');
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        setTimeout(() => {
            errorElement.classList.remove('show');
        }, 3000);
    }

    // ===========================
    // SCREEN MANAGEMENT
    // ===========================

    showLogin() {
        document.getElementById('loginScreen').classList.add('active');
        document.getElementById('dashboardScreen').classList.remove('active');
        document.getElementById('password').value = '';
    }

    showDashboard() {
        document.getElementById('loginScreen').classList.remove('active');
        document.getElementById('dashboardScreen').classList.add('active');
        this.loadDashboard();
    }

    // ===========================
    // DASHBOARD
    // ===========================

    loadDashboard() {
        this.updateWelcomeMessage();
        this.loadTodayActivity();
        this.loadHistory();
    }

    updateCurrentDate() {
        const dateElement = document.getElementById('currentDate');
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }

    updateWelcomeMessage() {
        const messageElement = document.getElementById('welcomeMessage');
        const hour = new Date().getHours();
        let greeting = 'Good evening';
        
        if (hour < 12) {
            greeting = 'Good morning';
        } else if (hour < 18) {
            greeting = 'Good afternoon';
        }
        
        messageElement.textContent = `${greeting}! Ready to track your progress?`;
    }

    loadTodayActivity() {
        const today = this.getTodayKey();
        const activities = this.getActivities();
        const todayActivity = activities[today];

        if (todayActivity) {
            // Pre-fill form with today's data
            document.getElementById('steps').value = todayActivity.steps;
            document.getElementById('walking').value = todayActivity.walking;
            document.getElementById('moneySpent').value = todayActivity.moneySpent;
            document.getElementById('learned').value = todayActivity.learned;
            document.getElementById('goals').value = todayActivity.goals;
        }
    }

    // ===========================
    // ACTIVITY MANAGEMENT
    // ===========================

    saveActivity(activityData) {
        const today = this.getTodayKey();
        const activities = this.getActivities();
        
        // Add timestamp
        activityData.timestamp = new Date().toISOString();
        activityData.date = today;
        
        // Save or update today's activity
        activities[today] = activityData;
        
        localStorage.setItem('activities', JSON.stringify(activities));
        
        // Reload history
        this.loadHistory();
        
        // Show success feedback
        this.showSuccessFeedback();
    }

    getActivities() {
        const stored = localStorage.getItem('activities');
        return stored ? JSON.parse(stored) : {};
    }

    getTodayKey() {
        const today = new Date();
        return today.toISOString().split('T')[0]; // YYYY-MM-DD format
    }

    showSuccessFeedback() {
        const btn = document.querySelector('.btn-submit');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = `
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="btn-text">Saved Successfully!</span>
        `;
        btn.style.background = 'linear-gradient(135deg, hsl(150, 70%, 50%) 0%, hsl(150, 70%, 40%) 100%)';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 2000);
    }

    // ===========================
    // HISTORY DISPLAY
    // ===========================

    loadHistory(filter = 'all') {
        const activities = this.getActivities();
        const container = document.getElementById('historyContainer');
        
        // Convert to array and sort by date (newest first)
        let activityArray = Object.values(activities).sort((a, b) => {
            return new Date(b.timestamp) - new Date(a.timestamp);
        });

        // Apply filter
        if (filter === 'week') {
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            activityArray = activityArray.filter(activity => {
                return new Date(activity.timestamp) >= weekAgo;
            });
        } else if (filter === 'month') {
            const monthAgo = new Date();
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            activityArray = activityArray.filter(activity => {
                return new Date(activity.timestamp) >= monthAgo;
            });
        }

        if (activityArray.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 11L12 14L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p>No activities recorded yet. Start tracking your progress today!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = activityArray.map(activity => this.createHistoryItem(activity)).join('');
    }

    createHistoryItem(activity) {
        const date = new Date(activity.timestamp);
        const formattedDate = date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        const formattedTime = date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        return `
            <div class="history-item">
                <div class="history-header">
                    <div class="history-date">${formattedDate}</div>
                    <div class="history-time" style="color: var(--color-text-tertiary); font-size: 0.875rem;">${formattedTime}</div>
                </div>
                
                <div class="history-stats">
                    <div class="stat-item">
                        <svg class="stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 20V10M12 20V4M6 20V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <div class="stat-content">
                            <div class="stat-label">Steps</div>
                            <div class="stat-value">${this.formatNumber(activity.steps)}</div>
                        </div>
                    </div>
                    
                    <div class="stat-item">
                        <svg class="stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <div class="stat-content">
                            <div class="stat-label">Walking</div>
                            <div class="stat-value">${activity.walking} km</div>
                        </div>
                    </div>
                    
                    <div class="stat-item">
                        <svg class="stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <div class="stat-content">
                            <div class="stat-label">Spent</div>
                            <div class="stat-value">$${this.formatMoney(activity.moneySpent)}</div>
                        </div>
                    </div>
                </div>
                
                <div class="history-details">
                    <div class="detail-section">
                        <div class="detail-title">
                            <svg style="width: 16px; height: 16px; display: inline; vertical-align: middle; margin-right: 4px;" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            What I Learned
                        </div>
                        <div class="detail-content">${this.escapeHtml(activity.learned)}</div>
                    </div>
                    
                    <div class="detail-section">
                        <div class="detail-title">
                            <svg style="width: 16px; height: 16px; display: inline; vertical-align: middle; margin-right: 4px;" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <circle cx="12" cy="12" r="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Goals & Achievements
                        </div>
                        <div class="detail-content">${this.escapeHtml(activity.goals)}</div>
                    </div>
                </div>
            </div>
        `;
    }

    // ===========================
    // UTILITY FUNCTIONS
    // ===========================

    formatNumber(num) {
        return new Intl.NumberFormat('en-US').format(num);
    }

    formatMoney(amount) {
        return new Intl.NumberFormat('en-US', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        }).format(amount);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ===========================
    // EVENT LISTENERS
    // ===========================

    setupEventListeners() {
        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('password').value;
            this.login(password);
        });

        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                this.logout();
            }
        });

        // Activity form
        document.getElementById('activityForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const activityData = {
                steps: parseInt(document.getElementById('steps').value),
                walking: parseFloat(document.getElementById('walking').value),
                moneySpent: parseFloat(document.getElementById('moneySpent').value),
                learned: document.getElementById('learned').value.trim(),
                goals: document.getElementById('goals').value.trim()
            };
            
            this.saveActivity(activityData);
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active state
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                // Load filtered history
                const filter = e.target.dataset.filter;
                this.loadHistory(filter);
            });
        });

        // Add input animations
        document.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('focus', (e) => {
                e.target.parentElement.style.transform = 'translateY(-2px)';
                e.target.parentElement.style.transition = 'transform 0.2s ease';
            });
            
            input.addEventListener('blur', (e) => {
                e.target.parentElement.style.transform = 'translateY(0)';
            });
        });
    }
}

// ===========================
// INITIALIZE APP
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    const app = new ActivityTracker();
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to focus on first input
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const firstInput = document.querySelector('.form-input:not([type="password"])');
            if (firstInput && !document.getElementById('loginScreen').classList.contains('active')) {
                firstInput.focus();
            }
        }
    });
    
    console.log('🚀 Daily Activity Tracker initialized successfully!');
});
