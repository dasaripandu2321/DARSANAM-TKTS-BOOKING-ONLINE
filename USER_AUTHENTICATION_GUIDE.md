# 👥 User Authentication Guide

## 🎉 What's New - Authentication for Everyone!

Your temple booking system now requires **all users** to sign in before making bookings!

---

## 🔐 Authentication Overview

### Who Needs to Sign In?

**Everyone!** 
- ✅ Regular users (devotees) - to make bookings
- ✅ Admins - to access admin dashboard

### Why Sign In?

**For Users:**
- 📧 Receive booking confirmations via email
- 📱 View all your bookings in one place
- 🎫 Access your QR code tickets anytime
- 📄 Download receipts whenever needed
- 🔒 Secure and personalized experience

**For Admins:**
- 🛡️ Secure access to admin panel
- 📊 Manage all bookings
- 📥 Export data

---

## 🚀 User Journey

### 1. Homepage (Not Signed In)

**What Users See:**
```
┌─────────────────────────────────┐
│  [Sign In] button (top-right)  │
│                                 │
│  Hero Section                   │
│  [Book Darshan] button          │
│                                 │
│  Services Section               │
│  All services show:             │
│  "Sign in to book" button       │
└─────────────────────────────────┘
```

**Actions Available:**
- ✅ Browse services (view only)
- ✅ See prices and descriptions
- ✅ View temple information
- ❌ Cannot add to cart
- ❌ Cannot make bookings

---

### 2. Clicking "Book Darshan" (Not Signed In)

**What Happens:**
1. User clicks "Book Darshan"
2. Redirected to `/login` page
3. Toast message: "Please sign in to book darshan"

---

### 3. Login Page

**What Users See:**
```
┌─────────────────────────────────┐
│           🕉️                    │
│        Sign In                  │
│                                 │
│  Sign in with your Google       │
│  account to book darshan and    │
│  access your bookings           │
│                                 │
│  [🔵 Sign in with Google]       │
│                                 │
│  🔒 Secure Authentication       │
│  Sign in to book services,      │
│  view your bookings, and        │
│  access receipts                │
│                                 │
│  [← Back to Homepage]           │
└─────────────────────────────────┘
```

**Actions:**
1. Click "Sign in with Google"
2. Google popup appears
3. Select account
4. Grant permissions
5. Redirected back to homepage

---

### 4. Homepage (Signed In)

**What Users See:**
```
┌─────────────────────────────────┐
│  [Avatar] dropdown (top-right) │
│                                 │
│  Hero Section                   │
│  [Book Darshan] - now works!    │
│                                 │
│  Services Section               │
│  All services show:             │
│  "Add to booking" button        │
└─────────────────────────────────┘
```

**Actions Available:**
- ✅ Add services to cart
- ✅ Make bookings
- ✅ View receipts with QR codes
- ✅ Download PDFs
- ✅ Access "My Bookings"

---

### 5. Booking Services (Signed In)

**Sign-In Prompt Removed:**
```
Before: 
┌─────────────────────────────────┐
│  🙏 Sign In to Book Services    │
│  Please sign in with your       │
│  Google account...              │
│  [Sign In to Continue]          │
└─────────────────────────────────┘

After Sign In:
✅ Prompt disappears
✅ Can add services to cart
✅ Can complete bookings
```

---

### 6. User Profile Dropdown

**Click Avatar to See:**
```
┌─────────────────────────┐
│  [Avatar]               │
│  Rama Kumar             │
│  rama@gmail.com         │
│  ─────────────────      │
│  📄 My Bookings         │ ← NEW!
│  🛡️ Admin Dashboard     │
│  👤 Homepage            │
│  ─────────────────      │
│  🚪 Sign out            │
└─────────────────────────┘
```

---

### 7. My Bookings Page (NEW!)

**URL:** `/my-bookings`

