import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingRecord } from "@/components/temple/Receipt";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  IndianRupee, 
  TrendingUp,
  Search,
  Download,
  XCircle,
  CheckCircle,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";
import { resetInventory } from "@/lib/inventory";
import { useAuth } from "@/contexts/AuthContext";
import { UserProfile } from "@/components/auth/UserProfile";

const STORAGE_KEY = "temple-bookings-v1";
const CANCELLED_KEY = "temple-cancelled-v1";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [cancelled, setCancelled] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setBookings(JSON.parse(raw));
      
      const cancelledRaw = localStorage.getItem(CANCELLED_KEY);
      if (cancelledRaw) setCancelled(new Set(JSON.parse(cancelledRaw)));
    } catch (error) {
      console.error("Failed to load bookings", error);
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    if (confirm(`Are you sure you want to cancel booking ${bookingId}?`)) {
      const newCancelled = new Set(cancelled);
      newCancelled.add(bookingId);
      setCancelled(newCancelled);
      localStorage.setItem(CANCELLED_KEY, JSON.stringify([...newCancelled]));
      toast.success("Booking cancelled successfully");
    }
  };

  const handleRestoreBooking = (bookingId: string) => {
    const newCancelled = new Set(cancelled);
    newCancelled.delete(bookingId);
    setCancelled(newCancelled);
    localStorage.setItem(CANCELLED_KEY, JSON.stringify([...newCancelled]));
    toast.success("Booking restored successfully");
  };

  const handleResetInventory = () => {
    if (confirm("Are you sure you want to reset all inventory to default values? This cannot be undone.")) {
      resetInventory();
      toast.success("Inventory reset to default values");
    }
  };

  const exportToCSV = () => {
    const headers = ["Booking ID", "Name", "Contact", "Date", "Total", "Status"];
    const rows = bookings.map(b => [
      b.bookingId,
      b.devotee.name,
      b.devotee.contact,
      b.date,
      b.total.toFixed(2),
      cancelled.has(b.bookingId) ? "Cancelled" : "Active"
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast.success("Bookings exported to CSV");
  };

  const activeBookings = bookings.filter(b => !cancelled.has(b.bookingId));
  const cancelledBookings = bookings.filter(b => cancelled.has(b.bookingId));
  
  const totalRevenue = activeBookings.reduce((sum, b) => sum + b.total, 0);
  const todayBookings = activeBookings.filter(b => {
    const bookingDate = new Date(b.createdAt).toDateString();
    return bookingDate === new Date().toDateString();
  });

  const filteredBookings = bookings.filter(b => 
    b.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.devotee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.devotee.contact.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="font-display text-3xl font-bold text-maroon">
                Admin Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage temple bookings and view analytics
                {user && <span className="ml-2">• Logged in as {user.displayName}</span>}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <Button onClick={handleResetInventory} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset Inventory
              </Button>
              <Button onClick={exportToCSV} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
            <UserProfile />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeBookings.length}</div>
              <p className="text-xs text-muted-foreground">
                {cancelledBookings.length} cancelled
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayBookings.length}</div>
              <p className="text-xs text-muted-foreground">
                Active today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                From active bookings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Booking Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{activeBookings.length > 0 ? (totalRevenue / activeBookings.length).toFixed(2) : "0.00"}
              </div>
              <p className="text-xs text-muted-foreground">
                Per booking
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by booking ID, name, or contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Bookings Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredBookings.length === 0 ? (
                <p className="py-8 text-center text-muted-foreground">
                  No bookings found
                </p>
              ) : (
                filteredBookings.map((booking) => {
                  const isCancelled = cancelled.has(booking.bookingId);
                  return (
                    <div
                      key={booking.bookingId}
                      className={`flex items-center justify-between rounded-lg border p-4 ${
                        isCancelled ? "bg-muted opacity-60" : "bg-card"
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <Badge variant={isCancelled ? "secondary" : "default"}>
                            {booking.bookingId}
                          </Badge>
                          {isCancelled && (
                            <Badge variant="destructive">Cancelled</Badge>
                          )}
                        </div>
                        <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Devotee</p>
                            <p className="font-medium">{booking.devotee.name}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Contact</p>
                            <p className="font-medium">{booking.devotee.contact}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Visit Date</p>
                            <p className="font-medium">{booking.date}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Total</p>
                            <p className="font-bold text-saffron">₹{booking.total.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground">Services:</p>
                          <p className="text-sm">
                            {booking.items.map(item => `${item.service.name} (${item.qty})`).join(", ")}
                          </p>
                        </div>
                      </div>
                      <div className="ml-4">
                        {isCancelled ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRestoreBooking(booking.bookingId)}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Restore
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleCancelBooking(booking.bookingId)}
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
