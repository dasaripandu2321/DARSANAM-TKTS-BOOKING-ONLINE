# 🔥 Firebase Setup - Quick Reference

## 5-Minute Setup Guide

### 1️⃣ Create Firebase Project (2 min)
```
1. Go to: https://console.firebase.google.com/
2. Click "Add project"
3. Name: "temple-booking-system"
4. Click through setup wizard
```

### 2️⃣ Get Your Config (1 min)
```
1. Click Web icon (</>)
2. Register app
3. COPY the firebaseConfig object
```

### 3️⃣ Enable Google Auth (1 min)
```
1. Go to Authentication > Sign-in method
2. Click "Google"
3. Toggle Enable ON
4. Select support email
5. Save
```

### 4️⃣ Update Your Code (1 min)
```
1. Open: src/lib/firebase.ts
2. Replace firebaseConfig with your copied config
3. Save file
```

### 5️⃣ Test It! (30 sec)
```
1. Visit: http://localhost:8080/login
2. Click "Sign in with Google"
3. Select account
4. Done! ✅
```

---

## 🎯 Your Firebase Config Location

**File:** `src/lib/firebase.ts`

**Replace this:**
```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  // ... rest of config
};
```

**With your actual config from Firebase Console**

---

## 🔗 Quick Links

- **Firebase Console**: https://console.firebase.google.com/
- **Your Login Page**: http://localhost:8080/login
- **Your Admin Page**: http://localhost:8080/admin

---

## ✅ Checklist

- [ ] Created Firebase project
- [ ] Registered web app
- [ ] Copied firebaseConfig
- [ ] Enabled Google sign-in
- [ ] Updated firebase.ts
- [ ] Tested login
- [ ] Can access admin dashboard

---

## 🆘 Common Issues

**"Unauthorized domain"**
→ Add your domain in Firebase Console > Authentication > Settings > Authorized domains

**"Popup blocked"**
→ Allow popups in browser settings

**"Configuration not found"**
→ Check you enabled Google sign-in in Firebase Console

---

## 📱 What You Get

✅ Google Sign-In button
✅ Protected admin dashboard
✅ User profile dropdown
✅ Sign out functionality
✅ Auto-redirect logic
✅ Loading states

---

**Need detailed instructions?** See `FIREBASE_SETUP.md`

**Built with devotion** 🙏
