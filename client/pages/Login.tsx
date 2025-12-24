import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, ArrowRight } from "lucide-react";


export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Validate inputs
      if (!formData.username || !formData.password) {
        throw new Error("Please fill in all fields");
      }

      // Call login from AuthContext
      await login(formData.username, formData.password);
      
      // Navigate to dashboard on success
      navigate("/dashboard");
    } catch (err: any) {
      // Display error message
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
                Recordsetu
              </h1> */}
              <img src="/logo.svg" alt="Recordsetu" className="h-12 w-auto mx-auto" />
              <p className="text-muted-foreground">
                LEA Officer Verification Portal
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-destructive/10 border border-destructive/30 text-destructive text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary hover:text-primary/80 transition"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight className="w-4 h-4" />
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
                  Don't have an account?
                </span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {/* {" "} */}
                <Link
                  to="/signup"
                  className="font-medium text-primary hover:text-primary/80 transition"
                >
                  Request Access
                </Link>
              </p>
            </div>

            {/* Demo Credentials Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-900 space-y-3">
              <p className="font-medium mb-2">📋 Demo Credentials</p>

              <div>
                <p className="font-semibold text-amber-950 mb-1">Admin User (Full Access)</p>
                <div className="space-y-1 font-mono text-amber-900 bg-white px-2 py-1 rounded">
                  <p>Username: <strong>admin@police.gov.in</strong></p>
                  <p>Password: <strong>admin123</strong></p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-amber-950 mb-1">Demo Officer (Standard User)</p>
                <div className="space-y-1 font-mono text-amber-900 bg-white px-2 py-1 rounded">
                  <p>Username: <strong>demo@police.gov.in</strong></p>
                  <p>Password: <strong>demo123</strong></p>
                </div>
              </div>

              <p className="text-amber-800 pt-2 border-t border-amber-200">
                💡 Real API authentication will be used for registered users
              </p>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-900">
              <p className="font-medium mb-1">🔒 Security Notice</p>
              <p>
                Your login credentials are encrypted. Recordsetu uses bank-level
                security protocols to protect your account.
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
