# andredc-admin-dashboard

A fully client-side **Admin Dashboard** built with HTML, CSS, JS using LocalStorage as mock backend.  
Includes admin login, register, reset password, user management, reports, and settings.

## 🚀 Features
- Admin login, register, forgot & reset password
- Protected dashboard (redirect if not logged-in)
- Overview metrics (Users, Orders, Revenue)
- Charts using Chart.js
- Users management:
  - Edit user
  - Delete user
  - Search
  - Export CSV
- Reports dashboard
- Admin settings (update profile, update password)
- Responsive sidebar layout

## 📁 Project Structure
```
andredc-admin-dashboard/
  admin-login.html
  admin-register.html
  admin-forgot-password.html
  admin-reset-password.html
  index.html
  users.html
  reports.html
  admin-settings.html
  assets/
    css/style.css
    js/shared-data.js
    js/admin-auth.js
    js/admin-forgot.js
    js/admin-reset.js
    js/dashboard.js
    js/users.js
    js/reports.js
    js/admin-settings.js
```

## ▶️ Run Locally
```bash
git clone https://github.com/USERNAME/andredc-admin-dashboard.git
npx serve .
```

Login default (seeded):
- **Email**: admin@andre.com  
- **Password**: admin123  

## 🌐 Deploy Instructions
### Vercel
- Create new project → Import repo  
- Root directory: `/`  
- Build command: *(none)*  
- Output dir: `/`  

### Netlify
- New site from Git  
- Publish directory: `/`  

### Firebase Hosting
```bash
firebase init hosting
firebase deploy
```

## 👨‍💻 Author
Built by **Andre Dwiyanto Cahyana**  
