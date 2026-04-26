# Personal Portfolio Website

A modern, responsive personal portfolio website with dark/light mode, admin panel, and dynamic content management.

## 🌟 Features

### 🎨 Visual & UX
- **Dark/Light Mode Toggle** - Switch between themes with smooth transitions
- **Responsive Design** - Mobile-first design with hamburger menu
- **Loading Animations** - Skeleton loaders and smooth fade-in effects
- **Scroll Progress Bar** - Visual indicator of page scroll position
- **Smooth Animations** - Fade-in, slide-in, and hover effects throughout

### 📊 Content Sections
- **Hero Section** - Introduction with typing animation and social links
- **About Me** - Editable description with profile image
- **Skills** - Progress bars with search functionality
- **Experience** - Timeline of work experience with search
- **Portfolio** - Project showcase with:
  - Multiple images per project
  - Technology filters
  - Search functionality
  - Modal view with image gallery
- **Certificates** - Certificate display with:
  - Modal view
  - Navigation between certificates
  - Description support
- **Contact** - Contact information display

### 📈 Statistics
- **Animated Counters** - Projects, Skills, and Certificates count
- **Real-time Updates** - Counters animate on scroll

### 🔐 Admin Panel
- **Secure Login** - Username: `admin`, Password: `123`
- **Profile Management** - Upload profile image
- **CV Upload** - Upload and manage CV/resume
- **Social Media Links** - Configure Facebook, Instagram, LinkedIn, GitHub
- **Contact Information** - Set email, WhatsApp, LinkedIn
- **About Me Editor** - Edit about description
- **Content Management**:
  - Add/Delete Skills
  - Add/Delete Experience
  - Add/Delete Projects (with multiple images)
  - Add/Delete Certificates (with description)

### 🔍 Search & Filter
- **Skills Search** - Real-time search through skills
- **Experience Search** - Search by role, company, or description
- **Portfolio Search** - Search projects by title, description, or tech
- **Technology Filter** - Filter projects by technology stack

## 📁 Project Structure

```
portfolio-website/
├── index.html          # Main portfolio page
├── login.html          # Admin login page
├── input.html          # Admin panel
├── style.css           # All styles
├── script.js           # Main JavaScript
├── assets/
│   ├── images/
│   │   ├── profile/    # Profile images
│   │   ├── projects/   # Project images
│   │   └── certificates/ # Certificate images
│   └── cv/             # CV/Resume files
├── data/               # JSON backup files (Export/Import)
└── README.md           # This file
```

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

### 2. Open in Browser
Simply open `index.html` in your web browser. No build process or server required!

### 3. Access Admin Panel
1. Navigate to `login.html`
2. Login with:
   - Username: `admin`
   - Password: `123`
3. Start adding your content!

## 💾 Data Storage

All data is stored in browser's `localStorage`:
- `profileImage` - Profile image (base64)
- `cv` - CV file (base64)
- `socialLinks` - Social media URLs
- `contactInfo` - Contact information
- `aboutDescription` - About me text
- `skills` - Array of skills
- `experiences` - Array of experiences
- `projects` - Array of projects with images
- `certificates` - Array of certificates
- `theme` - Dark/light mode preference
- `isLogin` - Admin login status

### 📤 Export/Import Data (Backup & Restore)

**Important**: localStorage data is browser-specific and can be lost. Always backup your data!

#### Export Data (Backup)
1. Login to admin panel
2. Click **"📥 Export Data"** button
3. Save the JSON file to `data/` folder in your project
4. Commit and push to GitHub

```bash
git add data/portfolio-data-*.json
git commit -m "Backup portfolio data"
git push
```

#### Import Data (Restore)
1. Login to admin panel
2. Click **"📤 Import Data"** button
3. Select your JSON backup file from `data/` folder
4. Confirm to restore data
5. Page will reload with restored data

**Workflow:**
```
1. Edit content in admin panel (stored in localStorage)
2. Export data → Save to data/ folder
3. Commit & push to GitHub (backup)
4. On new device: Clone repo → Import JSON → Done!
```

**Recommended**: Export data after every major update!

## 🎨 Customization

### Change Colors
Edit CSS variables in `style.css`:
```css
:root {
    --bg-primary: #020617;
    --bg-secondary: #0f172a;
    --text-primary: #fff;
    --accent-color: #00ffff;
    --accent-glow: rgba(0, 255, 255, 0.3);
}
```

### Change Admin Credentials
Edit in `login.html`:
```javascript
if (username === 'admin' && password === '123') {
    // Change 'admin' and '123' to your credentials
}
```

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🔒 Security Notes

⚠️ **Important**: This is a client-side only portfolio. For production use:
1. Change the default admin password
2. Consider implementing server-side authentication
3. Use a proper backend for sensitive data
4. Don't store sensitive information in localStorage

## 📦 Assets Folder

The `assets/` folder is for manual file management:
- `assets/images/profile/` - Profile pictures
- `assets/images/projects/` - Project screenshots
- `assets/images/certificates/` - Certificate images
- `assets/cv/` - CV/resume files

**Note**: Images uploaded through admin panel are stored as base64 in localStorage. To persist them:
1. Export data from admin panel
2. Save JSON to `data/` folder
3. Commit and push to GitHub

For better performance, you can manually save images to `assets/` folder and reference them in your data.

## 🌐 Deployment

### GitHub Pages (Recommended)
1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Source: Select `main` branch
4. Folder: `/ (root)`
5. Click Save
6. Your site will be live at `https://yourusername.github.io/portfolio-website/`

**After deployment:**
- Portfolio will be publicly accessible
- Admin panel accessible at `/login.html`
- Use Export/Import to manage content

### Netlify
1. Connect your GitHub repository
2. Build settings: Leave empty (static site)
3. Deploy!
4. Your site is live instantly

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Manual Hosting
Upload all files to any web hosting via FTP/cPanel.

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with CSS Variables
- **Vanilla JavaScript** - Functionality (no frameworks!)
- **LocalStorage API** - Data persistence
- **FileReader API** - Image/file uploads
- **Intersection Observer API** - Scroll animations

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Anggit Sutrisno**
- Portfolio: [Your Portfolio URL]
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

Made with ❤️ by Anggit Sutrisno
