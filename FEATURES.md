# Temple Booking System - New Features

## ✨ Recently Added Features

### 1. 🎫 QR Code Tickets
- **Automatic QR Code Generation**: Every booking now generates a unique QR code
- **Embedded in Receipt**: QR code is displayed on the digital receipt
- **Contains Booking Details**: Includes booking ID, devotee name, visit date, and total amount
- **Scannable at Temple**: Can be scanned at temple entrance for verification

### 2. 📄 Receipt Export to PDF
- **One-Click PDF Export**: Export receipts as PDF files with a single click
- **High-Quality Output**: Uses html2canvas for accurate rendering
- **Includes QR Code**: PDF contains the QR code for easy printing
- **Named Files**: PDFs are automatically named with booking ID (e.g., `TKT-ABC123-receipt.pdf`)

### 3. 📊 Admin Dashboard
- **Comprehensive Overview**: View all bookings in one place
- **Real-Time Statistics**:
  - Total bookings count
  - Today's bookings
  - Total revenue
  - Average booking value
- **Search Functionality**: Search by booking ID, name, or contact number
- **Booking Management**: View detailed information for each booking
- **CSV Export**: Export all bookings to CSV for external analysis
- **Cancellation Management**: Cancel and restore bookings

### 4. 📦 Real Inventory Limits
- **Per-Service Inventory**: Each service has a defined inventory limit
- **Real-Time Updates**: Inventory decreases with each booking
- **Visual Indicators**:
  - Shows available quantity on service cards
  - "Out of Stock" badge when inventory is depleted
  - Low stock warning (orange text) when ≤10 items remain
- **Booking Limits**: Maximum quantity per booking enforced
- **Automatic Validation**: Prevents overbooking

**Inventory Limits by Service:**
- General Darshanam: 1000 slots (max 10 per booking)
- Special Darshanam: 200 slots (max 6 per booking)
- VIP Darshanam: 50 slots (max 4 per booking)
- Suprabhata Seva: 30 slots (max 2 per booking)
- Prasadam items: 150-500 units
- Seva rituals: 10-100 slots

### 5. ❌ Booking Cancellation
- **Admin Cancellation**: Admins can cancel bookings from the dashboard
- **Restore Capability**: Cancelled bookings can be restored
- **Visual Status**: Cancelled bookings are clearly marked with badges
- **Inventory Restoration**: Cancelling a booking restores inventory (future enhancement)
- **Persistent Storage**: Cancellation status is saved in localStorage

### 6. 🕉️ Devotional Favicon
- **Custom Om Symbol**: Beautiful gradient Om (ॐ) icon
- **Saffron/Orange Theme**: Matches temple aesthetic
- **SVG Format**: Crisp display at any size
- **Spiritual Identity**: Instantly recognizable as a devotional site

## 🚀 How to Use

### For Devotees:
1. **Browse Services**: Select darshan, prasadam, or seva
2. **Check Availability**: See real-time inventory on each service card
3. **Add to Cart**: Add services (respecting max limits)
4. **Complete Booking**: Fill in devotee details and confirm
5. **Get Receipt**: View digital receipt with QR code
6. **Download PDF**: Export receipt as PDF for printing
7. **Visit Temple**: Show QR code at entrance

### For Admins:
1. **Access Dashboard**: Click "Admin Dashboard" button on homepage or visit `/admin`
2. **View Statistics**: See overview of bookings and revenue
3. **Search Bookings**: Use search bar to find specific bookings
4. **Manage Bookings**: Cancel or restore bookings as needed
5. **Export Data**: Download CSV for reporting

## 🛠️ Technical Implementation

### Dependencies Added:
```json
{
  "qrcode": "^1.5.x",
  "jspdf": "^2.5.x",
  "html2canvas": "^1.4.x",
  "@types/qrcode": "^1.5.x"
}
```

### New Files Created:
- `src/pages/AdminDashboard.tsx` - Admin interface
- `src/lib/inventory.ts` - Inventory management utilities
- `public/om-favicon.svg` - Devotional favicon
- `FEATURES.md` - This documentation

### Modified Files:
- `src/components/temple/Receipt.tsx` - Added QR code and PDF export
- `src/components/temple/ServiceCard.tsx` - Added inventory display
- `src/lib/temple-data.ts` - Added inventory fields to services
- `src/pages/Index.tsx` - Integrated inventory management
- `src/App.tsx` - Added admin route
- `index.html` - Updated favicon reference

### Storage Keys:
- `temple-bookings-v1` - Booking history
- `temple-inventory-v1` - Current inventory levels
- `temple-cancelled-v1` - Cancelled booking IDs

## 🎨 UI/UX Enhancements

- **Inventory Badges**: Color-coded availability indicators
- **Disabled States**: Buttons disabled when out of stock or at max quantity
- **Toast Notifications**: User-friendly error messages for inventory limits
- **Responsive Design**: All new features work on mobile and desktop
- **Print Optimization**: Receipt optimized for printing

## 🔮 Future Enhancements

- [ ] Automatic inventory restoration on cancellation
- [ ] Email notifications with QR code
- [ ] SMS booking confirmations
- [ ] Real-time inventory sync across devices
- [ ] Admin authentication
- [ ] Booking modification (date/time changes)
- [ ] Refund processing
- [ ] Analytics dashboard with charts
- [ ] Multi-language support
- [ ] Payment gateway integration

## 📝 Notes

- All data is stored in browser localStorage (demo mode)
- For production, integrate with a backend API
- QR codes contain JSON data - implement server-side validation
- Inventory resets when localStorage is cleared
- Admin dashboard has no authentication (add for production)

---

**Built with devotion** 🙏 **for Sri Kshetra Devasthanam**