**What Users See:**
```
┌─────────────────────────────────────┐
│  [←] My Bookings        [Avatar]    │
│      View and manage your bookings  │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────┐ ┌─────────────┐  │
│  │ TKT-ABC123  │ │ TKT-XYZ789  │  │
│  │ Rama Kumar  │ │ Rama Kumar  │  │
│  │ 📅 May 5    │ │ 📅 May 10   │  │
│  │ Services... │ │ Services... │  │
│  │ ₹750.00     │ │ ₹500.00     │  │
│  └─────────────┘ └─────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

**Features:**
- ✅ View all your bookings
- ✅ Click to see full receipt
- ✅ Download QR codes
- ✅ Export PDFs
- ✅ Filtered by your account

---

## 🎯 Key Features

### 1. Sign-In Required for Booking

**Before:**
- Anyone could make bookings
- No user tracking
- No personalized experience

**After:**
- ✅ Must sign in to book
- ✅ Bookings linked to user account
- ✅ Email stored with booking
- ✅ User ID tracked

### 2. Service Cards Disabled

**When Not Signed In:**
```
┌─────────────────────────┐
│ VIP Darshanam           │
│ Express darshan...      │
│ ⏱ 20-30 min            │
│ 50 available            │
│         ₹500            │
│ [Sign in to book] 🔒    │ ← Disabled
└─────────────────────────┘
```

**When Signed In:**
```
┌─────────────────────────┐
│ VIP Darshanam           │
│ Express darshan...      │
│ ⏱ 20-30 min            │
│ 50 available            │
│         ₹500            │
│ [Add to booking] ✅     │ ← Enabled
└─────────────────────────┘
```

### 3. Booking Data Enhanced

**New Fields in Bookings:**
```typescript
{
  bookingId: "TKT-ABC123",
  devotee: {
    name: "Rama Kumar",
    age: "35",
    contact: "+91 98765 43210",
    idType: "Aadhaar",
    idNumber: "1234 5678 9012",
    email: "rama@gmail.com",      // ← NEW!
    userId: "firebase-user-id"     // ← NEW!
  },
  // ... rest of booking data
}
```

### 4. My Bookings Page

**Features:**
- Shows only YOUR bookings
- Filtered by user ID and email
- Click any booking to view receipt
- Download QR codes
- Export PDFs

---

## 🔄 User Flows

### First-Time User

```
1. Visit homepage
   ↓
2. See "Sign In" button
   ↓
3. Try to click "Book Darshan"
   ↓
4. Redirected to /login
   ↓
5. Sign in with Google
   ↓
6. Redirected back to homepage
   ↓
7. Can now book services
   ↓
8. Make booking
   ↓
9. View receipt with QR code
   ↓
10. Access "My Bookings" anytime
```

### Returning User

```
1. Visit homepage
   ↓
2. Already signed in (session persists)
   ↓
3. See avatar in top-right
   ↓
4. Can immediately book services
   ↓
5. Click avatar → "My Bookings"
   ↓
