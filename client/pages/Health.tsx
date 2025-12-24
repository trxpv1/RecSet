import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Activity,
  AlertCircle,
  CheckCircle,
  LogOut,
  RefreshCw,
  Zap,
  TrendingUp,
  Clock,
  Server,
  Loader,
} from "lucide-react";

interface User {
  email: string;
  name: string;
  role?: "admin" | "user";
}

interface ServiceHealth {
  id: string;
  name: string;
  category: string;
  status: "healthy" | "degraded" | "down";
  uptime: number;
  responseTime: number;
  lastChecked: string;
  description: string;
  incidents?: number;
}

export default function Health() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [services, setServices] = useState<ServiceHealth[]>([
    {
      id: "aadhar",
      name: "Aadhar Verification",
      category: "Identity",
      status: "healthy",
      uptime: 99.98,
      responseTime: 145,
      lastChecked: new Date().toISOString(),
      description: "Aadhar number verification service",
      incidents: 0,
    },
    {
      id: "pan",
      name: "PAN Verification",
      category: "Identity",
      status: "healthy",
      uptime: 99.95,
      responseTime: 98,
      lastChecked: new Date().toISOString(),
      description: "Income tax PAN verification",
      incidents: 0,
    },
    {
      id: "rc",
      name: "RC Registration",
      category: "Identity",
      status: "healthy",
      uptime: 99.92,
      responseTime: 167,
      lastChecked: new Date().toISOString(),
      description: "Vehicle RC details verification",
      incidents: 0,
    },
    {
      id: "pan-to-bank",
      name: "Phone to Bank API",
      category: "Financial",
      status: "healthy",
      uptime: 99.92,
      responseTime: 203,
      lastChecked: new Date().toISOString(),
      description: "Phone to bank account linking service",
      incidents: 0,
    },
    {
      id: "gst",
      name: "GST Verification",
      category: "Financial",
      status: "healthy",
      uptime: 99.88,
      responseTime: 167,
      lastChecked: new Date().toISOString(),
      description: "GST registration verification",
      incidents: 0,
    },
    {
      id: "bank",
      name: "Bank Account API",
      category: "Financial",
      status: "degraded",
      uptime: 98.5,
      responseTime: 456,
      lastChecked: new Date().toISOString(),
      description: "Bank account validation service",
      incidents: 1,
    },
    {
      id: "upi",
      name: "UPI Verification",
      category: "Financial",
      status: "healthy",
      uptime: 99.99,
      responseTime: 112,
      lastChecked: new Date().toISOString(),
      description: "UPI details verification",
      incidents: 0,
    },
    {
      id: "database",
      name: "Primary Database",
      category: "Infrastructure",
      status: "healthy",
      uptime: 99.99,
      responseTime: 45,
      lastChecked: new Date().toISOString(),
      description: "Main database cluster",
      incidents: 0,
    },
    {
      id: "cache",
      name: "Cache Layer",
      category: "Infrastructure",
      status: "healthy",
      uptime: 99.97,
      responseTime: 12,
      lastChecked: new Date().toISOString(),
      description: "Redis cache server",
      incidents: 0,
    },
    {
      id: "api-gateway",
      name: "API Gateway",
      category: "Infrastructure",
      status: "healthy",
      uptime: 99.99,
      responseTime: 28,
      lastChecked: new Date().toISOString(),
      description: "Main API gateway",
      incidents: 0,
    },
  ]);

  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState(
    "System maintenance in progress. Services will be restored shortly."
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filter, setFilter] = useState<"all" | "healthy" | "degraded" | "down">(
    "all"
  );

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(userData);
    // Only admins can access this page
    if (parsedUser.role !== "admin") {
      navigate("/dashboard");
      return;
    }
    setUser(parsedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const refreshStatus = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setServices(
        services.map((service) => ({
          ...service,
          lastChecked: new Date().toISOString(),
        }))
      );
      setIsRefreshing(false);
    }, 1000);
  };

  const toggleService = (id: string) => {
    setServices(
      services.map((service) =>
        service.id === id
          ? {
              ...service,
              status:
                service.status === "healthy"
                  ? "down"
                  : service.status === "down"
                    ? "degraded"
                    : "healthy",
            }
          : service
      )
    );
  };

  const healthyCount = services.filter((s) => s.status === "healthy").length;
  const degradedCount = services.filter((s) => s.status === "degraded").length;
  const downCount = services.filter((s) => s.status === "down").length;
  const overallUptime =
    (services.reduce((sum, s) => sum + s.uptime, 0) / services.length).toFixed(
      2
    );

  const categories = ["Identity", "Financial", "Infrastructure"];
  const filteredServices = services.filter((s) => {
    if (filter === "all") return true;
    return s.status === filter;
  });

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header
        isLoggedIn={true}
        userName={user.name}
        userRole={user.role}
        onLogout={handleLogout}
        variant="app"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="text-primary hover:text-primary/80 text-sm font-medium mb-8 transition flex items-center gap-2"
        >
          ← Back to Dashboard
        </button>

        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                System Health
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Real-time monitoring of all verification services
              </p>
            </div>
            <Button
              onClick={refreshStatus}
              disabled={isRefreshing}
              size="lg"
              variant="outline"
              className="gap-2"
            >
              {isRefreshing ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </>
              )}
            </Button>
          </div>

          {/* Maintenance Banner */}
          {maintenanceMode && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold text-amber-900">Maintenance Mode</p>
                <p className="text-amber-800 text-sm mt-1">{maintenanceMessage}</p>
              </div>
            </div>
          )}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          <div className="bg-white border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-secondary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Overall Status</p>
            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-2xl font-bold text-secondary">Operational</p>
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Healthy</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{healthyCount}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {((healthyCount / services.length) * 100).toFixed(0)}% of services
            </p>
          </div>

          <div className="bg-white border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Degraded</p>
            <p className="text-3xl font-bold text-amber-600 mt-2">{degradedCount}</p>
            <p className="text-xs text-muted-foreground mt-2">Requires attention</p>
          </div>

          <div className="bg-white border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Down</p>
            <p className="text-3xl font-bold text-red-600 mt-2">{downCount}</p>
            <p className="text-xs text-muted-foreground mt-2">Offline</p>
          </div>

          <div className="bg-white border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Uptime</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{overallUptime}%</p>
            <p className="text-xs text-muted-foreground mt-2">30-day average</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["all", "healthy", "degraded", "down"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === status
                  ? status === "healthy"
                    ? "bg-green-600 text-white shadow-lg"
                    : status === "degraded"
                      ? "bg-amber-600 text-white shadow-lg"
                      : status === "down"
                        ? "bg-red-600 text-white shadow-lg"
                        : "bg-primary text-white shadow-lg"
                  : "bg-white border border-border text-foreground hover:border-primary"
              }`}
            >
              {status === "all"
                ? `All Services (${services.length})`
                : status === "healthy"
                  ? `Healthy (${healthyCount})`
                  : status === "degraded"
                    ? `Degraded (${degradedCount})`
                    : `Down (${downCount})`}
            </button>
          ))}
        </div>

        {/* Services by Category */}
        {categories.map((category) => {
          const categoryServices = filteredServices.filter(
            (s) => s.category === category
          );
          if (categoryServices.length === 0) return null;

          return (
            <div key={category} className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <Server className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-heading font-bold text-foreground">
                  {category} Services
                </h2>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                  {categoryServices.length}
                </span>
              </div>

              <div className="grid gap-4">
                {categoryServices.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div
                      className={`h-1 ${
                        service.status === "healthy"
                          ? "bg-green-500"
                          : service.status === "degraded"
                            ? "bg-amber-500"
                            : "bg-red-500"
                      }`}
                    />

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {service.status === "healthy" ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : service.status === "degraded" ? (
                              <AlertCircle className="w-5 h-5 text-amber-600" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-red-600" />
                            )}
                            <h3 className="font-heading font-bold text-lg text-foreground">
                              {service.name}
                            </h3>
                          </div>

                          <p className="text-sm text-muted-foreground mb-4">
                            {service.description}
                          </p>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                                Status
                              </p>
                              <p
                                className={`font-bold text-sm ${
                                  service.status === "healthy"
                                    ? "text-green-600"
                                    : service.status === "degraded"
                                      ? "text-amber-600"
                                      : "text-red-600"
                                }`}
                              >
                                {service.status === "healthy"
                                  ? "✓ Healthy"
                                  : service.status === "degraded"
                                    ? "⚠ Degraded"
                                    : "✕ Down"}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                                Uptime
                              </p>
                              <p className="font-bold text-sm text-foreground">
                                {service.uptime}%
                              </p>
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                                Response Time
                              </p>
                              <p className="font-bold text-sm text-foreground">
                                {service.responseTime}ms
                              </p>
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                                Last Checked
                              </p>
                              <p className="font-bold text-sm text-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(service.lastChecked).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleService(service.id)}
                          className="px-3 py-1 text-xs rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition whitespace-nowrap"
                          title="Admin: Toggle status"
                        >
                          Toggle
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Maintenance Controls */}
        <div className="bg-white border border-border rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
            Maintenance Management
          </h3>

          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition">
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="w-5 h-5 rounded accent-primary"
              />
              <div>
                <span className="font-semibold text-foreground block">
                  Maintenance Mode
                </span>
                <span className="text-xs text-muted-foreground">
                  Displays a banner notification to all users
                </span>
              </div>
            </label>

            {maintenanceMode && (
              <div className="ml-8 space-y-3 pt-4 border-t border-border">
                <label className="block">
                  <span className="text-sm font-semibold text-foreground mb-2 block">
                    Maintenance Message
                  </span>
                  <textarea
                    value={maintenanceMessage}
                    onChange={(e) => setMaintenanceMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    rows={3}
                    placeholder="Enter maintenance message..."
                  />
                </label>

                <div className="flex gap-3">
                  <Button className="gap-2">
                    <Zap className="w-4 h-4" /> Notify All Users
                  </Button>
                  <Button variant="outline">Schedule Maintenance</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
