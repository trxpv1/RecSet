import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X, Coins } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
  userRole?: "admin" | "user";
  onLogout?: () => void;
  variant?: "landing" | "app";
  credits?: number; // NEW: Add credits prop
}

export default function Header({
  isLoggedIn = false,
  userName,
  userRole,
  onLogout,
  variant = "landing",
  credits = 0, // NEW: Default to 0
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [creditDropdownOpen, setCreditDropdownOpen] = useState(false); // NEW: Dropdown state

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/logo.svg" alt="Recordsetu Logo" style={{ maxHeight: '40px', height: '40px', width: 'auto' }} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {variant === "landing" && (
              <>
                <Link
                  to="/"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  About
                </Link>
                <Link
                  to="/features"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Features
                </Link>
                <Link
                  to="/pricing"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  to="/contact"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </>
            )}
          </nav>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                {/* NEW: Credit Balance Chip with Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setCreditDropdownOpen(!creditDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-br from-primary to-primary/80 text-white rounded-full hover:shadow-lg transition-all"
                  >
                    <Coins className="w-4 h-4" />
                    <span className="font-semibold text-sm">{credits}</span>
                    <svg 
                      className={`w-3 h-3 transition-transform ${creditDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {creditDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-border overflow-hidden z-50">
                      <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Coins className="w-5 h-5" />
                          <span className="text-sm font-medium">Available Credits</span>
                        </div>
                        <p className="text-3xl font-bold">{credits}</p>
                        <p className="text-white/80 text-xs mt-1">
                          Avg cost: 2.5 credits per verification
                        </p>
                      </div>
                      <div className="p-3">
                        <Link to="/wallet" onClick={() => setCreditDropdownOpen(false)}>
                          <Button className="w-full" size="sm">
                            Recharge Wallet
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    Welcome, {userName}
                  </span>
                  <div className="w-1 h-1 bg-muted rounded-full" />
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      userRole === "admin"
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary/10 text-secondary"
                    }`}
                  >
                    {userRole === "admin" ? "🔐 Admin" : "👤 Officer"}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Request Access</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {variant === "landing" && (
              <>
                <Link
                  to="/"
                  className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  About
                </Link>
                <Link
                  to="/features"
                  className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  Features
                </Link>
                <Link
                  to="/pricing"
                  className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  Contact
                </Link>
              </>
            )}
            <div className="px-3 py-2 space-y-2">
              {isLoggedIn ? (
                <>
                  {/* Mobile Credit Display */}
                  <div className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-lg p-3 mb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Coins className="w-4 h-4" />
                      <span className="text-xs font-medium">Credits</span>
                    </div>
                    <p className="text-2xl font-bold">{credits}</p>
                    <Link to="/wallet">
                      <Button size="sm" variant="ghost" className="w-full mt-2 text-white hover:bg-white/20">
                        Recharge
                      </Button>
                    </Link>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Welcome, {userName}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onLogout}
                    className="w-full justify-start gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block">
                    <Button variant="ghost" size="sm" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" className="block">
                    <Button size="sm" className="w-full">
                      Request Access
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}