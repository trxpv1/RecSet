import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import EulaModal from "@/components/EulaModal";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { verifyPANComprehensive, verifyCorporateDIN, verifyDirectorPhone, verifyGSTINAdvanced, verifyBankByMobile, verifyRCFull, verifyRCToMobile, verifyChassisToRC, verifyMobileToRC, verifyFASTagToRC, verifyVoterID, verifyDrivingLicense, verifyMobileIntelligence, verifyMobileToAddress } from "@/lib/apiClient";
import { generatePDFReport } from "@/lib/pdfGenerator";
import {
  Search,
  X,
  CheckCircle,
  Download,
  Shield,
  Car,
  Coins,
  Sparkles,
  History,
  Briefcase,
  Scale,
  ChevronRight,
  AlertCircle,
  Menu,
  Clock,
  Building2,
} from "lucide-react";

/**
 * Recursively flatten nested objects for display in data grid
 * Handles arrays and nested objects from API responses
 */
const flattenDataForDisplay = (data: Record<string, any>, prefix = ''): Record<string, any> => {
  const flattened: Record<string, any> = {};

  Object.entries(data).forEach(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (value === null || value === undefined) {
      flattened[fullKey] = 'N/A';
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        flattened[fullKey] = 'N/A';
      } else if (value.every(item => typeof item === 'string' || typeof item === 'number')) {
        flattened[fullKey] = value.filter(v => v !== '').join(', ') || 'N/A';
      } else {
        flattened[fullKey] = JSON.stringify(value, null, 2);
      }
    } else if (typeof value === 'object' && value !== null) {
      const hasData = Object.values(value).some(v => v !== null && v !== undefined && v !== '');
      if (!hasData) {
        flattened[fullKey] = 'N/A';
      } else {
        Object.assign(flattened, flattenDataForDisplay(value, fullKey));
      }
    } else if (typeof value === 'boolean') {
      flattened[fullKey] = value;
    } else {
      flattened[fullKey] = value === '' ? 'N/A' : value;
    }
  });

  return flattened;
};

/**
 * Format key names for display
 * Converts snake_case and camelCase to Title Case
 */
