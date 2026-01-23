import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X, Coins, MessageCircle, User } from "lucide-react";
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
                {/* <Link
                  to="/features"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Features
                </Link> */}
                {/* <Link
                  to="/pricing"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Pricing
                </Link> */}
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
                        {/* <p className="text-white/80 text-xs mt-1">
                          Avg cost: 2.5 credits per verification
                        </p> */}
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

                {/* WhatsApp Contact Button */}
                <a
                  href="https://wa.me/919876543210?text=Hello%2C%20I%20need%20help%20with%20Recordsetu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 hover:opacity-80 transition-opacity"
                  title="Contact us on WhatsApp"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>

                <Link to="/profile">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                    title="View Profile"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Button>
                </Link>
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

                  <a
                    href="https://wa.me/919876543210?text=Hello%2C%20I%20need%20help%20with%20Recordsetu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-2 text-green-600 hover:text-green-700"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      WhatsApp Support
                    </Button>
                  </a>

                  <Link to="/profile" className="block" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-2"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Button>
                  </Link>
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