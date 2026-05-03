# Changelog

All notable changes to the Sri Kshetra Temple Booking System.

## [2.0.0] - 2026-05-03

### 🎉 Major Feature Release

This release adds comprehensive booking management, inventory tracking, and enhanced user experience features.

### ✨ Added

#### Admin Dashboard
- **New Page**: `/admin` route for administrative interface
- **Statistics Dashboard**: Real-time metrics for bookings and revenue
  - Total bookings counter
  - Today's bookings tracker
  - Total revenue calculator
  - Average booking value
- **Search Functionality**: Search by booking ID, name, or contact
- **Booking Management**: 
  - View all booking details
  - Cancel bookings with confirmation
  - Restore cancelled bookings
- **Data Export**: CSV export of all bookings
- **Inventory Management**: Reset inventory to defaults
- **Responsive Design**: Mobile-friendly admin interface

#### QR Code Tickets
- **Automatic Generation**: QR code created for every booking
- **Embedded in Receipt**: Displayed prominently on digital receipt
- **Booking Data**: Contains ID, name, date, and total
- **Scannable Format**: Ready for temple entrance verification
- **High Quality**: 200x200px resolution

#### PDF Export
- **One-Click Export**: Download receipts as PDF
- **Complete Content**: Includes all booking details and QR code
- **Professional Format**: A4 size, portrait orientation
- **Auto-Naming**: Files named as `{BOOKING_ID}-receipt.pdf`
- **High Resolution**: 2x scale for crisp printing

#### Real Inventory Management
- **Per-Service Limits**: Each service has defined inventory
- **Real-Time Tracking**: Inventory updates with each booking
- **Visual Indicators**:
  - Available count display on service cards
  - "Out of Stock" badges when depleted
  - Low stock warnings (orange text for ≤10 items)
- **Booking Limits**: Maximum quantity per booking enforced
- **Validation**: Prevents overbooking attempts
- **Persistent Storage**: Inventory state saved in localStorage

**Inventory Limits:**
| Service | Inventory | Max Per Booking |
|---------|-----------|-----------------|
| General Darshanam | 1000 | 10 |
| Special Darshanam | 200 | 6 |
| VIP Darshanam | 50 | 4 |
| Suprabhata Seva | 30 | 2 |
| Laddu Prasadam | 500 | 20 |
| Vada Prasadam | 300 | 15 |
| Anna Prasadam | 200 | 10 |
| Tamarind Rice | 150 | 10 |
| Archana | 100 | 5 |
| Abhishekam | 20 | 2 |
| Kalyanotsavam | 10 | 1 |

#### Booking Cancellation
- **Admin Control**: Cancel bookings from dashboard
- **Restore Capability**: Reactivate cancelled bookings
- **Status Tracking**: Visual indicators for cancelled state
- **Revenue Impact**: Cancelled bookings excluded from stats
- **Persistent State**: Cancellation status saved

#### Devotional Favicon
- **Custom Design**: Om (ॐ) symbol in SVG format
- **Gradient Colors**: Saffron to orange gradient
- **Scalable**: Vector format for all sizes
- **Spiritual Theme**: Matches temple aesthetic

### 🔧 Changed

#### Components
- **Receipt.tsx**: Enhanced with QR code and PDF export
- **ServiceCard.tsx**: Added inventory display and limits
- **BookingForm.tsx**: Improved validation

#### Libraries
- **temple-data.ts**: Added inventory and maxPerBooking fields
- **New File**: `inventory.ts` for inventory management

#### Pages
- **Index.tsx**: Integrated inventory tracking
- **App.tsx**: Added admin route

#### Configuration
- **index.html**: Updated favicon reference
- **package.json**: Added new dependencies

### 📦 Dependencies

#### Added
- `qrcode@^1.5.x` - QR code generation
- `jspdf@^2.5.x` - PDF creation
- `html2canvas@^1.4.x` - HTML to canvas conversion
- `@types/qrcode@^1.5.x` - TypeScript types

### 📚 Documentation

#### New Files
- `FEATURES.md` - Comprehensive feature documentation
- `ADMIN_GUIDE.md` - Admin dashboard user guide
- `QUICK_START.md` - Quick start guide for users
- `IMPLEMENTATION_SUMMARY.md` - Technical implementation details
- `CHANGELOG.md` - This file

#### Updated
- `README.md` - Complete rewrite with new features

### 🗄️ Storage

#### New localStorage Keys
- `temple-inventory-v1` - Current inventory levels
- `temple-cancelled-v1` - Cancelled booking IDs

#### Existing
- `temple-bookings-v1` - Booking history (unchanged)

### 🎨 UI/UX Improvements

- **Inventory Badges**: Color-coded availability indicators
- **Disabled States**: Buttons disabled when appropriate
- **Toast Notifications**: User-friendly error messages
- **Confirmation Dialogs**: Safety prompts for destructive actions
- **Loading States**: Better feedback during operations
- **Print Optimization**: Receipt formatted for printing

### 🔒 Security Notes

⚠️ **Important**: This release is still in demo mode using localStorage.

**For Production Deployment:**
- [ ] Add admin authentication
- [ ] Implement route guards
- [ ] Add API security
- [ ] Validate all inputs server-side
- [ ] Add audit logging
- [ ] Implement CSRF protection

### 🐛 Bug Fixes

- Fixed cart state management
- Improved form validation
- Enhanced error handling
- Better mobile responsiveness

### ⚡ Performance

- Optimized component re-renders
- Lazy loading for heavy components
- Efficient inventory calculations
- Memoized expensive computations

### 📱 Compatibility

Tested and verified on:
- ✅ Chrome 120+
- ✅ Firefox 121+
- ✅ Safari 17+
- ✅ Edge 120+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### 🔮 Future Roadmap

#### v2.1.0 (Planned)
- [ ] Backend API integration
- [ ] Admin authentication
- [ ] Email notifications
- [ ] SMS confirmations

#### v2.2.0 (Planned)
- [ ] Payment gateway integration
- [ ] Booking modifications
- [ ] Refund processing
- [ ] Advanced analytics

#### v3.0.0 (Planned)
- [ ] Multi-temple support
- [ ] Multi-language interface
- [ ] Mobile app
- [ ] Real-time sync

---

## [1.0.0] - Previous Release

### Initial Features
- Basic booking system
- Service selection (Darshan, Prasadam, Seva)
- Digital receipts
- Booking history
- Responsive design
- Temple-themed UI
- Live status indicators
- Aarti timeline
- Deity of the day
- Crowd heatmap
- Muhurta picker
- Sankalpa builder
- Virtual garland
- Donation tiers
- Festival calendar
- Price list
- Schema viewer

---

## Version History

- **v2.0.0** (2026-05-03) - Major feature release
- **v1.0.0** (Previous) - Initial release

---

**Note**: This project follows [Semantic Versioning](https://semver.org/).

**Built with devotion** 🙏 **for Sri Kshetra Devasthanam**
