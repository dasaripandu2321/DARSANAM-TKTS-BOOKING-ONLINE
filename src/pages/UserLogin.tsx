import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Chrome, Loader2, User } from "lucide-react";
import heroImg from "@/assets/temple-hero.jpg";

export default function UserLogin() {
  const { user, loading, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page user was trying to access, or default to homepage
  const from = (location.state as any)?.from?.pathname || "/";

  useEffect(() => {
    // Redirect to previous page or homepage if already logged in
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-saffron" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <img 
        src={heroImg} 
        alt="Temple background" 
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-maroon/90 via-saffron/80 to-gold/90 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-gold shadow-temple">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-gold">
              <User className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="font-display text-3xl font-bold text-maroon">
              Devotee Sign In
            </CardTitle>
            <CardDescription className="text-base">
              Sign in to book darshan, prasadam, and seva services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={signInWithGoogle}
              size="lg"
              className="w-full bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm"
            >
              <Chrome className="mr-2 h-5 w-5" />
              Sign in with Google
            </Button>

            <div className="rounded-lg border border-gold/40 bg-amber-50/40 p-4 text-center text-sm">
              <p className="font-medium text-maroon">🙏 Welcome Devotee</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Sign in to book temple services, view your bookings, and receive digital receipts with QR codes
              </p>
            </div>

            <div className="space-y-2 text-center text-sm">
              <p className="text-muted-foreground">Are you an administrator?</p>
              <Button
                variant="link"
                onClick={() => navigate("/admin-login")}
                className="text-maroon font-semibold"
              >
                Sign in as Admin →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-white/80">
        <p>🕉 Sri Kshetra Devasthanam - Devotee Portal</p>
      </div>
    </div>
  );
}
