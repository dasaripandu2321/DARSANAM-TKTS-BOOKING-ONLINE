# Admin Dashboard Guide

## 🔐 Accessing the Admin Dashboard

### Method 1: From Homepage
1. Visit the temple booking homepage
2. Click the **"Admin Dashboard"** button in the hero section
3. You'll be redirected to `/admin`

### Method 2: Direct URL
- Navigate directly to: `http://your-domain.com/admin`

## 📊 Dashboard Overview

### Statistics Cards
The dashboard displays four key metrics at the top:

1. **Total Bookings**
   - Shows count of active (non-cancelled) bookings
   - Displays cancelled count below

2. **Today's Bookings**
   - Number of bookings created today
   - Helps track daily activity

3. **Total Revenue**
   - Sum of all active booking amounts
   - Excludes cancelled bookings

4. **Average Booking Value**
   - Revenue divided by number of bookings
   - Helps understand booking patterns

## 🔍 Search Functionality

Use the search bar to find bookings by:
- **Booking ID** (e.g., TKT-ABC123)
- **Devotee Name** (partial matches work)
- **Contact Number** (partial matches work)

Search is case-insensitive and updates in real-time.

## 📋 Booking Management

### Viewing Booking Details
Each booking card shows:
- Booking ID with badge
- Devotee name and contact
- Visit date
- Total amount
- List of booked services with quantities
- Current status (Active/Cancelled)

### Cancelling a Booking
1. Locate the booking you want to cancel
2. Click the **"Cancel"** button (red, with X icon)
3. Confirm the cancellation in the popup dialog
4. The booking will be marked as cancelled
5. Status badge will change to "Cancelled"
6. Card will appear dimmed

### Restoring a Cancelled Booking
1. Find a cancelled booking (dimmed card with "Cancelled" badge)
2. Click the **"Restore"** button (with checkmark icon)
3. The booking will be reactivated
4. Status returns to active
5. Card returns to normal appearance

## 📥 Exporting Data

### CSV Export
1. Click the **"Export CSV"** button in the top-right
2. A CSV file will download automatically
3. Filename format: `bookings-YYYY-MM-DD.csv`

**CSV Columns:**
- Booking ID
- Name
- Contact
- Date
- Total
- Status (Active/Cancelled)

**Use Cases:**
- Import into Excel/Google Sheets
- Generate reports
- Backup booking data
- Share with accounting

## 🎯 Common Tasks

### Daily Operations Checklist
- [ ] Check today's booking count
- [ ] Review any new bookings
- [ ] Verify contact information is complete
- [ ] Export daily report (CSV)

### Weekly Tasks
- [ ] Review total revenue
- [ ] Check average booking value trends
- [ ] Clean up test/invalid bookings
- [ ] Backup booking data

### Handling Issues

**Duplicate Booking:**
1. Search for devotee name
2. Identify duplicate entries
3. Cancel the incorrect booking
4. Keep the valid one active

**Wrong Information:**
- Currently: Cancel and ask devotee to rebook
- Future: Edit functionality will be added

**Refund Request:**
1. Cancel the booking in dashboard
2. Process refund through payment system
3. Note: Inventory restoration is manual for now

## 💡 Tips & Best Practices

### Search Tips
- Use partial names for faster searching
- Search by phone number for exact matches
- Booking IDs are unique and fastest to search

### Data Management
- Export CSV regularly for backups
- Don't clear browser data (localStorage used)
- Keep cancelled bookings for records

### Performance
- Dashboard loads all bookings at once
- For large datasets (>1000 bookings), consider pagination
- Search filters locally for instant results

## 🚨 Troubleshooting

### Dashboard Not Loading
- Check browser console for errors
- Ensure localStorage is enabled
- Try refreshing the page

### Bookings Not Appearing
- Verify bookings were completed successfully
- Check localStorage key: `temple-bookings-v1`
- Ensure no browser extensions are blocking storage

### Export Not Working
- Check browser download settings
- Ensure pop-ups are not blocked
- Try a different browser

### Statistics Incorrect
- Cancelled bookings are excluded from revenue
- Today's count uses creation date, not visit date
- Refresh page to update statistics

## 🔒 Security Notes

⚠️ **Important for Production:**

1. **Add Authentication**
   - Current version has no login
   - Anyone with URL can access admin panel
   - Implement user authentication before production

2. **Protect Routes**
   - Add route guards
   - Verify admin permissions
   - Log admin actions

3. **Data Validation**
   - Validate all inputs
   - Sanitize search queries
   - Prevent XSS attacks

4. **Audit Trail**
   - Log all cancellations
   - Track who made changes
   - Timestamp all actions

## 📱 Mobile Access

The admin dashboard is fully responsive:
- Works on tablets and phones
- Touch-friendly buttons
- Scrollable tables
- Optimized layout for small screens

## 🆘 Support

For technical issues or feature requests:
1. Check FEATURES.md for documentation
2. Review browser console for errors
3. Contact development team

---

**Remember:** This is a demo version using localStorage. For production, integrate with a proper backend database and add authentication!
