import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { BookingRecord } from "@/components/temple/Receipt";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Receipt as ReceiptIcon } from "lucide-react";
import { Receipt } from "@/components/temple/Receipt";
import { UserProfile } from "@/components/auth/UserProfile";

const STORAGE_KEY = "temple-bookings-v1";

export default function MyBookings() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
      return;
    }

    if (user) {
      loadUserBookings();
    }
  }, [user, loading, navigate]);

  const loadUserBookings = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const allBookings: BookingRecord[] = JSON.parse(raw);
        // Filter bookings for current user
        const userBookings = allBookings.filter(
          (b) => b.devotee.userId === user?.uid || b.devotee.email === user?.email
        );
        setBookings(userBookings);
      }
    } catch (error) {
      console.error("Failed to load bookings", error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-saffron border-t-transparent" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
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
                My Bookings
              </h1>
              <p className="text-sm text-muted-foreground">
                View and manage your temple bookings
              </p>
            </div>
          </div>
          <UserProfile />
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="mx-auto mb-4 text-6xl">🙏</div>
              <h3 className="mb-2 font-display text-xl font-bold text-maroon">
                No Bookings Yet
              </h3>
              <p className="mb-4 text-muted-foreground">
                You haven't made any bookings yet. Start by booking a darshan!
              </p>
              <Button onClick={() => navigate("/")} className="bg-temple-gradient">
                Book Now
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <Card
                key={booking.bookingId}
                className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-temple"
                onClick={() => setSelectedBooking(booking)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="default" className="mb-2">
                        {booking.bookingId}
                      </Badge>
                      <CardTitle className="text-lg">
                        {booking.devotee.name}
                      </CardTitle>
                    </div>
                    <ReceiptIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="mt-3 border-t pt-3">
                      <p className="text-xs text-muted-foreground">Services:</p>
                      <p className="text-sm">
                        {booking.items.map((item) => item.service.name).join(", ")}
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-t pt-3">
                      <span className="text-xs text-muted-foreground">Total</span>
                      <span className="font-display text-xl font-bold text-saffron">
                        ₹{booking.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {selectedBooking && (
        <Receipt
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
}
