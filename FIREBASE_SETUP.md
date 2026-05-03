# 🔥 Firebase Google Authentication Setup Guide

Complete step-by-step guide to set up Google Authentication for your Temple Booking System.

---

## 📋 Prerequisites

- Google account
- Node.js and npm installed
- Project running locally

---

## 🚀 Step 1: Create Firebase Project

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Sign in with your Google account

2. **Create New Project**
   - Click "Add project" or "Create a project"
   - Enter project name: `temple-booking-system` (or your choice)
   - Click "Continue"

3. **Google Analytics (Optional)**
   - Choose whether to enable Google Analytics
   - Click "Create project"
   - Wait for project creation (takes ~30 seconds)

4. **Project Created!**
   - Click "Continue" when ready

---

## 🌐 Step 2: Register Your Web App

1. **Add Web App**
   - In Firebase Console, click the **Web icon** (`</>`)
   - Or go to Project Settings > General > Your apps

2. **Register App**
   - App nickname: `Temple Booking Web App`
   - ✅ Check "Also set up Firebase Hosting" (optional)
   - Click "Register app"

3. **Copy Firebase Config**
   - You'll see a code snippet like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "temple-booking-xxxxx.firebaseapp.com",
     projectId: "temple-booking-xxxxx",
     storageBucket: "temple-booking-xxxxx.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef123456",
     measurementId: "G-XXXXXXXXXX"
   };
   ```
   - **COPY THIS ENTIRE OBJECT** - you'll need it!

4. **Click "Continue to console"**

---

## 🔐 Step 3: Enable Google Authentication

1. **Go to Authentication**
   - In Firebase Console sidebar, click "Authentication"
   - Click "Get started" (if first time)

2. **Enable Sign-in Method**
   - Click "Sign-in method" tab
   - Find "Google" in the providers list
   - Click on "Google"

3. **Enable Google Provider**
   - Toggle the "Enable" switch to ON
   - **Project support email**: Select your email from dropdown
   - Click "Save"

4. **Google Auth Enabled!**
   - You should see Google with status "Enabled"

---

## ⚙️ Step 4: Configure Your Project

1. **Open Firebase Config File**
   - Navigate to: `src/lib/firebase.ts`

2. **Replace Configuration**
   - Find this section:
   ```typescript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
     measurementId: "YOUR_MEASUREMENT_ID"
   };
   ```

3. **Paste Your Config**
   - Replace with the config you copied in Step 2
   - Example:
   ```typescript
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "temple-booking-xxxxx.firebaseapp.com",
     projectId: "temple-booking-xxxxx",
     storageBucket: "temple-booking-xxxxx.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef123456",
     measurementId: "G-XXXXXXXXXX"
   };
   ```

4. **Save the File**

---

## 🌍 Step 5: Add Authorized Domains

1. **Go to Authentication Settings**
   - Firebase Console > Authentication > Settings tab
   - Scroll to "Authorized domains"

2. **Add Your Domains**
   - `localhost` should already be there
   - Click "Add domain" to add:
     - Your production domain (e.g., `temple-booking.com`)
     - Any staging domains

3. **Save Changes**

---

## ✅ Step 6: Test Authentication

1. **Start Your Development Server**
   ```bash
   npm run dev
   ```

2. **Visit Login Page**
   - Go to: http://localhost:8080/login

3. **Click "Sign in with Google"**
   - Google sign-in popup should appear
   - Select your Google account
   - Grant permissions

4. **Success!**
   - You should be redirected to `/admin`
   - Your profile picture should appear in top-right

---

## 🎯 How It Works

### User Flow

```
Homepage (/)
   ↓
Click "Admin Login" or visit /login
   ↓
Login Page (/login)
   ↓
Click "Sign in with Google"
   ↓
Google OAuth Popup
   ↓
User selects account & grants permission
   ↓
Redirected to Admin Dashboard (/admin)
   ↓