6. View all past bookings
```

---

## 📱 Routes

| Route | Access | Purpose |
|-------|--------|---------|
| `/` | Public | Homepage (browse only when logged out) |
| `/login` | Public | Sign in page |
| `/my-bookings` | **Protected** | User's bookings (requires login) |
| `/admin` | **Protected** | Admin dashboard (requires login) |

---

## 🎨 UI Changes

### Homepage

**Top-Right Corner:**
- **Before Login:** `[Sign In]` button
- **After Login:** User avatar with dropdown

**Book Darshan Button:**
- **Before Login:** Redirects to login
- **After Login:** Scrolls to booking section

**Service Cards:**
- **Before Login:** "Sign in to book" (disabled)
- **After Login:** "Add to booking" (enabled)

**Booking Section:**
- **Before Login:** Shows sign-in prompt banner
- **After Login:** Banner hidden, can book

### Login Page

**Updated Text:**
- Title: "Sign In" (was "Admin Login")
- Description: "Sign in to book darshan and access your bookings"
- Info: "Sign in to book services, view your bookings, and access receipts"

### User Dropdown

**New Menu Item:**
- 📄 My Bookings (NEW!)
- 🛡️ Admin Dashboard
- 👤 Homepage
- 🚪 Sign out

---

## 🔒 Security

### What's Protected

**User Actions:**
- ✅ Adding items to cart
- ✅ Making bookings
- ✅ Viewing "My Bookings"
- ✅ Downloading receipts

**Admin Actions:**
- ✅ Accessing admin dashboard
- ✅ Cancelling bookings
- ✅ Exporting data
- ✅ Resetting inventory

### How It Works

1. **Auth Check:** Every protected action checks if user is signed in
2. **Redirect:** Not signed in? Redirect to `/login`
3. **Session:** Firebase maintains session across page refreshes
4. **User ID:** Each booking linked to Firebase user ID

---

## 🧪 Testing Checklist

### User Authentication
- [ ] Can browse homepage without login
- [ ] Cannot add to cart without login
- [ ] "Book Darshan" redirects to login
- [ ] Can sign in with Google
- [ ] Redirected back after login
- [ ] Can add to cart after login
- [ ] Can complete booking
- [ ] Booking includes email and user ID

### My Bookings Page
- [ ] Cannot access without login
- [ ] Redirects to login if not authenticated
- [ ] Shows only user's bookings
- [ ] Can click booking to view receipt
- [ ] Can download PDF
- [ ] Shows empty state if no bookings

### User Experience
- [ ] Sign-in prompt shows when not logged in
- [ ] Service cards disabled when not logged in
- [ ] Avatar shows after login
- [ ] Dropdown menu works
- [ ] "My Bookings" link works
- [ ] Can sign out
- [ ] Session persists on refresh

---

## 💡 Benefits

### For Users
- 🔐 Secure bookings
- 📧 Email linked to bookings
- 📱 Access bookings anytime
- 🎫 QR codes always available
- 📄 Download receipts anytime
- 🔄 Track booking history

### For Temple
- 👥 Know who's booking
- 📧 Contact users if needed
- 📊 Better analytics
- 🔒 Reduced fraud
- 📈 User engagement tracking

---

## 🚀 What's Next

### Recommended Enhancements

1. **Email Notifications**
   - Send booking confirmation emails
   - Include QR code in email
   - Reminder emails before visit

2. **SMS Notifications**
   - Booking confirmation via SMS
   - Visit reminders

3. **Booking Modifications**
   - Allow users to modify bookings
   - Change date/time
   - Add more services

4. **Favorites**
   - Save favorite services
   - Quick re-booking

5. **Reviews**
   - Rate services after visit
   - Leave feedback

---

## 📊 Summary

### What Changed

**Before:**
- ❌ No authentication required
- ❌ Anyone could book
- ❌ No user tracking
- ❌ No personalized experience

**After:**
- ✅ Sign-in required for booking
- ✅ User accounts tracked
- ✅ Email and user ID stored
- ✅ "My Bookings" page
- ✅ Personalized experience
- ✅ Better security

### Files Modified

**New Files:**
- `src/pages/MyBookings.tsx` - User bookings page

**Modified Files:**
- `src/pages/Index.tsx` - Added auth checks
- `src/pages/Login.tsx` - Updated text for users
- `src/components/temple/ServiceCard.tsx` - Added disabled state
- `src/components/temple/Receipt.tsx` - Added email/userId fields
- `src/components/auth/UserProfile.tsx` - Added "My Bookings" link
- `src/App.tsx` - Added `/my-bookings` route

---

## 🎉 You're All Set!

Your temple booking system now has:
1. ✅ User authentication for bookings
2. ✅ Admin authentication for dashboard
3. ✅ "My Bookings" page for users
4. ✅ Enhanced booking data
5. ✅ Better security
6. ✅ Personalized experience

**Test it now:**
1. Visit: http://localhost:8080/
2. Try to book without signing in
3. Sign in with Google
4. Make a booking
5. Visit "My Bookings"
6. See your booking!

**May your bookings be blessed!** 🙏🕉️

---

**Built with devotion for Sri Kshetra Devasthanam**
