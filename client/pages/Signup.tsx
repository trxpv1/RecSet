import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import { Mail, Lock, User, FileText, ArrowRight } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    badge: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.badge || !formData.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    // Simulate signup
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: formData.email,
            name: formData.name,
            role: "user", // Signup always creates normal users
          })
        );
        navigate("/dashboard");
      }, 1500);
      setIsLoading(false);
    }, 500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-teal-50">
        <Header variant="app" />

        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-8">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl border border-border shadow-lg p-8 space-y-6 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  Application Submitted!
                </h2>
                <p className="text-muted-foreground">
                  Thank you for requesting access to Recordsetu. Your application
                  has been received and will be revied by our team.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
                <p className="font-medium mb-1">What happens next?</p>
                <p>
                  You'll receive an email at <strong>{formData.email}</strong>{" "}
                  with your verification details and access credentials within
                  24 hours.
                </p>
              </div>

              <Button
                onClick={() => navigate("/")}
                className="w-full"
                variant="outline"
              >
                Back to Home
              </Button>
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
              {/* <div className="flex justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">R</span>
                </div>
              </div>
              <h1 className="text-3xl font-heading font-bold text-foreground">
                Join Recordsetu
              </h1> */}
              <img src="/logo.svg" alt="Recordsetu" className="h-12 w-auto mx-auto" />
              <p className="text-muted-foreground">
                Request access to our verification portal
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-destructive/10 border border-destructive/30 text-destructive text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Full Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="officer@lea.gov.in"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Badge Number Field */}
              <div className="space-y-2">
                <Label htmlFor="badge" className="text-sm font-medium">
                  Officer Badge / ID Number
                </Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="badge"
                    name="badge"
                    type="text"
                    placeholder="LEA-2024-xxxxx"
                    value={formData.badge}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
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
                    Processing...
                  </>
                ) : (
                  <>
                    Request Access <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                  Already have access?
                </span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                <Link
                  to="/login"
                  className="font-medium text-primary hover:text-primary/80 transition"
                >
                  Sign in instead
                </Link>
              </p>
            </div>

            {/* Info Notice */}
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-xs text-teal-900">
              <p className="font-medium mb-2">📋 Account Type</p>
              <p className="mb-2">
                You are signing up as a <strong>Regular Officer</strong>. You'll have access to verification searches and credit management.
              </p>
              <p className="text-teal-800">
                Your application will be verified against government LEA databases. Only authorized officers can access this portal.
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
