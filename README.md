# 🕉️ Sri Kshetra Temple Booking System

A beautiful, feature-rich temple booking platform for managing darshan, prasadam, and seva bookings with real-time inventory tracking, QR code tickets, and comprehensive admin controls.

## ✨ Features

### For Devotees
- 🙏 **Book Services**: Darshan, Prasadam, and Seva bookings
- 📦 **Real-time Inventory**: See available slots/items instantly
- 🎫 **QR Code Tickets**: Automatic QR code generation for each booking
- 📄 **PDF Receipts**: Download and print booking receipts
- 🕉️ **Spiritual Experience**: Beautiful devotional design with Om favicon
- 📱 **Mobile Friendly**: Fully responsive on all devices

### For Administrators
- 🔐 **Google Authentication**: Secure login with Google accounts
- 📊 **Dashboard Analytics**: View bookings, revenue, and statistics
- 🔍 **Search & Filter**: Find bookings by ID, name, or contact
- ❌ **Booking Management**: Cancel and restore bookings
- 📥 **Data Export**: Export bookings to CSV
- 🔄 **Inventory Control**: Reset inventory with one click
- 📈 **Real-time Stats**: Track daily bookings and revenue
- 👤 **User Profile**: Avatar, dropdown menu, and sign out

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Firebase Setup (Required for Admin Login)

**Quick Setup (5 minutes):**
1. Create Firebase project at https://console.firebase.google.com/
2. Enable Google Authentication
3. Copy your Firebase config
4. Update `src/lib/firebase.ts` with your config

**Detailed Instructions:**
- See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for complete guide
- See [FIREBASE_QUICK_SETUP.md](FIREBASE_QUICK_SETUP.md) for quick reference

### Access Points

- **Homepage**: `/` - Main booking interface
- **Login**: `/login` - Google authentication
- **Admin Dashboard**: `/admin` - Management interface (requires login)

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get started in 5 minutes
- **[FIREBASE_SETUP.md](FIREBASE_SETUP.md)** - Complete Firebase authentication setup
- **[FIREBASE_QUICK_SETUP.md](FIREBASE_QUICK_SETUP.md)** - Quick Firebase reference
- **[FEATURES.md](FEATURES.md)** - Detailed feature documentation
- **[ADMIN_GUIDE.md](ADMIN_GUIDE.md)** - Admin dashboard guide
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Technical details

## 🎯 Key Features Explained

### 1. Real Inventory Limits
Each service has defined inventory that updates in real-time:
- Visual indicators (available count, low stock warnings)
- Prevents overbooking
- Maximum quantity per booking enforced

### 2. QR Code Tickets
Every booking generates a unique QR code containing:
- Booking ID
- Devotee name
- Visit date
- Total amount

### 3. PDF Export
One-click export of receipts including:
- Complete booking details
- QR code for scanning
- Professional formatting

### 4. Admin Dashboard
Comprehensive management interface with:
- Real-time statistics
- Search functionality
- Booking cancellation/restoration
- CSV export for reporting

## 🛠️ Technology Stack

- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router v6
- **Authentication**: Firebase Auth (Google Sign-In)
- **Forms**: React Hook Form + Zod
- **QR Codes**: qrcode library
- **PDF Generation**: jsPDF + html2canvas
- **Build Tool**: Vite

## 📦 Project Structure

```
src/
├── components/
│   ├── auth/            # Authentication components
│   │   ├── ProtectedRoute.tsx
│   │   └── UserProfile.tsx
│   ├── temple/          # Temple-specific components
│   │   ├── BookingForm.tsx
│   │   ├── Receipt.tsx  # QR code & PDF export
│   │   ├── ServiceCard.tsx  # Inventory display
│   │   └── ...
│   └── ui/              # Reusable UI components
├── contexts/
│   └── AuthContext.tsx  # Firebase auth state management
├── lib/
│   ├── firebase.ts      # Firebase configuration
│   ├── temple-data.ts   # Service definitions
│   ├── inventory.ts     # Inventory management
│   └── utils.ts
├── pages/
│   ├── Index.tsx        # Main booking page
│   ├── Login.tsx        # Google sign-in page
│   ├── AdminDashboard.tsx  # Admin interface
│   └── NotFound.tsx
└── App.tsx
```

## 🎨 Design Features

- **Devotional Theme**: Saffron, gold, and maroon color palette
- **Om Favicon**: Custom SVG favicon with gradient
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Petal rain, flame effects
- **Print Optimized**: Receipts formatted for printing

## 💾 Data Storage

Currently uses browser localStorage (demo mode):
- `temple-bookings-v1` - Booking history
- `temple-inventory-v1` - Current inventory
- `temple-cancelled-v1` - Cancelled bookings

**For Production**: Replace with backend API and database.

## 🔒 Security Notes

⚠️ **Authentication Setup Required**

The admin dashboard is now protected with Firebase Google Authentication. You must:
1. Set up a Firebase project
2. Enable Google sign-in
3. Configure your Firebase credentials in `src/lib/firebase.ts`

See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for complete instructions.

**Before Production**:
- ✅ Firebase authentication configured
- [ ] Add role-based access control (admin roles)
- [ ] Implement API security
- [ ] Validate all inputs server-side
- [ ] Add audit logging
- [ ] Set up Firestore security rules

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch
```

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## 🤝 Contributing

This is a temple booking system built with devotion. Contributions welcome!

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

Built with devotion for Sri Kshetra Devasthanam

**Om Shanti Shanti Shanti** 🕉️

---

## 🆘 Support

For issues or questions:
1. Check documentation files
2. Review browser console
3. Open an issue on GitHub

**May all beings be happy and free** 🙏