User profile shown in header
```

### Protected Routes

- `/admin` - Requires authentication
- `/login` - Public (redirects if already logged in)
- `/` - Public (shows login button if not authenticated)

---

## 🔒 Security Features

### What's Implemented

✅ **Protected Routes**: Admin dashboard requires login
✅ **Auth State Persistence**: User stays logged in on refresh
✅ **Automatic Redirects**: Logged-in users can't access login page
✅ **Sign Out**: Users can sign out from dropdown menu
✅ **Loading States**: Shows spinner while checking auth status

### What to Add for Production

⚠️ **Role-Based Access**: Add admin role checking
⚠️ **Firestore Rules**: Secure database access
⚠️ **Email Verification**: Require verified emails
⚠️ **Rate Limiting**: Prevent abuse

---

## 📱 Features Added

### 1. Login Page (`/login`)
- Beautiful temple-themed design
- Google sign-in button
- Auto-redirect if already logged in
- Back to homepage link

### 2. User Profile Component
- Shows user avatar and name
- Dropdown menu with:
  - Admin Dashboard link
  - Homepage link
  - Sign out button
- Appears in top-right corner

### 3. Protected Admin Route
- Requires authentication
- Shows loading spinner while checking
- Redirects to login if not authenticated

### 4. Auth Context
- Manages user state globally
- Provides sign-in/sign-out functions
- Listens for auth state changes

---

## 🛠️ Files Created/Modified

### New Files
```
src/
├── lib/
│   └── firebase.ts              # Firebase configuration
├── contexts/
│   └── AuthContext.tsx          # Auth state management
├── components/
│   └── auth/
│       ├── ProtectedRoute.tsx   # Route protection
│       └── UserProfile.tsx      # User dropdown menu
└── pages/
    └── Login.tsx                # Login page
```

### Modified Files
```
src/
├── App.tsx                      # Added AuthProvider & routes
├── pages/
│   ├── Index.tsx                # Added UserProfile
│   └── AdminDashboard.tsx       # Added user info & profile
```

---

## 🧪 Testing Checklist

### Basic Authentication
- [ ] Can access login page
- [ ] Google sign-in popup appears
- [ ] Can sign in with Google account
- [ ] Redirected to admin after login
- [ ] Profile picture shows in header
- [ ] Can open profile dropdown
- [ ] Can sign out
- [ ] Redirected to homepage after sign out

### Protected Routes
- [ ] Can't access `/admin` when logged out
- [ ] Redirected to `/login` when accessing `/admin` without auth
- [ ] Can access `/admin` when logged in
- [ ] Login page redirects to `/admin` if already logged in

### User Experience
- [ ] Loading spinner shows while checking auth
- [ ] Toast notifications appear on sign in/out
- [ ] User name displays correctly
- [ ] Avatar/initials show correctly
- [ ] Dropdown menu works on mobile

---

## 🐛 Troubleshooting

### "Firebase: Error (auth/unauthorized-domain)"
**Solution:**
1. Go to Firebase Console > Authentication > Settings
2. Add your domain to "Authorized domains"
3. For localhost, ensure `localhost` is in the list

### "Firebase: Error (auth/popup-blocked)"
**Solution:**
1. Allow popups in your browser
2. Try signing in again
3. Or use redirect method instead of popup

### "Firebase: Error (auth/configuration-not-found)"
**Solution:**
1. Check that you've enabled Google sign-in in Firebase Console
2. Verify your Firebase config is correct in `firebase.ts`

### User not persisting after refresh
**Solution:**
1. Check browser console for errors
2. Ensure cookies are enabled
3. Check if localStorage is working

### Profile picture not showing
**Solution:**
1. Check if user has a Google profile picture
2. Fallback to initials should work
3. Check browser console for image loading errors

---

## 🔐 Environment Variables (Optional)

For better security, you can use environment variables:

1. **Create `.env` file:**
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

2. **Update `firebase.ts`:**
   ```typescript
   const firebaseConfig = {
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
     appId: import.meta.env.VITE_FIREBASE_APP_ID,
     measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
   };
   ```

3. **Add to `.gitignore`:**
   ```
   .env
   .env.local
   ```

---

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Auth Guide](https://firebase.google.com/docs/auth/web/start)
- [Google Sign-In](https://firebase.google.com/docs/auth/web/google-signin)
- [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks)

---

## 🎉 You're All Set!

Your temple booking system now has secure Google authentication! 🙏

**Next Steps:**
1. Test the authentication flow
2. Add role-based access control
3. Set up Firestore for data persistence
4. Deploy to production

**May your authentication be blessed!** 🕉️

---

**Built with devotion for Sri Kshetra Devasthanam**
