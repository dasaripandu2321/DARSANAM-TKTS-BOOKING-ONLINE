# 📸 Visual Feature Guide

A visual walkthrough of all new features in the Temple Booking System.

---

## 🕉️ New Devotional Favicon

**Location**: Browser tab

**What You'll See:**
```
🕉️ Om symbol in gradient saffron/orange colors
```

**Details:**
- Appears in browser tab
- Shows in bookmarks
- Displays in browser history
- SVG format (crisp at any size)

---

## 📦 Real Inventory Display

### Service Cards - Available Stock

**Location**: Main booking page, service cards

**Visual Elements:**

#### Good Stock (>10 items)
```
┌─────────────────────────────────┐
│ VIP Darshanam                   │
│ Express darshan with garland    │
│ ⏱ 20-30 min                     │
│ 50 available          ₹500      │ ← Green text
│ [Add to booking]                │
└─────────────────────────────────┘
```

#### Low Stock (≤10 items)
```
┌─────────────────────────────────┐
│ Kalyanotsavam                   │
│ Celestial wedding ritual        │
│ ⏱ 60 min                        │
│ 8 available          ₹2500      │ ← Orange text (warning)
│ [Add to booking]                │
└─────────────────────────────────┘
```

#### Out of Stock
```
┌─────────────────────────────────┐
│ Abhishekam                      │
│ Sacred bathing ceremony         │
│ ⏱ 45 min                        │
│ ⚠ Out of Stock      ₹1500       │ ← Red text
│ [Out of Stock]                  │ ← Disabled button
└─────────────────────────────────┘
```

### Quantity Controls

**When item is in cart:**
```
┌─────────────────────────────────┐
│ Special Darshanam               │
│ Shorter queue, priority entry   │
│ ⏱ 45-60 min                     │
│ 195 available        ₹300       │
│ ┌─────────────────────────┐    │
│ │  [-]    3    [+]        │    │ ← Quantity controls
│ └─────────────────────────┘    │
└─────────────────────────────────┘
```

**At maximum limit:**
```
│ ┌─────────────────────────┐    │
│ │  [-]    6    [+]        │    │ ← [+] button disabled
│ └─────────────────────────┘    │
│ Maximum 6 per booking           │ ← Toast notification
```

---

## 🎫 QR Code Tickets

### Receipt Modal with QR Code

**Location**: After booking confirmation

**Visual Layout:**
```
┌─────────────────────────────────────┐
│           [X] Close                 │
│  ✓ Booking Confirmed                │
│  Sri Kshetra Digital Receipt        │
├─────────────────────────────────────┤
│                                     │
│  Booking ID: TKT-ABC123             │
│                                     │
│  Devotee: Rama Kumar                │
│  Contact: +91 98765 43210           │
│  Visit Date: Monday, 5 May 2026     │
│                                     │
│  Services Booked:                   │
│  VIP Darshanam      x1    ₹500.00   │
│  Laddu Prasadam     x5    ₹250.00   │
│                                     │
│  Total Paid: ₹750.00                │
│                                     │
│  ┌─────────────────────┐           │
│  │                     │           │
│  │   [QR CODE IMAGE]   │           │ ← QR Code
│  │                     │           │
│  └─────────────────────┘           │
│  Scan this QR code at temple       │
│                                     │
│  🕉 May the divine grace be with   │
│  you. Please arrive 30 minutes     │
│  prior to your slot.               │
│                                     │
│  [Print] [PDF] [Close]              │
└─────────────────────────────────────┘
```

**QR Code Contains:**
```json
{
  "id": "TKT-ABC123",
  "name": "Rama Kumar",
  "date": "Monday, 5 May 2026",
  "total": 750
}
```

---

## 📄 PDF Export

### Downloaded PDF File

**Filename**: `TKT-ABC123-receipt.pdf`

**Content**: Identical to receipt modal including:
- All booking details
- QR code (high resolution)
- Professional formatting
- Print-ready layout

**File Size**: ~50-100 KB

---

## 📊 Admin Dashboard

### Dashboard Header

**Location**: `/admin`

```
┌─────────────────────────────────────────────────────┐
│ [←] Admin Dashboard                [Reset] [Export] │
│     Manage temple bookings and view analytics       │
└─────────────────────────────────────────────────────┘
```

### Statistics Cards

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Total        │ Today's      │ Total        │ Avg. Booking │
│ Bookings     │ Bookings     │ Revenue      │ Value        │
│              │              │              │              │
│    156       │     23       │  ₹45,600.00  │  ₹292.31     │
│ 12 cancelled │ Active today │ From active  │ Per booking  │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

### Search Bar

```
┌─────────────────────────────────────────────────────┐
│ 🔍 Search by booking ID, name, or contact...        │
└─────────────────────────────────────────────────────┘
```

### Booking Cards

#### Active Booking
```
┌─────────────────────────────────────────────────────┐
│ [TKT-ABC123]                                        │
│                                                     │
│ Devotee: Rama Kumar        Contact: +91 98765...   │
│ Visit Date: Monday, 5 May  Total: ₹750.00          │
│                                                     │
│ Services: VIP Darshanam (1), Laddu Prasadam (5)    │
│                                                     │
│                                    [Cancel] ←Red    │
└─────────────────────────────────────────────────────┘
```

