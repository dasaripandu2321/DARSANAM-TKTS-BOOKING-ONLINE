# 🚀 Quick Start Guide

## For Devotees (Users)

### Making a Booking

1. **Visit the Homepage**
   - You'll see the beautiful temple hero section
   - Notice the new **Om (ॐ) favicon** in your browser tab!

2. **Browse Services**
   - Click "Book Darshan" or scroll down
   - Choose from three categories:
     - 🙏 Darshanam
     - 🍲 Prasadam
     - 🕉️ Seva & Rituals

3. **Check Availability** ⭐ NEW!
   - Each service card now shows **available inventory**
   - Example: "50 available" or "⚠ Out of Stock"
   - Low stock items show in orange (≤10 remaining)

4. **Add to Cart**
   - Click "Add to booking"
   - Use +/- buttons to adjust quantity
   - System prevents exceeding:
     - Available inventory
     - Maximum per booking limit

5. **Complete Booking**
   - Fill in devotee details
   - Select visit date
   - Click "Confirm Booking 🪔"

6. **View Receipt** ⭐ NEW!
   - Receipt modal appears automatically
   - **QR Code** displayed prominently
   - Contains your booking details

7. **Export Options** ⭐ NEW!
   - **Print**: Click "Print" button
   - **PDF**: Click "PDF" button to download
   - File saved as: `TKT-{ID}-receipt.pdf`

8. **At the Temple**
   - Show QR code on phone or printed receipt
   - Temple staff can scan for verification

---

## For Administrators

### Accessing Admin Dashboard ⭐ NEW!

**Option 1:** From Homepage
- Click "Admin Dashboard" button in hero section

**Option 2:** Direct URL
- Navigate to: `/admin`

### Dashboard Features

#### 📊 Statistics Overview
At the top, you'll see four cards:
- **Total Bookings**: Active bookings count
- **Today's Bookings**: Bookings made today
- **Total Revenue**: Sum of active bookings
- **Average Booking Value**: Revenue per booking

#### 🔍 Search Bookings
- Use search bar to find bookings
- Search by:
  - Booking ID (e.g., TKT-ABC123)
  - Devotee name
  - Contact number
- Results update instantly

#### 📋 Manage Bookings

**View Details:**
- Each card shows complete booking info
- Devotee details
- Services booked
- Total amount
- Status badge

**Cancel a Booking:** ⭐ NEW!
1. Find the booking
2. Click red "Cancel" button
3. Confirm in dialog
4. Booking marked as cancelled
5. Excluded from revenue stats

**Restore a Booking:** ⭐ NEW!
1. Find cancelled booking (dimmed card)
2. Click "Restore" button
3. Booking reactivated

#### 📥 Export Data

**CSV Export:**
1. Click "Export CSV" button (top-right)
2. File downloads automatically
3. Contains all booking data
4. Open in Excel/Google Sheets

**Reset Inventory:** ⭐ NEW!
1. Click "Reset Inventory" button
2. Confirm action
3. All inventory restored to defaults
4. Use when starting new day/period

---

## 🎯 Common Scenarios

### Scenario 1: Booking VIP Darshan

```
1. Click "Darshanam" tab
2. Find "VIP Darshanam" card
3. Check availability: "50 available"
4. Click "Add to booking"
5. See it added to cart (right sidebar)
6. Fill devotee details
7. Confirm booking
8. Download PDF receipt with QR code
```

### Scenario 2: Out of Stock Item

```
1. Browse services
2. See "⚠ Out of Stock" on a service
3. "Add to booking" button is disabled
4. Choose alternative service
5. System prevents adding unavailable items
```

### Scenario 3: Admin Cancellation

```
1. Go to /admin
2. Search for booking ID
3. Click "Cancel" button
4. Confirm cancellation
5. Booking status changes
6. Revenue stats update automatically
```

### Scenario 4: Daily Report

```
1. Access admin dashboard
2. Check "Today's Bookings" stat
3. Click "Export CSV"
4. Open file in Excel
5. Filter by today's date
6. Generate report
```

---

## 💡 Pro Tips

### For Users
- **Book Early**: Popular services have limited inventory
- **Save PDF**: Download receipt PDF for backup
- **Check Limits**: Each service has max quantity per booking
- **Low Stock Alert**: Orange text means limited availability

### For Admins
- **Daily Routine**: 
  - Check today's bookings each morning
  - Export CSV for records
  - Reset inventory if needed
- **Search Shortcuts**:
  - Use booking ID for fastest search
  - Partial names work fine
- **Data Safety**:
  - Export CSV regularly
  - Don't clear browser data
  - Keep cancelled bookings for records

---

## 🔧 Troubleshooting

### "Out of Stock" but I just started?
- Inventory persists in browser
- Click "Reset Inventory" in admin dashboard
- Or clear browser localStorage

### QR Code not showing?
- Refresh the page
- Check browser console for errors
- Ensure JavaScript is enabled

### PDF download not working?
- Check browser download settings
- Disable pop-up blockers
- Try different browser

### Admin dashboard empty?
- Make at least one booking first
- Check localStorage is enabled
- Refresh the page

### Can't add more items?
- Check available inventory
- Verify max per booking limit
- See error toast for details

---

## 📱 Mobile Usage

All features work on mobile:
- ✅ Browse and book services
- ✅ View QR codes
- ✅ Download PDFs
- ✅ Access admin dashboard
- ✅ Search and manage bookings

**Mobile Tips:**
- Pinch to zoom QR code
- Use "Share" to send PDF
- Landscape mode for admin dashboard

---

## 🎨 Visual Indicators

### Service Cards
- **Green text**: Good availability
- **Orange text**: Low stock (≤10)
- **Red badge**: Out of stock
- **Disabled button**: Can't add more

### Admin Dashboard
- **Blue badge**: Booking ID
- **Red badge**: Cancelled status
- **Dimmed card**: Cancelled booking
- **Bold orange**: Total amount

### Buttons
- **Gold gradient**: Primary actions
- **Red**: Destructive actions (cancel)
- **Green**: Positive actions (restore)
- **Gray**: Secondary actions

---

## 🆘 Need Help?

1. **Check Documentation**
   - `FEATURES.md` - Feature details
   - `ADMIN_GUIDE.md` - Admin instructions
   - `IMPLEMENTATION_SUMMARY.md` - Technical info

2. **Browser Console**
   - Press F12
   - Check for error messages
   - Look for red text

3. **Test in Incognito**
   - Rules out extension conflicts
   - Fresh localStorage state

---

## 🎉 You're Ready!

Start booking darshanam, prasadam, and sevas with:
- ✅ Real-time inventory tracking
- ✅ QR code tickets
- ✅ PDF receipts
- ✅ Full admin control

**May your bookings be blessed!** 🙏

---

**Built with devotion for Sri Kshetra Devasthanam** 🕉️
