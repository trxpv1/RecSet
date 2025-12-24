import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Users,
  Plus,
  LogOut,
  Trash2,
  CheckCircle,
  AlertCircle,
  Search,
  Settings,
  Key,
  Activity,
} from "lucide-react";

interface User {
  email: string;
  name: string;
  role?: "admin" | "user";
}

interface Officer {
  id: string;
  name: string;
  email: string;
  badgeId: string;
  credits: number;
  status: "active" | "inactive" | "pending";
  joinedDate: string;
}

export default function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [officers, setOfficers] = useState<Officer[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@lea.gov.in",
      badgeId: "LEA-2024-001",
      credits: 250,
      status: "active",
      joinedDate: new Date(Date.now() - 2592000000).toISOString(),
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@lea.gov.in",
      badgeId: "LEA-2024-002",
      credits: 150,
      status: "active",
      joinedDate: new Date(Date.now() - 1296000000).toISOString(),
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob.johnson@lea.gov.in",
      badgeId: "LEA-2024-003",
      credits: 0,
      status: "pending",
      joinedDate: new Date(Date.now() - 86400000).toISOString(),
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"users" | "settings">("users");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    badgeId: "",
  });

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

  const handleAddOfficer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.badgeId) return;

    const newOfficer: Officer = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      badgeId: formData.badgeId,
      credits: 100,
      status: "pending",
      joinedDate: new Date().toISOString(),
    };

    setOfficers([...officers, newOfficer]);
    setFormData({ name: "", email: "", badgeId: "" });
    setShowForm(false);
  };

  const handleDeleteOfficer = (id: string) => {
    setOfficers(officers.filter((o) => o.id !== id));
  };

  const handleApproveOfficer = (id: string) => {
    setOfficers(
      officers.map((o) => (o.id === id ? { ...o, status: "active" } : o))
    );
  };

  const filteredOfficers = officers.filter(
    (officer) =>
      officer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      officer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
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
          className="text-primary hover:text-primary/80 text-sm font-medium mb-6 transition"
        >
          ← Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
            Admin Panel
          </h1>
          <p className="text-muted-foreground">
            Manage officers, credits, and system settings
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
            <p className="text-muted-foreground text-sm mb-2">Total Officers</p>
            <p className="text-3xl font-bold">{officers.length}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {officers.filter((o) => o.status === "active").length} active
            </p>
          </div>

          <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
            <p className="text-muted-foreground text-sm mb-2">Pending Approvals</p>
            <p className="text-3xl font-bold">
              {officers.filter((o) => o.status === "pending").length}
            </p>
          </div>

          <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
            <p className="text-muted-foreground text-sm mb-2">Total Credits Issued</p>
            <p className="text-3xl font-bold">
              {officers.reduce((sum, o) => sum + o.credits, 0)}
            </p>
          </div>

          <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
            <p className="text-muted-foreground text-sm mb-2">System Status</p>
            <p className="text-3xl font-bold text-secondary">Operational</p>
            <p className="text-xs text-secondary mt-2">All systems running</p>
          </div>

          <Link to="/health" className="bg-white border border-border rounded-xl p-6 shadow-sm hover:border-primary transition">
            <p className="text-muted-foreground text-sm mb-2">Health Monitoring</p>
            <p className="text-3xl font-bold text-primary">8/8</p>
            <p className="text-xs text-primary mt-2">Healthy services</p>
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-white border border-border rounded-2xl shadow-sm">
          {/* Tabs */}
          <div className="border-b border-border flex">
            <button
              onClick={() => setActiveTab("users")}
              className={`flex-1 py-4 px-6 border-b-2 font-medium transition-colors ${
                activeTab === "users"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              <Users className="w-4 h-4 inline-block mr-2" />
              Officers Management
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex-1 py-4 px-6 border-b-2 font-medium transition-colors ${
                activeTab === "settings"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              <Settings className="w-4 h-4 inline-block mr-2" />
              Settings
            </button>
          </div>

          {/* Quick Link to Health Monitoring */}
          {activeTab === "users" && (
            <div className="p-8 mb-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-4">
              <Activity className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-blue-900">Monitor System Health</p>
                <p className="text-sm text-blue-800 mt-1">
                  View real-time service status and manage maintenance modes
                </p>
              </div>
              <Link to="/health">
                <Button size="sm">View Health Monitoring</Button>
              </Link>
            </div>
          )}

          {activeTab === "users" ? (
            <div className="p-8">
              {/* Search and Add Button */}
              <div className="flex gap-4 mb-6 flex-col sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search officers by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  onClick={() => setShowForm(!showForm)}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Officer
                </Button>
              </div>

              {/* Add Officer Form */}
              {showForm && (
                <form onSubmit={handleAddOfficer} className="mb-8 p-6 bg-slate-50 rounded-xl space-y-4 border border-border">
                  <h3 className="font-heading font-bold text-foreground mb-4">
                    Add New Officer
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Name</Label>
                      <Input
                        placeholder="Full name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Email</Label>
                      <Input
                        type="email"
                        placeholder="officer@lea.gov.in"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Badge ID</Label>
                      <Input
                        placeholder="LEA-2024-xxxxx"
                        value={formData.badgeId}
                        onChange={(e) =>
                          setFormData({ ...formData, badgeId: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit" size="sm">
                      Add Officer
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}

              {/* Officers Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-heading font-bold">
                        Name
                      </th>
                      <th className="text-left py-4 px-4 font-heading font-bold">
                        Email
                      </th>
                      <th className="text-left py-4 px-4 font-heading font-bold">
                        Badge ID
                      </th>
                      <th className="text-left py-4 px-4 font-heading font-bold">
                        Credits
                      </th>
                      <th className="text-left py-4 px-4 font-heading font-bold">
                        Status
                      </th>
                      <th className="text-left py-4 px-4 font-heading font-bold">
                        Joined
                      </th>
                      <th className="text-right py-4 px-4 font-heading font-bold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOfficers.map((officer) => (
                      <tr key={officer.id} className="border-b border-border hover:bg-slate-50">
                        <td className="py-4 px-4 font-medium">{officer.name}</td>
                        <td className="py-4 px-4 text-muted-foreground">
                          {officer.email}
                        </td>
                        <td className="py-4 px-4 text-muted-foreground font-mono text-xs">
                          {officer.badgeId}
                        </td>
                        <td className="py-4 px-4">
                          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                            {officer.credits}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${
                              officer.status === "active"
                                ? "bg-secondary/10 text-secondary"
                                : officer.status === "pending"
                                  ? "bg-amber-50 text-amber-700"
                                  : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {officer.status === "active" && (
                              <CheckCircle className="w-3 h-3" />
                            )}
                            {officer.status === "pending" && (
                              <AlertCircle className="w-3 h-3" />
                            )}
                            {officer.status.charAt(0).toUpperCase() +
                              officer.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground text-xs">
                          {new Date(officer.joinedDate).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4 text-right space-x-2">
                          {officer.status === "pending" && (
                            <button
                              onClick={() => handleApproveOfficer(officer.id)}
                              className="text-secondary hover:text-secondary/80 text-xs font-medium transition"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteOfficer(officer.id)}
                            className="text-destructive hover:text-destructive/80 transition inline-block"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredOfficers.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">No officers found</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-heading font-bold text-foreground">
                  System Settings
                </h3>

                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">
                          API Status
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Government verification APIs
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-secondary">
                          Connected
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">
                          Data Encryption
                        </p>
                        <p className="text-sm text-muted-foreground">
                          AES-256 encryption enabled
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-secondary rounded-full" />
                        <span className="text-sm font-medium text-secondary">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">
                          Audit Logging
                        </p>
                        <p className="text-sm text-muted-foreground">
                          All verifications are logged
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-secondary rounded-full" />
                        <span className="text-sm font-medium text-secondary">
                          Enabled
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6 space-y-4">
                <h3 className="text-xl font-heading font-bold text-foreground">
                  API Keys
                </h3>
                <p className="text-sm text-muted-foreground">
                  Manage your API keys for integrations
                </p>
                <Button variant="outline" className="gap-2">
                  <Key className="w-4 h-4" /> Generate New API Key
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
