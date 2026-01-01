# Daily Activity Tracker 🎯

A beautiful, modern web application to track your daily activities including steps, walking distance, learning, spending, and goals.

## Features ✨

- **Secure Login**: Password-protected access to your personal data
- **Daily Activity Tracking**: Log steps, walking distance, money spent, learnings, and goals
- **Data Persistence**: All your data is saved locally in your browser
- **Activity History**: View all your past activities with filtering options (All, This Week, This Month)
- **Beautiful Design**: Modern dark mode UI with smooth animations and glassmorphism effects
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices

## How to Use 🚀

### First Time Setup

1. **Open the Application**
   - Simply double-click on `index.html` to open it in your default web browser
   - Or right-click on `index.html` and select "Open with" → Choose your preferred browser (Chrome, Firefox, Edge, etc.)

2. **Create Your Account**
   - On first visit, you'll see the login screen
   - Enter any password you want to use (remember it!)
   - Click "Sign In" to create your account
   - Your password is stored locally in your browser

### Daily Usage

1. **Login**
   - Enter your password
   - Click "Sign In"

2. **Log Today's Activity**
   - Fill in the form with your daily data:
     - **Steps**: Number of steps you walked (e.g., 10000)
     - **Walking**: Distance walked in kilometers (e.g., 5.5)
     - **Money Spent**: Amount spent in dollars (e.g., 50.00)
     - **What I Learned**: Write about what you learned today
     - **Goals & Achievements**: Note your goals or what you achieved
   - Click "Save Today's Activity"

3. **View History**
   - Scroll down to see all your past activities
   - Use filter buttons to view:
     - **All**: All recorded activities
     - **This Week**: Activities from the last 7 days
     - **This Month**: Activities from the last 30 days

4. **Update Today's Entry**
   - You can update today's activity multiple times
   - The form will show your current data for today
   - Just modify the values and save again

5. **Logout**
   - Click the "Logout" button in the top right corner

## Data Storage 💾

- All data is stored locally in your browser using `localStorage`
- Your data never leaves your computer
- Data persists even after closing the browser
- Each day's activity is stored separately with a timestamp

## Tips 💡

- **Daily Habit**: Make it a habit to log your activities at the end of each day
- **Be Consistent**: Try to fill in all fields for better tracking
- **Review Progress**: Use the history section to see your progress over time
- **Keyboard Shortcut**: Press `Ctrl+K` (or `Cmd+K` on Mac) to quickly focus on the first input field

## Technical Details 🛠️

- **Pure HTML/CSS/JavaScript**: No frameworks or build tools required
- **No Server Needed**: Runs entirely in your browser
- **Modern Design**: Uses CSS Grid, Flexbox, and modern CSS features
- **Animations**: Smooth transitions and micro-interactions
- **Responsive**: Mobile-first design approach

## Browser Compatibility 🌐

Works best on modern browsers:
- Google Chrome (recommended)
- Mozilla Firefox
- Microsoft Edge
- Safari
- Opera

## Privacy & Security 🔒

- Your password is stored in your browser's localStorage
- All data remains on your device
- No data is sent to any server
- Clear your browser data to reset the application

## Troubleshooting 🔧

**Lost Password?**
- Open browser Developer Tools (F12)
- Go to Application → Local Storage
- Delete the `userPassword` entry
- Refresh the page and set a new password

**Lost Data?**
- Data is stored in localStorage
- Clearing browser data will delete all activities
- Consider exporting your data periodically (future feature)

**Not Working?**
- Make sure JavaScript is enabled in your browser
- Try opening in a different browser
- Check browser console (F12) for errors

## Future Enhancements 🚀

Potential features for future versions:
- Data export/import functionality
- Charts and graphs for visualizing progress
- Goal setting with progress tracking
- Reminders and notifications
- Dark/Light mode toggle
- Multiple user accounts
- Cloud sync option

## Support 💬

If you encounter any issues or have suggestions, feel free to reach out!

---

**Enjoy tracking your daily progress! 🎉**
