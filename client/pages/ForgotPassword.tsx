import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";
import { authAPI } from "@/lib/apiClient";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (!email) {
      setError("Please enter your email address");
      setIsLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      // Call backend API to send password reset email
      await authAPI.forgotPassword({ email });
      setSuccess(true);
    } catch (err: any) {
      console.error("Forgot password error:", err);
      setError(err.message || "Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-teal-50">
        <Header variant="app" />

        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-8">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl border border-border shadow-lg p-8 space-y-6">
              {/* Success Icon */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-secondary" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    Check Your Email
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    We've sent password reset instructions to
                  </p>
                  <p className="text-foreground font-medium">
                    {email}
                  </p>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2 text-sm">
                <p className="font-medium text-blue-900">📧 Next Steps:</p>
                <ul className="space-y-1 text-blue-800 text-xs">
                  <li>• Check your inbox for the password reset email</li>
                  <li>• Click the reset link within 15 minutes</li>
                  <li>• Check spam folder if you don't see the email</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Link to="/login" className="block">
                  <Button className="w-full gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                  </Button>
                </Link>

                <button
                  onClick={() => setSuccess(false)}
                  className="w-full text-sm text-primary hover:text-primary/80 transition"
                >
                  Didn't receive the email? Try again
                </button>
              </div>

              {/* Support */}
              <div className="text-center text-xs text-muted-foreground">
                <p>
                  Need help?{" "}
                  <Link to="/contact" className="text-primary hover:text-primary/80">
                    Contact Support
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-teal-50">
      <Header variant="app" />

      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-border shadow-lg p-8 space-y-6">
            {/* Logo & Title */}
            <div className="text-center space-y-2">
              <img src="/logo.svg" alt="Recordsetu" className="h-12 w-auto mx-auto" />
              <h1 className="text-2xl font-heading font-bold text-foreground">
                Reset Password
              </h1>
              <p className="text-muted-foreground text-sm">
                Enter your email address and we'll send you instructions to reset your password
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-destructive/10 border border-destructive/30 text-destructive text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Reset Link <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Back to Login */}
            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-900">
              <p className="font-medium mb-1">🔒 Security Notice</p>
              <p>
                Password reset links expire after 15 minutes for security. If you don't see the email, check your spam folder.
              </p>
            </div>
          </div>

          {/* Footer Text */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            © 2026 Recordsetu. Secure Government Record Verification.
          </p>
        </div>
      </div>
    </div>
  );
}