const formatKeyName = (key: string): string => {
  return key
    .replace(/[._]/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .trim();
};

interface User {
  email: string;
  name: string;
  role?: "admin" | "user";
}

interface VerificationResult {
  id: string;
  type: string;
  query: string;
  status: "success" | "pending" | "failed";
  timestamp: string;
  creditsUsed: number;
  data?: Record<string, any>;
}

// VERIFICATION CATEGORIES
const VERIFICATION_CATEGORIES = {
  identity: {
    label: "Identity Records",
    icon: Shield,
    bgColor: "bg-primary",
    items: [
      { value: "aadhar-search", label: "Aadhar Search", credits: 2, comingSoon: true },
      { value: "pan-search", label: "PAN Search", credits: 1, comingSoon: true },
      { value: "pan-info", label: "PAN Details", credits: 2, comingSoon: false },
      { value: "voter-id", label: "Voter ID", credits: 2, comingSoon: false },
      { value: "driving-license", label: "Driving License", credits: 2, comingSoon: false },
      { value: "aadhar-to-pan", label: "Aadhar to PAN", credits: 2, comingSoon: true },
      { value: "pan-validation", label: "PAN Validation", credits: 1, comingSoon: true },
      { value: "phone-verification", label: "Phone Verification", credits: 1, comingSoon: true },
      { value: "mobile-to-pan", label: "Mobile to PAN", credits: 2, comingSoon: true },
    ],
  },
  vehicle: {
    label: "Vehicle & Challan Records",
    icon: Car,
    bgColor: "bg-secondary",
    items: [
      { value: "rc-full", label: "RC Full Details", credits: 2, comingSoon: false },
      { value: "rc-to-mobile", label: "RC to Mobile", credits: 2, comingSoon: false },
      { value: "chassis-to-rc", label: "Chassis to RC", credits: 2, comingSoon: false },
      { value: "mobile-to-rc", label: "Mobile to RC", credits: 3, comingSoon: false },
      { value: "fastag-to-rc", label: "FASTag to RC", credits: 2, comingSoon: false },
      { value: "rc-details", label: "RC Details", credits: 2, comingSoon: true },
      { value: "rc-to-fastag", label: "RC to FASTag", credits: 2, comingSoon: true },
    ],
  },
  financial: {
    label: "Financial Records",
    icon: Coins,
    bgColor: "bg-accent",
    items: [
      { value: "bank-verification-mobile", label: "Bank Verification Mobile", credits: 3, comingSoon: false },
      { value: "phone-to-bank", label: "Phone to Bank", credits: 3, comingSoon: true },
      { value: "bank-validation", label: "Bank Validation", credits: 2, comingSoon: true },
      { value: "bank-ifsc", label: "Bank IFSC", credits: 1, comingSoon: true },
      { value: "mobile-to-upi", label: "Mobile to UPI", credits: 2, comingSoon: true },
      { value: "upi-details", label: "UPI Details", credits: 2, comingSoon: true },
      { value: "gst-search", label: "GST Search", credits: 2, comingSoon: true },
      { value: "gst-details", label: "GST Details", credits: 3, comingSoon: true },
      { value: "pan-to-all-gst", label: "PAN to All GST", credits: 3, comingSoon: true },
    ],
  },
  special: {
    label: "Special Features",
    icon: Sparkles,
    bgColor: "bg-primary/80",
    items: [
      { value: "aadhar-family-tree", label: "Aadhar Family Tree", credits: 3, comingSoon: true },
      { value: "mobile-to-multiple-addresses", label: "Mobile to Addresses", credits: 4, comingSoon: true },
      { value: "multi-search", label: "Multi-Record Search", credits: 5, comingSoon: true },
      { value: "property-search", label: "Property Search", credits: 3, comingSoon: true },
      { value: "company-search", label: "Company Search", credits: 2, comingSoon: true },
    ],
  },
  employment: {
    label: "Employment Records",
    icon: Briefcase,
    bgColor: "bg-secondary/80",
    items: [
      { value: "pan-to-uan", label: "PAN to UAN", credits: 2, comingSoon: true },
      { value: "pan-employment", label: "PAN Employment", credits: 2, comingSoon: true },
      { value: "mobile-to-uan", label: "Mobile to UAN", credits: 2, comingSoon: true },
      { value: "gas-connection", label: "Gas Connection", credits: 2, comingSoon: true },
    ],
  },
  special: {
    label: "Special Searches",
    icon: Sparkles,
    bgColor: "bg-emerald-600",
    items: [
      { value: "mobile-intelligence", label: "Mobile Intelligence", credits: 5, comingSoon: false },
      { value: "mobile-to-address", label: "Mobile to Address", credits: 3, comingSoon: false },
    ],
  },
  corporate: {
    label: "Corporate Records",
    icon: Building2,
    bgColor: "bg-purple-600",
    items: [
      { value: "din-lookup", label: "DIN Lookup", credits: 2, comingSoon: false },
      { value: "director-phone", label: "Director Phone", credits: 2, comingSoon: false },
      { value: "gstin-advanced", label: "GSTIN Advanced", credits: 3, comingSoon: false },
    ],
  },
  court: {
    label: "Court Records",
    icon: Scale,
    bgColor: "bg-destructive",
    items: [
      { value: "court-records", label: "Court Records", credits: 4, comingSoon: true },
      { value: "case-details", label: "Case Details", credits: 3, comingSoon: true },
    ],
  },
  logs: {
    label: "Logs",
    icon: History,
    bgColor: "bg-muted-foreground",
    items: [
      { value: "view-history", label: "Verification History", credits: 0 },
    ],
  },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState(250);
  const [activeCategory, setActiveCategory] = useState<string>("identity");
  const [selectedVerification, setSelectedVerification] = useState<any>(null);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<VerificationResult[]>([]);
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [currentResult, setCurrentResult] = useState<VerificationResult | null>(null);
  const [showEulaModal, setShowEulaModal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user: authUser, logout: authLogout, isAuthenticated, isDemoUser } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Map auth user to local user state
    if (authUser) {
      setUser({
        email: authUser.email,
        name: `${authUser.first_name} ${authUser.last_name}`,
        role: authUser.role as "admin" | "user" | undefined,
      });
      setCredits(authUser.credits);
    }

    const eulaAccepted = localStorage.getItem("eulaAccepted");
    if (!eulaAccepted) {
      setShowEulaModal(true);
    }

    // Load mock history
    setResults([
      {
        id: "1",
        type: "Aadhar to PAN",
        query: "1234-5678-9012",
        status: "success",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        creditsUsed: 2,
        data: {
          aadharNumber: "1234-5678-9012",
          panNumber: "ABCDE1234F",
          name: "John Doe",
          verified: true,
          linkingDate: "10-12-2024",
        },
      },
    ]);
  }, [navigate]);

  const handleLogout = async () => {
    await authLogout();
    navigate("/");
  };

  const handleEulaAccept = () => {
    localStorage.setItem("eulaAccepted", "true");
    setShowEulaModal(false);
  };

  const handleEulaDecline = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const getSampleData = (type: string, query: string) => {
    const dataMap: Record<string, Record<string, any>> = {
      "aadhar-search": {
        aadharNumber: query,
        name: "John Doe",
        dob: "15-01-1990",
        gender: "Male",
        address: "123 Main Street, New Delhi",
        mobileVerified: true,
      },
      "pan-search": {
        panNumber: query,
        name: "John Doe",
        fatherName: "Mr. James Doe",
        dob: "15-01-1990",
        panStatus: "Active",
      },
      "aadhar-to-pan": {
        aadharNumber: query,
        panNumber: "ABCDE1234F",
        name: "John Doe",
        verified: true,
        linkingDate: "10-12-2024",
      },
      "phone-to-bank": {
        mobileNumber: query,
        bankName: "HDFC Bank",
        accountHolderName: "John Doe",
        accountNumber: "****5678",
        accountType: "Savings",
        verified: true,
      },
      "rc-details": {
        registrationNumber: query,
        ownerName: "John Doe",
        vehicleClass: "Light Motor Vehicle",
        maker: "Maruti Suzuki",
        model: "Swift",
        registrationDate: "15-05-2020",
      },
      "gst-search": {
        gstNumber: query,
        businessName: "ABC Enterprises",
        registrationType: "Regular",
        registrationDate: "01-06-2020",
        status: "Active",
      },
    };

    return dataMap[type] || {
      query: query,
      name: "John Doe",
      verified: true,
      status: "Active",
    };
  };

  const handleScanNow = (verification: any) => {
    // Check if feature is coming soon
    if (verification.comingSoon) {
      alert("🚧 Coming Soon!\n\nThis feature is currently under development and will be available soon.");
      return;
    }
    
    if (credits < verification.credits) {
      alert("Insufficient credits. Please recharge your wallet.");
      return;
    }
    setSelectedVerification(verification);
    setShowQueryModal(true);
    setQuery("");
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query || !selectedVerification) return;

    setIsSearching(true);

    try {
      console.log('🚀 Starting verification:', {
        type: selectedVerification.value,
        label: selectedVerification.label,
        query: query.substring(0, 4) + '****',
        timestamp: new Date().toISOString(),
      });

      let response;

      // Route to appropriate API based on verification type
      if (selectedVerification.value === 'pan-info') {
        // ✅ REAL API CALL for PAN Details
        response = await verifyPANComprehensive(query);
      } else if (selectedVerification.value === 'voter-id') {
        // ✅ REAL API CALL for Voter ID
        response = await verifyVoterID(query);
      } else if (selectedVerification.value === 'driving-license') {
        // ✅ REAL API CALL for Driving License
        response = await verifyDrivingLicense(query);
      } else if (selectedVerification.value === 'din-lookup') {
        // ✅ REAL API CALL for DIN Lookup
        response = await verifyCorporateDIN(query);
      } else if (selectedVerification.value === 'director-phone') {
        // ✅ REAL API CALL for Director Phone
        response = await verifyDirectorPhone(query);
      } else if (selectedVerification.value === 'gstin-advanced') {
        // ✅ REAL API CALL for GSTIN Advanced
        response = await verifyGSTINAdvanced(query);
      } else if (selectedVerification.value === 'bank-verification-mobile') {
        // ✅ REAL API CALL for Bank Verification Mobile
        response = await verifyBankByMobile(query);
      } else if (selectedVerification.value === 'rc-full') {
        // ✅ REAL API CALL for RC Full Details
        response = await verifyRCFull(query);
      } else if (selectedVerification.value === 'rc-to-mobile') {
        // ✅ REAL API CALL for RC to Mobile
        response = await verifyRCToMobile(query);
      } else if (selectedVerification.value === 'chassis-to-rc') {
        // ✅ REAL API CALL for Chassis to RC
        response = await verifyChassisToRC(query);
      } else if (selectedVerification.value === 'mobile-to-rc') {
        // ✅ REAL API CALL for Mobile to RC
        response = await verifyMobileToRC(query);
      } else if (selectedVerification.value === 'fastag-to-rc') {
        // ✅ REAL API CALL for FASTag to RC
        response = await verifyFASTagToRC(query);
      } else if (selectedVerification.value === 'mobile-intelligence') {
        // ✅ REAL API CALL for Mobile Intelligence
        response = await verifyMobileIntelligence(query);
      } else if (selectedVerification.value === 'mobile-to-address') {
        // ✅ REAL API CALL for Mobile to Address
        response = await verifyMobileToAddress(query);
      } else {
        // Fallback for other types (temporary)
        throw new Error('This verification type is not yet implemented');
      }

      console.log('✅ Verification response received:', {
        success: response.success,
        hasData: !!response.data,
        creditsDeducted: response.credit_details?.user_price_deducted,
      });

      if (!response.success) {
        throw new Error(response.message || 'Verification failed');
      }

      const newResult: VerificationResult = {
        id: response.data.client_id || Date.now().toString(),
        type: selectedVerification.label,
        query,
        status: "success",
        timestamp: new Date().toISOString(),
        creditsUsed: response.credit_details?.user_price_deducted || selectedVerification.credits,
        data: response.data,
      };

      const updatedResults = [newResult, ...results];
      setResults(updatedResults);
      
      // Save to localStorage
      localStorage.setItem('verificationHistory', JSON.stringify(updatedResults.slice(0, 50)));
      
      // Update credits from API response
      const newCredits = response.credit_details?.user_remaining_credits ?? credits - newResult.creditsUsed;
      setCredits(newCredits);
      
      setCurrentResult(newResult);
      setIsSearching(false);
      setShowQueryModal(false);
      setShowResultModal(true);

      console.log('✅ Verification completed successfully');

    } catch (error: any) {
      console.error('❌ Verification failed:', {
        error: error.message,
        type: selectedVerification.value,
        timestamp: new Date().toISOString(),
      });
      
      let errorMessage = 'Verification failed. Please try again.';
      
      if (error.message.includes('not yet implemented')) {
        errorMessage = '🚧 This verification type is not yet available.\nPlease try another verification.';
      } else if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        errorMessage = 'Session expired. Please login again.';
        setTimeout(() => navigate('/login'), 2000);
      } else if (error.message.includes('Network')) {
        errorMessage = 'Network error. Please check your connection.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(`❌ Verification Error:\n\n${errorMessage}`);
      
      setIsSearching(false);
      setShowQueryModal(false);
    }
  };

  const handleExportPDF = () => {
    if (!currentResult || !currentResult.data) {
      alert("❌ No data available to export");
      return;
    }

    try {
      generatePDFReport({
        type: currentResult.type,
        query: currentResult.query,
        timestamp: currentResult.timestamp,
        creditsUsed: currentResult.creditsUsed,
        data: currentResult.data,
        userInfo: authUser ? {
          name: `${authUser.first_name} ${authUser.last_name}`,
          email: authUser.email,
          phone: authUser.phone,
        } : undefined,
      });
      
      // Optional: Show success message
      // You could use a toast notification here instead of alert
      alert("✅ PDF exported successfully!");
    } catch (error) {
      console.error("PDF export error:", error);
      alert("❌ Failed to export PDF. Please try again.");
    }
  };

  if (!user) {
    return null;
  }

  const categories = Object.keys(VERIFICATION_CATEGORIES);
  const currentCategoryData = VERIFICATION_CATEGORIES[activeCategory as keyof typeof VERIFICATION_CATEGORIES];

  // Get all items across categories for search
  const getAllItems = () => {
    const allItems: Array<{ item: any; category: string; categoryData: any }> = [];
    Object.entries(VERIFICATION_CATEGORIES).forEach(([categoryKey, categoryData]) => {
      categoryData.items.forEach((item) => {
        allItems.push({
          item,
          category: categoryKey,
          categoryData,
        });
      });
    });
    return allItems;
  };

  const getFilteredItems = () => {
    if (!searchQuery) {
      return currentCategoryData.items.map(item => ({
        item,
        category: activeCategory,
        categoryData: currentCategoryData,
      }));
    }
    
    return getAllItems().filter(({ item }) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.value.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isLoggedIn={true}
        userName={user.name}
        userRole={user.role}
        onLogout={handleLogout}
        variant="app"
        credits={credits}
      />

      <EulaModal
        isOpen={showEulaModal}
        onAccept={handleEulaAccept}
        onDecline={handleEulaDecline}
      />

      <div className="flex h-[calc(100vh-64px)]">
        {/* LEFT SIDEBAR */}
        <aside 
          className={`flex-shrink-0 overflow-y-auto border-r shadow-lg transition-all duration-300 ${
            sidebarCollapsed ? 'w-16' : 'w-64'
          }`}
          style={{ backgroundColor: '#0f172a', borderColor: '#334155' }}
        >
          <div className="p-4">
            {/* Collapse Toggle */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center mb-4 p-2 rounded-lg transition-colors"
              style={{ backgroundColor: '#1e293b' }}
            >
              <Menu className="w-5 h-5" style={{ color: '#94a3b8' }} />
            </button>
            
            {!sidebarCollapsed && (
              <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#94a3b8' }}>
                Categories
              </h2>
            )}
            <nav className="space-y-1">
              {categories.map((category) => {
                const categoryData = VERIFICATION_CATEGORIES[category as keyof typeof VERIFICATION_CATEGORIES];
                const Icon = categoryData.icon;
                
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      sidebarCollapsed ? 'justify-center' : ''
                    }`}
                    style={{
                      backgroundColor: activeCategory === category ? '#1e293b' : 'transparent',
                      color: activeCategory === category ? '#ffffff' : '#94a3b8'
                    }}
                    onMouseEnter={(e) => {
                      if (activeCategory !== category) {
                        e.currentTarget.style.backgroundColor = '#1e293b80';
                        e.currentTarget.style.color = '#ffffff';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeCategory !== category) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#94a3b8';
                      }
                    }}
                    title={sidebarCollapsed ? categoryData.label : ''}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <>
                        <span className="text-sm font-medium flex-1 text-left">
                          {categoryData.label}
                        </span>
                        {activeCategory === category && (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          {/* Demo Mode Banner */}
          {/* {isDemoUser && (
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900 px-6 py-3 text-center font-medium shadow-md">
              <span className="inline-flex items-center gap-2">
                🎭 <span className="font-bold">Demo Mode Active</span> - You're using a demo account. Data is simulated for testing purposes.
              </span>
            </div>
          )} */}
          
          <div className="max-w-7xl mx-auto p-8">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search verification types..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-base rounded-xl border-2 focus:border-primary"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            <div className="mb-8">
              <h1 className="text-3xl font-heading font-bold text-foreground">
                {searchQuery ? `Search Results for "${searchQuery}"` : currentCategoryData.label}
              </h1>
              <p className="text-muted-foreground mt-2">
                {searchQuery 
                  ? `Found ${getFilteredItems().length} verification type${getFilteredItems().length !== 1 ? 's' : ''}`
                  : 'Select a verification type to get started'
                }
              </p>
            </div>

            {/* CARDS GRID */}
            {activeCategory === "logs" ? (
              // HISTORY VIEW
              <div className="space-y-4">
                {results.length > 0 ? (
                  results.map((result) => (
                    <div
                      key={result.id}
                      className="bg-white border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => {
                        setCurrentResult(result);
                        setShowResultModal(true);
                      }}
                    >
                      <div className="bg-slate-50 p-4 border-b border-border">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-heading font-bold text-foreground">{result.type}</h4>
                              {result.status === 'success' && (
                                <CheckCircle className="w-4 h-4 text-secondary" />
                              )}
                              {result.status === 'failed' && (
                                <AlertCircle className="w-4 h-4 text-destructive" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Query: <code className="bg-white px-2 py-0.5 rounded text-xs font-mono">{result.query}</code>
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {new Date(result.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-muted-foreground">
                              -{result.creditsUsed} credits
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <History className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">No verification history yet</p>
                    <p className="text-sm text-muted-foreground/70 mt-1">
                      Your completed verifications will appear here
                    </p>
                  </div>
                )}
              </div>
            ) : (
              // VERIFICATION CARDS
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {getFilteredItems().map(({ item, category, categoryData }) => {
                  const Icon = categoryData.icon;
                  
                  return (
                    <div
                      key={`${category}-${item.value}`}
                      className={`${categoryData.bgColor} rounded-xl p-6 relative overflow-hidden group hover:shadow-2xl transition-all hover:scale-105 min-h-[200px] ${item.comingSoon ? 'opacity-75' : ''}`}
                    >
                      {/* Decorative Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12" />
                      </div>

                      {/* Coming Soon Badge */}
                      {item.comingSoon && (
                        <div className="absolute top-4 left-4 bg-amber-500/90 backdrop-blur-sm px-2 py-1 rounded-md z-10 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-white" />
                          <p className="text-xs font-bold text-white uppercase">
                            Coming Soon
                          </p>
                        </div>
                      )}

                      {/* Category Badge - shown when searching */}
                      {searchQuery && !item.comingSoon && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md z-10">
                          <p className="text-xs font-semibold text-foreground">
                            {categoryData.label}
                          </p>
                        </div>
                      )}

                      {/* Icon Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      <div className={`relative z-10 ${searchQuery || item.comingSoon ? 'pt-6' : ''}`}>
                        <h3 className="text-white font-heading font-bold text-lg mb-2">
                          {item.label}
                        </h3>
                        <p className="text-white/90 text-sm mb-8 line-clamp-2">
                          {item.value.split("-").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                            <Coins className="w-5 h-5 text-white" />
                            <span className="text-white font-semibold text-sm">
                              {item.credits}
                            </span>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleScanNow(item)}
                            className={`font-medium shadow-lg ${
                              item.comingSoon 
                                ? 'bg-white/50 text-white hover:bg-white/60 cursor-not-allowed'
                                : 'bg-white text-foreground hover:bg-white/90'
                            }`}
                          >
                            {item.comingSoon ? 'Soon' : 'Scan Now'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* QUERY MODAL */}
      {showQueryModal && selectedVerification && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl animate-in zoom-in duration-200">
            <button
              onClick={() => setShowQueryModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                {selectedVerification.label}
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Enter the required details to proceed with verification
              </p>
            </div>

            <form onSubmit={handleVerification} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="query" className="text-sm font-medium">
                  Verification Details
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="query"
                    type="text"
                    placeholder="Enter verification details"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={isSearching}
                    className="pl-10"
                    autoFocus
                  />
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                  <p className="text-xs text-blue-900 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    This verification will cost <strong>{selectedVerification.credits} credits</strong>
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSearching || !query}
                className="w-full gap-2"
                size="lg"
              >
                {isSearching ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" /> Verify Now
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* RESULT MODAL */}
      {showResultModal && currentResult && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 relative shadow-2xl animate-in zoom-in duration-200">
            <button
              onClick={() => setShowResultModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6 pb-6 border-b border-border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-secondary" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-foreground">
                      {currentResult.type}
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Query: <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">{currentResult.query}</code>
                  </p>  
                </div>
                <div className="text-right pr-8">
                  <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-semibold">
                    <Coins className="w-5 h-5" />
                    -{currentResult.creditsUsed} credits
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Verified on {new Date(currentResult.timestamp).toLocaleString()}
              </p>
            </div>

            {/* Data Grid */}
            {currentResult.data && (
              <div className="mb-6">
                <h3 className="text-sm font-heading font-bold text-foreground uppercase tracking-wider mb-4">
                  Verification Results
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(flattenDataForDisplay(currentResult.data))
                    .filter(([key]) => {
                      const skipKeys = ['client_id', 'status', 'message_code', 'status_code', 'success', 'message'];
                      return !skipKeys.some(skipKey => key.toLowerCase().includes(skipKey.toLowerCase()));
                    })
                    .map(([key, value]) => (
                      <div key={key} className="bg-slate-50 border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                          {formatKeyName(key)}
                        </p>
                        <p className="text-sm text-foreground font-medium break-words whitespace-pre-wrap">
                          {typeof value === "boolean" ? (
                            value ? (
                              <span className="inline-flex items-center gap-1 text-secondary">
                                <CheckCircle className="w-4 h-4" />
                                Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-destructive">
                                <X className="w-4 h-4" />
                                Not Verified
                              </span>
                            )
                          ) : value === 'N/A' ? (
                            <span className="text-muted-foreground italic">N/A</span>
                          ) : (
                            String(value)
                          )}
                        </p>
                      </div>
                    ))}
                </div>

                {/* Special handling for full address if available */}
                {currentResult.data?.address?.full && currentResult.data.address.full !== '' && (
                  <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-xs font-semibold text-blue-900 uppercase tracking-wide mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Complete Address
                    </p>
                    <p className="text-sm text-blue-900 font-medium">
                      {currentResult.data.address.full}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 justify-center">
              <Button
                onClick={handleExportPDF}
                className="gap-2 bg-[#0D55D8] text-white hover:bg-[#0D55D8]/90 hover:shadow-lg border-0 rounded-lg px-6"
                variant="default"
                size="lg"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}