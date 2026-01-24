import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import EulaModal from "@/components/EulaModal";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription, 
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { verifyPANComprehensive, verifyCorporateDIN, verifyDirectorPhone, verifyGSTINAdvanced, verifyBankByMobile, verifyRCFull, verifyRCToMobile, verifyChassisToRC, verifyMobileToRC, verifyFASTagToRC, verifyVoterID, verifyDrivingLicense, verifyMobileIntelligence, verifyMobileToAddress, verifyAadhaarFamilyMembers, verifyFamPayUPIToMobile, verifyGSTINByCompanyName, verifyGSTINByPAN, verifyRCToFASTag, verifyMobileToMultipleUPI, verifyChassisToRCDetails, verifyVoterIDText, verifyCINToPAN, verifyMobileToUAN, verifyUANToEmploymentHistory, verifyPANToUAN, verifyRCOwnerHistory, verifyMobileToGAS, getUserLogs, getHealthStatus, type UserLog, type LogsResponse, type HealthCheckResponse } from "@/lib/apiClient";
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
        // Simple array of strings/numbers - join them
        flattened[fullKey] = value.filter(v => v !== '').join(', ') || 'N/A';
      } else if (value.every(item => typeof item === 'object' && item !== null)) {
        // Array of objects - flatten each object with index
        value.forEach((item, index) => {
          const itemPrefix = `${fullKey} [${index + 1}]`;
          Object.assign(flattened, flattenDataForDisplay(item, itemPrefix));
        });
      } else {
        // Mixed array or other complex structure - show as JSON
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
      // { value: "aadhar-search", label: "Aadhar Search", credits: 2, comingSoon: true },
      { value: "aadhar-family-tree", label: "Aadhar Family Tree", credits: 50, comingSoon: false, description: "Map related individuals linked through Aadhaar references." },
      { value: "pan-info", label: "PAN Details", credits: 7, comingSoon: false, description: "Retrieve basic PAN profile and identity metadata." },
      { value: "voter-id-text", label: "Voter ID Text", credits: 10, comingSoon: false, description: "Access voter registration and electoral roll information." },
      // { value: "voter-id", label: "Voter ID", credits: 2, comingSoon: true },
      // { value: "aadhar-to-pan", label: "Aadhar to PAN", credits: 2, comingSoon: true },
      // { value: "pan-validation", label: "PAN Validation", credits: 1, comingSoon: true },
      // { value: "phone-verification", label: "Phone Verification", credits: 1, comingSoon: true },
      // { value: "mobile-to-pan", label: "Mobile to PAN", credits: 2, comingSoon: true },
    ],
  },
  vehicle: {
    label: "Vehicle Records",
    icon: Car,
    bgColor: "bg-secondary",
    items: [
      { value: "rc-full", label: "RC Full Details", credits: 18, comingSoon: false, description: "Access vehicle registration and ownership information." },
      { value: "chassis-to-rc", label: "Chassis to RC", credits: 11, comingSoon: false, description: "Retrieve vehicle details using chassis number." },
      { value: "rc-owner-history", label: "RC Owner History", credits: 8, comingSoon: false, description: "Track historical ownership records of a vehicle." },
      { value: "rc-to-mobile", label: "RC to Mobile", credits: 15, comingSoon: false, description: "Trace contact numbers associated with a vehicle." },
      { value: "mobile-to-rc", label: "Mobile to RC", credits: 31, comingSoon: false, description: "Identify vehicles linked to a mobile number." },
      { value: "fastag-to-rc", label: "FASTag to RC", credits: 10, comingSoon: false, description: "Retrieve vehicle details using FASTag identifiers." },
      { value: "rc-to-fastag", label: "RC to FASTag", credits: 15, comingSoon: false, description: "Map FASTag records linked to a vehicle." },
      { value: "driving-license", label: "Driving License", credits: 15, comingSoon: false, description: "Verify license details and driving history." },
    ],
  },
  financial: {
    label: "Financial Records",
    icon: Coins,
    bgColor: "bg-accent",
    items: [
      { value: "bank-verification-mobile", label: "Bank Verification Mobile", credits: 11, comingSoon: false, description: "Verify bank account linkage with mobile number." },
      { value: "mobile-to-multiple-upi", label: "Mobile to Multiple UPI", credits: 10, comingSoon: false, description: "Discover UPI IDs linked to a mobile number." },
      { value: "fampay-upi-to-mobile", label: "FamPay UPI to Mobile", credits: 9, comingSoon: false, description: "Trace mobile numbers linked to FamPay UPI handles." },
      { value: "gstin-by-company-name", label: "Company Name to GSTIN ⚠️ Restricted", credits: 15, comingSoon: false, description: "Search GST registrations by company name." },
      { value: "gstin-by-pan", label: "PAN to All GST", credits: 5, comingSoon: false, description: "List GST registrations associated with a PAN." },
      // { value: "phone-to-bank", label: "Phone to Bank", credits: 3, comingSoon: true },
      // { value: "bank-validation", label: "Bank Validation", credits: 2, comingSoon: true },
      // { value: "bank-ifsc", label: "Bank IFSC", credits: 1, comingSoon: true },
      // { value: "mobile-to-upi", label: "Mobile to UPI", credits: 2, comingSoon: true },
      // { value: "upi-details", label: "UPI Details", credits: 2, comingSoon: true },
      // { value: "gst-search", label: "GST Search", credits: 2, comingSoon: true },
      // { value: "gst-details", label: "GST Details", credits: 3, comingSoon: true },
    ],
  },
  employment: {
    label: "Employment Records",
    icon: Briefcase,
    bgColor: "bg-secondary/80",
    items: [
      { value: "pan-to-uan", label: "PAN to UAN", credits: 8, comingSoon: false, description: "Identify UAN linked to a PAN record." },
      { value: "mobile-to-uan", label: "Mobile to UAN", credits: 8, comingSoon: false, description: "Trace employment identifiers using mobile numbers." },
      { value: "uan-employment-history", label: "UAN Employment History V2", credits: 25, comingSoon: false, description: "Retrieve professional and employment history records." },
      // { value: "pan-employment", label: "PAN Employment", credits: 2, comingSoon: true },
    ],
  },
  special: {
    label: "Special Searches",
    icon: Sparkles,
    bgColor: "bg-emerald-600",
    items: [
      { value: "mobile-intelligence", label: "Mobile Intelligence", credits: 30, comingSoon: false, description: "Generate a consolidated intelligence profile for a mobile number." },
      { value: "mobile-to-gas", label: "Mobile to GAS Connection", credits: 8, comingSoon: false, description: "Verify gas connection details linked to a mobile number." },
      // { value: "mobile-to-address", label: "🔒 Mobile to Address", credits: 35, comingSoon: true },
      // NOTE: Mobile to Address is disabled due to backend API issue: 'User' object has no attribute 'company'
      // Backend team needs to add 'company' field to User model or fix the endpoint logic
    ],
  },
  corporate: {
    label: "Corporate Records",
    icon: Building2,
    bgColor: "bg-purple-600",
    items: [
      { value: "din-lookup", label: "DIN Lookup", credits: 20, comingSoon: false, description: "Access director identity and appointment details." },
      { value: "director-phone", label: "Director Phone", credits: 25, comingSoon: false, description: "Retrieve contact details of company directors." },
      { value: "gstin-advanced", label: "GSTIN Advanced", credits: 25, comingSoon: false, description: "Access comprehensive GST registration and filing data." },
      { value: "cin-to-pan", label: "CIN to PAN", credits: 35, comingSoon: false, description: "Map corporate identity number to PAN records." },
    ],
  },
  // court: {
  //   label: "Court Records",
  //   icon: Scale,
  //   bgColor: "bg-destructive",
  //   items: [
  //     // { value: "court-records", label: "Court Records", credits: 4, comingSoon: true },
  //     // { value: "case-details", label: "Case Details", credits: 3, comingSoon: true },
  //   ],
  // },
  logs: {
    label: "Search History",
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
  const [userLogs, setUserLogs] = useState<UserLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [logsPage, setLogsPage] = useState(1);
  const [logsTotalPages, setLogsTotalPages] = useState(1);
  const [errorDialog, setErrorDialog] = useState<{
    show: boolean;
    title: string;
    message: string;
    type: 'error' | 'warning' | 'info';
  }>({ show: false, title: '', message: '', type: 'error' });
  const [healthStatus, setHealthStatus] = useState<HealthCheckResponse | null>(null);
  const [apiHealthMap, setApiHealthMap] = useState<Map<string, boolean>>(new Map());
  const { user: authUser, logout: authLogout, isAuthenticated, isDemoUser, updateUser } = useAuth();

  const fetchUserLogs = async (forceRefresh = false) => {
    // Check cache first (unless force refresh)
    if (!forceRefresh) {
      const cachedData = sessionStorage.getItem('dashboard_logs');
      if (cachedData) {
        try {
          const parsed = JSON.parse(cachedData);
          const cacheAge = Date.now() - parsed.timestamp;
          // Use cache if less than 5 minutes old
          if (cacheAge < 5 * 60 * 1000) {
            setUserLogs(parsed.data);
            setLogsTotalPages(parsed.totalPages);
            return;
          }
        } catch (e) {
          console.error('Failed to parse cached logs:', e);
        }
      }
    }

    setLogsLoading(true);
    try {
      const response = await getUserLogs(logsPage, 20);
      
      // Filter out payment-related logs - only show verification activity logs
      const verificationLogs = response.logs.filter(log => {
        const action = log.action.toLowerCase();
        // Exclude payment/transaction related logs
        return !action.includes('payment') && 
               !action.includes('recharge') && 
               !action.includes('credit purchase') &&
               !action.includes('transaction') &&
               !action.includes('razorpay');
      });
      
      setUserLogs(verificationLogs);
      const totalPages = Math.ceil(response.total / response.limit);
      setLogsTotalPages(totalPages);
      
      // Cache the data
      sessionStorage.setItem('dashboard_logs', JSON.stringify({
        data: verificationLogs,
        totalPages,
        timestamp: Date.now()
      }));
    } catch (error: any) {
      console.error('Failed to fetch logs:', error);
      setErrorDialog({
        show: true,
        title: 'Failed to Load Logs',
        message: error.message || 'Unable to fetch activity logs. Please try again.',
        type: 'error'
      });
    } finally {
      setLogsLoading(false);
    }
  };

  // Fetch user logs when viewing history
  useEffect(() => {
    if (activeCategory === 'logs' && isAuthenticated) {
      fetchUserLogs();
    }
  }, [activeCategory, logsPage, isAuthenticated]);

  // Fetch health status on mount and every 30 seconds
  useEffect(() => {
    const fetchHealth = async () => {
      const health = await getHealthStatus();
      setHealthStatus(health);
      
      // Create a map of API endpoints to their health status
      const healthMap = new Map<string, boolean>();
      
      // Map of verification values to their API endpoints
      const apiEndpointMap: Record<string, string> = {
        'pan-info': '/api/pan/pan-comprehensive',
        'aadhar-family-tree': '/api/aadhaar/family-members',
        'driving-license': '/api/driving-license/driving-license',
        'din-lookup': '/api/corporate/din',
        'director-phone': '/api/corporate/director-phone',
        'gstin-advanced': '/api/corporate/gstin-advanced',
        'bank-verification-mobile': '/api/bank-verification/bank-verification-mobile',
        'rc-full': '/api/rc/rc-full',
        'rc-to-mobile': '/api/rc/rc-to-mobile-number',
        'mobile-to-rc': '/api/rc/mobile-number-to-rc',
        'fastag-to-rc': '/api/fastag/tag-to-rc',
        'rc-to-fastag': '/api/fastag/rc-to-tag',
        'fampay-upi-to-mobile': '/api/fampay/upi-to-mobile',
        'gstin-by-company-name': '/api/corporate/gstin-by-company-name',
        'gstin-by-pan': '/api/corporate/gstin-by-pan',
        'mobile-intelligence': '/api/prefill/prefill-by-mobile',
        'voter-id': '/api/voter-id',
        // New APIs
        'mobile-to-multiple-upi': '/api/bank-verification/mobile-to-multiple-upi',
        'chassis-to-rc': '/api/rc/chassis-to-rc-details',
        'voter-id-text': '/api/voter-id/voter-id-info',
        'cin-to-pan': '/api/corporate/cin-to-pan',
        'mobile-to-uan': '/api/income/mobile-to-uan',
        'uan-employment-history': '/api/income/uan-to-employment-history',
        'pan-to-uan': '/api/pan/pan-to-uan',
        'rc-owner-history': '/api/rc/rc-owner-history',
        'mobile-to-gas': '/api/gas-connection/verify',
      };
      
      // If all systems are OK, mark all as working
      if (health.status === 'ok') {
        Object.keys(apiEndpointMap).forEach(key => healthMap.set(key, true));
      } 
      // If system is completely down, mark all as not working
      else if (health.status === 'down') {
        Object.keys(apiEndpointMap).forEach(key => healthMap.set(key, false));
      }
      // If partial, check which ones are down
      else if (health.status === 'partial' && health.apis) {
        Object.entries(apiEndpointMap).forEach(([verificationValue, endpoint]) => {
          const isDown = health.apis!.some(downApi => endpoint.includes(downApi) || downApi.includes(endpoint));
          healthMap.set(verificationValue, !isDown);
        });
      }
      
      setApiHealthMap(healthMap);
    };
    
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

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

  // Helper function to check if a service is working
  const isServiceWorking = (verificationValue: string): boolean | null => {
    // If health check hasn't completed yet, return null (unknown)
    if (apiHealthMap.size === 0) return null;
    
    // Check if this specific service has a status
    const status = apiHealthMap.get(verificationValue);
    
    // If not in map, assume it's not a real API (like coming soon features)
    if (status === undefined) return null;
    
    return status;
  };

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
      setErrorDialog({
        show: true,
        title: '🚧 Feature Coming Soon',
        message: 'This verification service is currently under development and will be available soon. Stay tuned!',
        type: 'info'
      });
      return;
    }
    
    if (credits < verification.credits) {
      setErrorDialog({
        show: true,
        title: '💳 Insufficient Credits',
        message: `This verification requires ${verification.credits} credits, but you only have ${credits} credits remaining. Please recharge your wallet to continue.`,
        type: 'warning'
      });
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
    
    // Show a toast after 5 seconds if the request is still pending
    const slowRequestToast = setTimeout(() => {
      toast({
        title: "⏳ Please Wait",
        description: "This verification is taking longer than usual. We're still processing your request...",
        duration: 5000,
      });
    }, 5000);

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
      } else if (selectedVerification.value === 'aadhar-family-tree') {
        // ✅ REAL API CALL for Aadhaar Family Members
        response = await verifyAadhaarFamilyMembers(query);
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
      } else if (selectedVerification.value === 'mobile-to-rc') {
        // ✅ REAL API CALL for Mobile to RC
        response = await verifyMobileToRC(query);
      } else if (selectedVerification.value === 'fastag-to-rc') {
        // ✅ REAL API CALL for FASTag to RC
        response = await verifyFASTagToRC(query);
      } else if (selectedVerification.value === 'rc-to-fastag') {
        // ✅ REAL API CALL for RC to FASTag
        response = await verifyRCToFASTag(query);
      } else if (selectedVerification.value === 'fampay-upi-to-mobile') {
        // ✅ REAL API CALL for FamPay UPI to Mobile
        response = await verifyFamPayUPIToMobile(query);
      } else if (selectedVerification.value === 'gstin-by-company-name') {
        // ✅ REAL API CALL for GSTIN Search by Company Name
        response = await verifyGSTINByCompanyName(query);
      } else if (selectedVerification.value === 'gstin-by-pan') {
        // ✅ REAL API CALL for GSTIN Search by PAN
        response = await verifyGSTINByPAN(query);
      } else if (selectedVerification.value === 'mobile-intelligence') {
        // ✅ REAL API CALL for Mobile Intelligence
        response = await verifyMobileIntelligence(query);
      } else if (selectedVerification.value === 'mobile-to-address') {
        // ✅ REAL API CALL for Mobile to Address
        response = await verifyMobileToAddress(query);
      } else if (selectedVerification.value === 'mobile-to-multiple-upi') {
        // ✅ REAL API CALL for Mobile to Multiple UPI
        response = await verifyMobileToMultipleUPI(query);
      } else if (selectedVerification.value === 'chassis-to-rc') {
        // ✅ REAL API CALL for Chassis to RC
        response = await verifyChassisToRCDetails(query);
      } else if (selectedVerification.value === 'voter-id-text') {
        // ✅ REAL API CALL for Voter ID Text
        response = await verifyVoterIDText(query);
      } else if (selectedVerification.value === 'cin-to-pan') {
        // ✅ REAL API CALL for CIN to PAN
        response = await verifyCINToPAN(query);
      } else if (selectedVerification.value === 'mobile-to-uan') {
        // ✅ REAL API CALL for Mobile to UAN
        response = await verifyMobileToUAN(query);
      } else if (selectedVerification.value === 'uan-employment-history') {
        // ✅ REAL API CALL for UAN to Employment History
        response = await verifyUANToEmploymentHistory(query);
      } else if (selectedVerification.value === 'pan-to-uan') {
        // ✅ REAL API CALL for PAN to UAN
        response = await verifyPANToUAN(query);
      } else if (selectedVerification.value === 'rc-owner-history') {
        // ✅ REAL API CALL for RC Owner History
        response = await verifyRCOwnerHistory(query);
      } else if (selectedVerification.value === 'mobile-to-gas') {
        // ✅ REAL API CALL for Mobile to GAS Connection
        response = await verifyMobileToGAS(query);
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
        clearTimeout(slowRequestToast); // Clear the slow request toast
        throw new Error(response.message || 'Verification failed');
      }

      clearTimeout(slowRequestToast); // Clear the slow request toast on success

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
      
      // Update AuthContext so credits reflect everywhere (Header, etc.)
      if (authUser) {
        updateUser({
          ...authUser,
          credits: newCredits
        });
      }
      
      setCurrentResult(newResult);
      setIsSearching(false);
      setShowQueryModal(false);
      setShowResultModal(true);

      console.log('✅ Verification completed successfully');

    } catch (error: any) {
      clearTimeout(slowRequestToast); // Clear the slow request toast on error
      
      console.error('❌ Verification failed:', {
        error: error.message,
        type: selectedVerification.value,
        timestamp: new Date().toISOString(),
      });
      
      let errorTitle = 'Verification Failed';
      let errorMessage = 'Unable to complete verification. Please try again.';
      let errorType: 'error' | 'warning' | 'info' = 'error';
      
      // Check for backend model/attribute errors (e.g., 'User' object has no attribute 'company')
      if (error.message.includes('has no attribute') || error.message.includes('object has no attribute')) {
        errorTitle = '🔧 API Configuration Issue';
        errorMessage = `A backend configuration error has been detected:\n\n"${error.message}"\n\n⚠️ This is a known issue with the backend API that requires server-side fixes.\n\n💡 Recommended Actions:\n• Contact the backend team at support@recordsetu.com\n• Report this error: "${error.message}"\n• Try a different verification service\n• Check back later after the issue is resolved\n\nCredits have NOT been deducted for this failed request.`;
        errorType = 'warning';
      } else if (error.message.includes('Verification Failed') || error.message.includes('verification_failed')) {
        errorTitle = '🔍 No Data Found';
        errorMessage = `No records found for the provided ${selectedVerification.label.toLowerCase()}. This could mean:\n\n• The information doesn't exist in our database\n• The input format may be incorrect\n• The data is not linked to any records\n\nPlease verify your input and try again. If you believe this is an error, contact support.`;
        errorType = 'info';
      } else if (error.message.includes('not yet implemented')) {
        errorTitle = '🚧 Feature Unavailable';
        errorMessage = 'This verification type is not yet available. Please try another verification service.';
        errorType = 'info';
      } else if (error.message.includes('Timeout') || error.message.includes('timed out') || error.message.includes('504')) {
        errorTitle = '⏱️ Request Timeout';
        errorMessage = `The verification service took too long to respond and timed out.\n\nThis usually happens when:\n• The external data provider is slow or overloaded\n• Network latency is high\n• The service is experiencing high traffic\n\n💡 Suggested Actions:\n• Wait a moment and try again\n• Try during off-peak hours\n• Contact support if the issue persists`;
        errorType = 'warning';
      } else if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        errorTitle = '🔒 Session Expired';
        errorMessage = 'Your session has expired for security reasons. You will be redirected to the login page.';
        errorType = 'warning';
        setTimeout(() => navigate('/login'), 3000);
      } else if (error.message.includes('503') || error.message.includes('unavailable')) {
        errorTitle = '🚫 Service Unavailable';
        errorMessage = 'The verification service is temporarily unavailable. This is usually temporary.\n\nPlease try again in a few minutes.';
        errorType = 'warning';
      } else if (error.message.includes('Network') || error.message.includes('Failed to fetch')) {
        errorTitle = '🌐 Connection Error';
        errorMessage = 'Unable to connect to the server. Please check your internet connection and try again.';
        errorType = 'error';
      } else if (error.message.includes('required') || error.message.includes('invalid')) {
        errorTitle = '⚠️ Invalid Input';
        errorMessage = `There was an issue with your input: ${error.message}\n\nPlease check your entry and try again.`;
        errorType = 'warning';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setErrorDialog({
        show: true,
        title: errorTitle,
        message: errorMessage,
        type: errorType
      });
      
      setIsSearching(false);
      setShowQueryModal(false);
    }
  };

  const handleExportPDF = () => {
    if (!currentResult || !currentResult.data) {
      setErrorDialog({
        show: true,
        title: '📄 No Data Available',
        message: 'There is no verification data available to export. Please complete a verification first.',
        type: 'info'
      });
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
      
      setErrorDialog({
        show: true,
        title: '✅ Export Successful',
        message: 'Your verification report has been exported as a PDF successfully!',
        type: 'info'
      });
    } catch (error) {
      console.error("PDF export error:", error);
      setErrorDialog({
        show: true,
        title: '❌ Export Failed',
        message: 'Unable to export the PDF report. Please try again or contact support if the issue persists.',
        type: 'error'
      });
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
                    onClick={() => {
                      setActiveCategory(category);
                      setSearchQuery("");
                    }}
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
        <main className="flex-1 overflow-y-auto bg-slate-50 flex flex-col">
          {/* Demo Mode Banner */}
          {/* {isDemoUser && (
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900 px-6 py-3 text-center font-medium shadow-md">
              <span className="inline-flex items-center gap-2">
                🎭 <span className="font-bold">Demo Mode Active</span> - You're using a demo account. Data is simulated for testing purposes.
              </span>
            </div>
          )} */}
          
          <div className="flex-1 w-full">
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
              <div className="flex items-center justify-between">
                <div>
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
                
                {/* System Health Status Badge */}
                {healthStatus && (
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                    healthStatus.status === 'ok' 
                      ? 'bg-green-50 border-green-200' 
                      : healthStatus.status === 'partial'
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="relative">
                      <div className={`absolute inset-0 rounded-full ${
                        healthStatus.status === 'ok' ? 'bg-green-400' : healthStatus.status === 'partial' ? 'bg-yellow-400' : 'bg-red-400'
                      } ${healthStatus.status === 'ok' ? 'animate-ping' : 'animate-pulse'} opacity-75`} />
                      <div className={`relative w-2.5 h-2.5 rounded-full ${
                        healthStatus.status === 'ok' ? 'bg-green-500' : healthStatus.status === 'partial' ? 'bg-yellow-500' : 'bg-red-500'
                      } border border-white`} />
                    </div>
                    <span className={`text-sm font-medium ${
                      healthStatus.status === 'ok' 
                        ? 'text-green-700' 
                        : healthStatus.status === 'partial'
                        ? 'text-yellow-700'
                        : 'text-red-700'
                    }`}>
                      {healthStatus.status === 'ok' 
                        ? 'All Systems Operational' 
                        : healthStatus.status === 'partial'
                        ? `${healthStatus.apis?.length || 0} Service${(healthStatus.apis?.length || 0) !== 1 ? 's' : ''} Down`
                        : 'System Maintenance'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* CARDS GRID */}
            {activeCategory === "logs" ? (
              // HISTORY VIEW
              <div className="space-y-4">
                {logsLoading ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading activity logs...</p>
                  </div>
                ) : userLogs.length > 0 ? (
                  <>
                    {userLogs.map((log) => {
                      // Convert UTC to IST (add 5 hours 30 minutes)
                      const convertToIST = (utcDateString: string) => {
                        try {
                          console.log('Date string received:', utcDateString, 'for log:', log);
                          
                          if (!utcDateString || utcDateString === 'undefined' || utcDateString === 'null') {
                            console.warn('Empty or invalid date string:', utcDateString);
                            return 'Date not available';
                          }
                          
                          const date = new Date(utcDateString);
                          
                          // Check if date is valid
                          if (isNaN(date.getTime())) {
                            console.error('Invalid date parsing:', utcDateString);
                            return 'Invalid Date';
                          }
                          
                          // Convert to IST by adding 5 hours 30 minutes (330 minutes)
                          const istDate = new Date(date.getTime() + (330 * 60 * 1000));
                          
                          const day = istDate.getDate();
                          const month = istDate.toLocaleString('en-US', { month: 'short' });
                          const year = istDate.getFullYear();
                          const hours = istDate.getHours();
                          const minutes = istDate.getMinutes().toString().padStart(2, '0');
                          const seconds = istDate.getSeconds().toString().padStart(2, '0');
                          const ampm = hours >= 12 ? 'PM' : 'AM';
                          const hour12 = hours % 12 || 12;
                          
                          return `${day} ${month} ${year}, ${hour12}:${minutes}:${seconds} ${ampm}`;
                        } catch (error) {
                          console.error('Error converting date:', error, 'Input:', utcDateString);
                          return 'Invalid Date';
                        }
                      };
                      
                      return (
                      <div
                        key={log.id}
                        className="bg-white border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="bg-slate-50 p-4 border-b border-border">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-heading font-bold text-foreground">{log.action}</h4>
                                <CheckCircle className="w-4 h-4 text-secondary" />
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-muted-foreground">
                                -{log.credits_used} credits
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-muted-foreground mb-2">
                            Query: <code className="bg-slate-100 px-2 py-0.5 rounded text-xs font-mono text-foreground">{log.input}</code>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {convertToIST(log.timestamp)} IST
                          </p>
                        </div>
                      </div>
                      );
                    })}
                    
                    {/* Pagination Controls */}
                    {logsTotalPages > 1 && (
                      <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                          onClick={() => setLogsPage(prev => Math.max(1, prev - 1))}
                          disabled={logsPage === 1}
                          className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90"
                        >
                          Previous
                        </button>
                        <span className="text-sm text-muted-foreground">
                          Page {logsPage} of {logsTotalPages}
                        </span>
                        <button
                          onClick={() => setLogsPage(prev => Math.min(logsTotalPages, prev + 1))}
                          disabled={logsPage === logsTotalPages}
                          className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-16">
                    <History className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">No activity logs found</p>
                    <p className="text-sm text-muted-foreground/70 mt-1">
                      Your verification activities will appear here
                    </p>
                  </div>
                )}
              </div>
            ) : results.length > 0 && activeCategory === "logs-old" ? (
              // OLD HISTORY VIEW (kept for backwards compatibility)
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
                  const serviceStatus = isServiceWorking(item.value);
                  
                  return (
                    <div
                      key={`${category}-${item.value}`}
                      className={`${categoryData.bgColor} rounded-xl p-6 relative overflow-hidden group hover:shadow-2xl transition-all hover:scale-105 min-h-[200px] ${item.comingSoon ? 'opacity-75' : ''}`}
                    >
                      {/* Health Status LED Indicator */}
                      {!item.comingSoon && serviceStatus !== null && (
                        <div className="absolute top-3 right-3 z-20" title={serviceStatus ? 'Service Online' : 'Service Offline'}>
                          <div className="relative">
                            {/* Glowing effect */}
                            <div className={`absolute inset-0 rounded-full ${serviceStatus ? 'bg-green-400' : 'bg-red-400'} ${serviceStatus ? 'animate-ping' : 'animate-pulse'} opacity-75`} />
                            {/* LED dot */}
                            <div className={`relative w-3 h-3 rounded-full ${serviceStatus ? 'bg-green-500' : 'bg-red-500'} border-2 border-white shadow-lg`} />
                          </div>
                        </div>
                      )}

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
                          {item.description || item.value.split("-").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
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
          </div>

          {/* Footer */}
          <footer className="mt-8 border-t border-border bg-slate-50">
            <div className="max-w-7xl mx-auto px-8 py-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>© 2026 CyberShastra. All rights reserved.</span>
                </div>
                <div className="flex items-center gap-6">
                  <a href="/privacy" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                  <a href="/terms" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </a>
                  {/* <a href="https://docs.cybershastra.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                    Documentation
                  </a> */}
                  <a href="/contact" className="hover:text-foreground transition-colors">
                    Support
                  </a>
                </div>
                <div className="text-muted-foreground">
                  Version 1.0.1
                </div>
              </div>
            </div>
          </footer>
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
                {selectedVerification.value === 'aadhar-family-tree' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
                    <p className="text-xs text-amber-900">
                      Only family members linked to ration card can be viewed
                    </p>
                  </div>
                )}
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

      {/* Error Dialog */}
      <AlertDialog open={errorDialog.show} onOpenChange={(open) => setErrorDialog({ ...errorDialog, show: open })}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {errorDialog.type === 'error' && <AlertCircle className="w-5 h-5 text-destructive" />}
              {errorDialog.type === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-500" />}
              {errorDialog.type === 'info' && <AlertCircle className="w-5 h-5 text-blue-500" />}
              {errorDialog.title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm leading-relaxed whitespace-pre-line pt-2">
              {errorDialog.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => setErrorDialog({ ...errorDialog, show: false })}
              className="bg-primary hover:bg-primary/90"
            >
              Got it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}