#### Cancelled Booking
```
┌─────────────────────────────────────────────────────┐
│ [TKT-XYZ789] [Cancelled] ← Red badge                │
│                                                     │
│ Devotee: Sita Devi         Contact: +91 98765...   │
│ Visit Date: Tuesday, 6 May Total: ₹500.00          │
│                                                     │
│ Services: Special Darshanam (2)                     │
│                                                     │
│                                   [Restore] ←Green  │
└─────────────────────────────────────────────────────┘
```
*Note: Cancelled cards appear dimmed/faded*

### Export Buttons

```
┌──────────────────┐  ┌──────────────────┐
│ 🔄 Reset         │  │ 📥 Export CSV    │
│    Inventory     │  │                  │
└──────────────────┘  └──────────────────┘
```

---

## 🎨 Color Coding Guide

### Status Colors

| Color | Meaning | Used For |
|-------|---------|----------|
| 🟢 Green | Good/Available | Available inventory, restore button |
| 🟠 Orange | Warning/Low | Low stock (≤10 items) |
| 🔴 Red | Error/Unavailable | Out of stock, cancel button |
| 🔵 Blue | Info | Booking ID badges |
| 🟡 Gold | Primary | Total amounts, main actions |

### Text Colors

```css
/* Available inventory (good stock) */
color: text-muted-foreground (gray)

/* Low stock warning */
color: orange-600

/* Out of stock */
color: destructive (red)

/* Total amounts */
color: saffron (orange-gold)

/* Booking IDs */
color: maroon
```

---

## 📱 Mobile View

### Service Card (Mobile)

```
┌─────────────────────┐
│ VIP Darshanam       │
│ Express darshan     │
│ ⏱ 20-30 min         │
│ 50 available        │
│         ₹500        │
│ [Add to booking]    │
└─────────────────────┘
```

### Receipt Modal (Mobile)

```
┌───────────────┐
│      [X]      │
│  ✓ Confirmed  │
├───────────────┤
│ TKT-ABC123    │
│               │
│ Rama Kumar    │
│ +91 98765...  │
│               │
│ [QR CODE]     │
│               │
│ ₹750.00       │
│               │
│ [Print]       │
│ [PDF]         │
│ [Close]       │
└───────────────┘
```

### Admin Dashboard (Mobile)

**Statistics stack vertically:**
```
┌──────────────┐
│ Total        │
│ Bookings     │
│    156       │
└──────────────┘
┌──────────────┐
│ Today's      │
│ Bookings     │
│     23       │
└──────────────┘
```

---

## 🎭 Animations & Effects

### Loading States

**During PDF generation:**
```
┌─────────────────────┐
│  Generating PDF...  │
│  ⏳ Please wait     │
└─────────────────────┘
```

### Toast Notifications

**Success:**
```
┌─────────────────────────────┐
│ ✓ Booking confirmed! 🪔     │
│   Awaiting your darshan     │
└─────────────────────────────┘
```

**Error:**
```
┌─────────────────────────────┐
│ ✗ Not enough inventory      │
│   for VIP Darshanam         │
└─────────────────────────────┘
```

**Info:**
```
┌─────────────────────────────┐
│ ℹ Maximum 6 per booking     │
└─────────────────────────────┘
```

### Button States

**Normal:**
```
[Add to booking]
```

**Hover:**
```
[Add to booking] ← Slightly elevated, shadow
```

**Disabled:**
```
[Out of Stock] ← Grayed out, no hover effect
```

**Loading:**
```
[⏳ Processing...] ← Spinner animation
```

---

## 🖼️ Icon Reference

| Icon | Meaning | Location |
|------|---------|----------|
| 🕉️ | Om symbol | Favicon, footer |
| 🙏 | Prayer/Darshan | Category tabs |
| 🍲 | Prasadam | Category tabs |
| 🔔 | Notifications | Book button |
| 📍 | Location | Today button |
| ✓ | Success | Receipt header |
| ⏱ | Duration | Service cards |
| 🔍 | Search | Search bar |
| 📥 | Download | Export buttons |
| ❌ | Cancel | Cancel button |
| ✓ | Restore | Restore button |
| 🔄 | Reset | Reset button |
| ← | Back | Navigation |
| 👥 | Users | Statistics |
| 📅 | Calendar | Statistics |
| ₹ | Currency | Revenue |
| 📈 | Trending | Analytics |

---

## 🎯 User Flow Diagrams

### Booking Flow

```
Homepage
   ↓
Browse Services (see inventory)
   ↓
Add to Cart (check limits)
   ↓
Fill Details
   ↓
Confirm Booking
   ↓
View Receipt (with QR code)
   ↓
Download PDF / Print
```

### Admin Flow

```
Admin Dashboard
   ↓
View Statistics
   ↓
Search Booking
   ↓
View Details
   ↓
Cancel / Restore
   ↓
Export CSV
```

---

## 💡 Visual Tips

### For Users
- **Green numbers** = Good availability
- **Orange numbers** = Book soon!
- **Red badge** = Sold out
- **QR code** = Your ticket
- **PDF button** = Save for later

### For Admins
- **Blue badges** = Booking IDs
- **Red badges** = Cancelled
- **Dimmed cards** = Inactive
- **Bold orange** = Money
- **Search bar** = Find anything

---

**This visual guide helps you understand the UI at a glance!** 👀

**Built with devotion** 🙏 **for Sri Kshetra Devasthanam**
