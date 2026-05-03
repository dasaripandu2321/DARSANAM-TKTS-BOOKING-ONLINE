import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Chrome, Loader2, Shield } from "lucide-react";
import heroImg from "@/assets/temple-hero.jpg";

export default function AdminLogin() {
  const { user, loading, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to admin dashboard if already logged in
    if (user) {
      navigate("/admin", { replace: true });
    }
  }, [user, navigate]);

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
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-maroon/85 to-gray-800/90 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-red-900 shadow-2xl">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-800">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="font-display text-3xl font-bold text-maroon">
              Admin Portal
            </CardTitle>
            <CardDescription className="text-base">
              Authorized access only - Sign in to manage temple operations
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

            <div className="rounded-lg border border-red-900/40 bg-red-50/40 p-4 text-center text-sm">
              <p className="font-medium text-red-900">🔒 Secure Admin Access</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Only authorized administrators can access the management dashboard
              </p>
            </div>

            <div className="space-y-2 text-center text-sm">
              <p className="text-muted-foreground">Not an administrator?</p>
              <Button
                variant="link"
                onClick={() => navigate("/login")}
                className="text-maroon font-semibold"
              >
                ← Sign in as Devotee
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-white/80">
        <p>🕉 Sri Kshetra Devasthanam - Admin Portal</p>
      </div>
    </div>
  );
}
