import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Phone, User as UserIcon, CheckCircle, ArrowLeft, Coins } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (user) {
      setFormData({
        username: user.username || "",
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [isAuthenticated, user, navigate]);

  const getInitials = () => {
    if (!user) return "U";
    const firstInitial = user.first_name?.[0] || "";
    const lastInitial = user.last_name?.[0] || "";
    return (firstInitial + lastInitial).toUpperCase() || user.email?.[0].toUpperCase() || "U";
  };

  const handleSave = () => {
    // TODO: Implement save functionality with API call
    setIsEditing(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header
        isLoggedIn={true}
        userName={`${user.first_name} ${user.last_name}`}
        userRole={user.role}
        onLogout={() => navigate("/login")}
        variant="app"
        credits={user.credits || 0}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        <div className="grid lg:grid-cols-[400px_1fr] gap-8">
          {/* Left Sidebar - User Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 h-fit">
            <div className="flex flex-col items-center space-y-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                  {getInitials()}
                </div>
              </div>

              {/* User Info */}
              <div className="text-center space-y-2 w-full">
                <h2 className="text-xl font-bold text-foreground break-all">
                  {user.email}
                </h2>
                <span
                  className={`inline-flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full ${
                    user.role === "admin"
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary/10 text-secondary"
                  }`}
                >
                  {user.role === "admin" ? "🔐 Admin" : "👤 Officer"}
                </span>
              </div>

              {/* Edit Profile Button */}
              <Button
                className="w-full gap-2"
                onClick={() => setIsEditing(!isEditing)}
              >
                <UserIcon className="w-4 h-4" />
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
          </div>

          {/* Right Section - Personal Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Personal Information
            </h2>

            <div className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-muted-foreground">
                  Username
                </Label>
                <Input
                  id="username"
                  value={formData.username}
                  disabled
                  className="bg-gray-50"
                />
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-muted-foreground">
                  Full Name
                </Label>
                {isEditing ? (
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      placeholder="First Name"
                      className="bg-gray-50"
                    />
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      placeholder="Last Name"
                      className="bg-gray-50"
                    />
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 text-muted-foreground">
                    {user.first_name && user.last_name 
                      ? `${user.first_name} ${user.last_name}`
                      : "Not provided"}
                  </div>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    disabled
                    className="bg-gray-50 text-primary font-medium"
                  />
                  {user.is_verified && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-green-500 text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      Verified
                    </div>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-muted-foreground">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Enter phone number"
                  className="bg-gray-50"
                />
              </div>

              {/* Credits Display */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Available Credits
                </Label>
                <div className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Coins className="w-6 h-6" />
                    <div>
                      <p className="text-sm opacity-90">Current Balance</p>
                      <p className="text-3xl font-bold">{user.credits || 0}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                    onClick={() => navigate("/wallet")}
                  >
                    Recharge
                  </Button>
                </div>
              </div>

              {/* Save Button (only visible when editing) */}
              {isEditing && (
                <div className="flex gap-4 pt-4">
                  <Button onClick={handleSave} className="flex-1">
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
