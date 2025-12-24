import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import EulaModal from "@/components/EulaModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Search,
  Wallet,
  LogOut,
  Settings,
  History,
  CheckCircle,
  AlertCircle,
  Zap,
  Shield,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";

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

const VERIFICATION_CATEGORIES = {
  identity: [
    { value: "aadhar-search", label: "Aadhar Search" },
    { value: "pan-search", label: "PAN Search" },
    { value: "pan-info", label: "PAN Info" },
    { value: "tan-search", label: "TAN Search" },
    { value: "aadhar-to-pan", label: "Aadhar to PAN Linking" },
    { value: "pan-validation", label: "PAN Validation" },
    { value: "phone-verification", label: "Phone Number Verification" },
    { value: "mobile-to-pan", label: "Mobile No to PAN" },
    { value: "driving-license", label: "Driving License Verification" },
    { value: "voter-id", label: "Voter ID Search" },
    { value: "aadhar-family-tree", label: "Aadhar to Family Tree" },
    { value: "rc-details", label: "RC Details" },
    { value: "rc-to-mobile", label: "RC to Mobile No" },
    { value: "mobile-to-rc", label: "Mobile No to RC" },
    { value: "mobile-to-multiple-addresses", label: "Mobile to Addresses, Email, DOB, Age" },
    { value: "fastag-to-rc", label: "FASTag to RC" },
    { value: "rc-to-fastag", label: "RC to FASTag" },
  ],
  financial: [
    { value: "phone-to-bank", label: "Phone to Bank Account" },
    { value: "bank-validation", label: "Bank Account Validation" },
    { value: "bank-ifsc", label: "Bank IFSC Validation" },
    { value: "mobile-to-upi", label: "Mobile to UPI" },
    { value: "upi-details", label: "UPI Details" },
    { value: "mobile-to-multiple-upi", label: "Mobile to Multiple UPIs" },
    { value: "gst-search", label: "GST Registration Search" },
    { value: "gst-pan", label: "GST to PAN Linking" },
    { value: "gst-details", label: "GST to Details (Full Info)" },
    { value: "pan-to-all-gst", label: "PAN to All GST" },
    { value: "gst-validation", label: "GST Validation" },
    { value: "income-tax", label: "Income Tax Records" },
    { value: "pan-to-uan", label: "PAN to UAN" },
    { value: "pan-employment", label: "PAN to Current Employment" },
    { value: "mobile-to-delivery", label: "Mobile to Last Delivery Address" },
    { value: "mobile-to-uan", label: "Mobile to UAN" },
    { value: "gas-connection", label: "Gas Connection Details" },
  ],
  advanced: [
    { value: "phone-aadhar", label: "Phone to Aadhar" },
    { value: "pan-to-gst", label: "PAN to GST" },
    { value: "multi-search", label: "Multi-Record Search" },
    { value: "property-search", label: "Property Records Search" },
    { value: "company-search", label: "Company Search" },
    { value: "court-records", label: "Court Records" },
    { value: "case-details", label: "Case Details" },
    { value: "fampay-to-mobile", label: "Fampay to Mobile" },
  ],
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState(250);
  const [searchCategory, setSearchCategory] = useState<
    "identity" | "financial" | "advanced"
  >("identity");
  const [verificationType, setVerificationType] = useState(
    VERIFICATION_CATEGORIES.identity[0].value
  );
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<VerificationResult[]>([]);
  const [activeTab, setActiveTab] = useState<"verify" | "history">("verify");
  const [showEulaModal, setShowEulaModal] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));

    // Check if user has accepted EULA
    const eulaAccepted = localStorage.getItem("eulaAccepted");
    if (!eulaAccepted) {
      setShowEulaModal(true);
    }

    // Mock historical data with sample results
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
      {
        id: "2",
        type: "Phone to Bank",
        query: "+91-9876543210",
        status: "success",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        creditsUsed: 3,
        data: {
          mobileNumber: "+91-9876543210",
          bankName: "HDFC Bank",
          accountHolderName: "John Doe",
          accountNumber: "****5678",
          accountType: "Savings",
          verified: true,
        },
      },
      {
        id: "3",
        type: "PAN Validation",
        query: "ABCDE1234F",
        status: "success",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        creditsUsed: 1,
        data: {
          panNumber: "ABCDE1234F",
          name: "John Doe",
          panStatus: "Active",
          registrationDate: "12-06-2015",
          verified: true,
        },
      },
    ]);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
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
        aadharNumber: "1234-5678-9012",
        name: "John Doe",
        dob: "15-01-1990",
        gender: "Male",
        address: "123 Main Street, New Delhi, Delhi 110001",
        email: "john.doe@example.com",
        mobileVerified: true,
      },
      "pan-search": {
        panNumber: "ABCDE1234F",
        name: "John Doe",
        fatherName: "Mr. James Doe",
        dob: "15-01-1990",
        gender: "Male",
        address: "123 Main Street, New Delhi, Delhi 110001",
        panStatus: "Active",
        itFiledStatus: "Yes (2023)",
      },
      "pan-info": {
        panNumber: "ABCDE1234F",
        fullName: "John Doe",
        fatherName: "James Doe",
        dateOfBirth: "15-01-1990",
        panStatus: "Active",
        registrationDate: "12-06-2015",
        panClass: "Individual",
        itaxAssessees: "Yes",
        panRegion: "New Delhi",
      },
      "tan-search": {
        tanNumber: "AAAA00000A000",
        entityName: "ABC Enterprises Pvt Ltd",
        entityType: "Company",
        pan: "ABCDE1234F",
        activationDate: "01-01-2020",
        status: "Active",
        deductorType: "Employer",
      },
      "mobile-to-pan": {
        mobileNumber: query,
        panNumber: "ABCDE1234F",
        name: "John Doe",
        dob: "15-01-1990",
        verified: true,
        linkedDate: "10-03-2023",
      },
      "rc-details": {
        registrationNumber: query,
        ownerName: "John Doe",
        vehicleClass: "Light Motor Vehicle",
        maker: "Maruti Suzuki",
        model: "Swift",
        fuelType: "Petrol",
        registrationDate: "15-05-2020",
        validUpto: "14-05-2024",
        rtoCode: "DL-01",
      },
      "rc-to-mobile": {
        registrationNumber: query,
        ownerName: "John Doe",
        mobileNumber: "+91-9876543210",
        email: "john.doe@example.com",
        verified: true,
      },
      "mobile-to-rc": {
        mobileNumber: query,
        registrationNumber: "DL-05AC-1234",
        ownerName: "John Doe",
        vehicleModel: "Maruti Swift",
        registrationDate: "15-05-2020",
        verified: true,
      },
      "mobile-to-multiple-addresses": {
        mobileNumber: query,
        primaryAddress: "123 Main Street, New Delhi, Delhi 110001",
        alternateAddresses: ["456 Park Avenue, Gurgaon, Haryana 122001"],
        email: "john.doe@example.com",
        dateOfBirth: "15-01-1990",
        age: 34,
        alternatePhones: ["+91-9876543211"],
      },
      "upi-details": {
        upiId: query,
        userName: "John Doe",
        bankName: "HDFC Bank",
        accountNumber: "****5678",
        ifscCode: "HDFC0001234",
        verified: true,
        linkedDate: "20-01-2022",
      },
      "mobile-to-upi": {
        mobileNumber: query,
        upiIds: ["john.doe@okhdfcbank", "johndoe@okaxis"],
        linkedBanks: ["HDFC Bank", "Axis Bank"],
        verified: true,
      },
      "mobile-to-multiple-upi": {
        mobileNumber: query,
        upiIds: [
          "john.doe@okhdfcbank",
          "johndoe@okaxis",
          "johndoe@okicici",
        ],
        linkedBanks: ["HDFC Bank", "Axis Bank", "ICICI Bank"],
        totalUpisLinked: 3,
        verified: true,
      },
      "gst-search": {
        gstNumber: query,
        businessName: "ABC Enterprises",
        registrationType: "Regular",
        registrationDate: "01-06-2020",
        businessType: "Goods",
        status: "Active",
        state: "Delhi",
        filingStatus: "Compliant",
      },
      "gst-details": {
        gstNumber: query,
        businessName: "ABC Enterprises Pvt Ltd",
        proprietorName: "John Doe",
        registrationType: "Regular",
        registrationDate: "01-06-2020",
        businessAddresses: ["123 Business Park, New Delhi"],
        bankDetails: "Linked",
        pan: "ABCDE1234F",
        status: "Active",
        turnover2023: "₹50,00,000",
      },
      "pan-to-all-gst": {
        panNumber: query,
        associatedGsts: ["27AABCT1234H1Z0", "27AABCT5678H2Z1"],
        businessNames: ["ABC Enterprises", "XYZ Services"],
        status: "Active",
        totalBusinesses: 2,
      },
      "pan-to-uan": {
        panNumber: query,
        uanNumber: "100000000001",
        employeeName: "John Doe",
        dateOfBirth: "15-01-1990",
        verified: true,
        memberStatus: "Active",
      },
      "pan-employment": {
        panNumber: query,
        employeeName: "John Doe",
        currentEmployer: "Tech Solutions Pvt Ltd",
        designation: "Senior Developer",
        department: "Information Technology",
        dateOfJoining: "15-03-2020",
        employmentStatus: "Active",
      },
      "mobile-to-delivery": {
        mobileNumber: query,
        lastDeliveryAddress: "123 Main Street, New Delhi, Delhi 110001",
        lastDeliveryDate: "20-12-2024",
        alternateDeliveryAddresses: ["456 Park Avenue, Gurgaon"],
        deliveriesCount: 25,
      },
      "mobile-to-uan": {
        mobileNumber: query,
        uanNumber: "100000000001",
        memberName: "John Doe",
        memberStatus: "Active",
        verified: true,
      },
      "gas-connection": {
        consumerNumber: query,
        consumerName: "John Doe",
        connectionType: "Domestic",
        distributor: "Indraprastha Gas Limited",
        meterNumber: "MG123456789",
        connectionDate: "15-06-2020",
        status: "Active",
        billAmount: "₹1,250",
      },
      "aadhar-family-tree": {
        aadharNumber: query,
        primaryMember: "John Doe",
        spouse: "Jane Doe",
        children: ["Raj Doe", "Priya Doe"],
        parents: ["James Doe", "Mary Doe"],
        verified: true,
      },
      "fastag-to-rc": {
        fastagNumber: query,
        registrationNumber: "DL-05AC-1234",
        ownerName: "John Doe",
        vehicleModel: "Maruti Swift",
        verified: true,
      },
      "rc-to-fastag": {
        registrationNumber: query,
        fastagNumber: "999000100001",
        ownerName: "John Doe",
        status: "Active",
        activated: "15-03-2023",
      },
      "phone-to-bank": {
        mobileNumber: query,
        bankName: "HDFC Bank",
        accountHolderName: "John Doe",
        accountNumber: "****5678",
        accountType: "Savings",
        ifscCode: "HDFC0001234",
        verified: true,
      },
      "bank-validation": {
        accountNumber: query,
        accountHolderName: "John Doe",
        bankName: "HDFC Bank",
        ifscCode: "HDFC0001234",
        accountStatus: "Active",
        accountType: "Savings",
        verified: true,
      },
      "bank-ifsc": {
        ifscCode: query,
        bankName: "HDFC Bank",
        branchName: "New Delhi Main Branch",
        branchCode: "0001234",
        address: "123 Banking Street, New Delhi",
        verified: true,
      },
      "court-records": {
        query: query,
        casesFound: 1,
        caseNumber: "CS(OS)/2023/12345",
        caseType: "Civil",
        petitioner: "John Doe",
        respondent: "XYZ Company",
        filingDate: "15-01-2023",
        status: "Pending",
        nextHearing: "30-01-2025",
      },
      "case-details": {
        caseNumber: query,
        caseType: "Civil",
        courtName: "Delhi High Court",
        petitioner: "John Doe",
        respondent: "XYZ Company",
        filingDate: "15-01-2023",
        status: "Pending",
        judgeAssigned: "Hon'ble Justice Smith",
        nextHearing: "30-01-2025",
      },
      "fampay-to-mobile": {
        fampayId: query,
        mobileNumber: "+91-9876543210",
        familyName: "Doe Family",
        members: 4,
        verified: true,
      },
      "phone-aadhar": {
        mobileNumber: query,
        aadharNumber: "1234-5678-9012",
        name: "John Doe",
        verified: true,
      },
      "pan-to-gst": {
        panNumber: query,
        linkedGst: "27AABCT1234H1Z0",
        businessName: "ABC Enterprises",
        status: "Linked",
      },
      "multi-search": {
        query: query,
        identityMatches: {
          aadharNumber: "1234-5678-9012",
          panNumber: "ABCDE1234F",
        },
        financialMatches: {
          gstNumber: "27AABCT1234H1Z0",
          bankAccount: "HDFC****5678",
        },
        verified: true,
      },
      "property-search": {
        query: query,
        propertyAddress: "123 Main Street, New Delhi, Delhi 110001",
        ownerName: "John Doe",
        propertyType: "Residential",
        registrationNumber: "DL123456789",
        registrationDate: "15-05-2020",
        propertyValue: "₹50,00,000",
        verified: true,
      },
      "company-search": {
        query: query,
        companyName: "ABC Enterprises Pvt Ltd",
        cin: "U72900DL2020PTC999999",
        registrationDate: "01-06-2020",
        directorName: "John Doe",
        companyStatus: "Active",
        registeredOffice: "123 Business Park, New Delhi",
      },
    };

    return dataMap[type] || { status: "Data not available", verified: false };
  };

  const getVerificationInfo = (type: string) => {
    const infoMap: Record<string, { placeholder: string; credits: number }> = {
      "aadhar-search": { placeholder: "e.g., 1234-5678-9012", credits: 2 },
      "pan-search": { placeholder: "e.g., ABCDE1234F", credits: 1 },
      "pan-info": { placeholder: "e.g., ABCDE1234F", credits: 2 },
      "tan-search": { placeholder: "e.g., AAAA00000A000", credits: 2 },
      "aadhar-to-pan": { placeholder: "e.g., 1234-5678-9012", credits: 2 },
      "pan-validation": { placeholder: "e.g., ABCDE1234F", credits: 1 },
      "phone-verification": { placeholder: "e.g., +91-9876543210", credits: 1 },
      "mobile-to-pan": { placeholder: "e.g., +91-9876543210", credits: 2 },
      "driving-license": { placeholder: "e.g., DL-0123456789012", credits: 2 },
      "voter-id": { placeholder: "e.g., Voter ID Number", credits: 1 },
      "aadhar-family-tree": { placeholder: "e.g., 1234-5678-9012", credits: 3 },
      "rc-details": { placeholder: "e.g., Registration Number", credits: 2 },
      "rc-to-mobile": { placeholder: "e.g., Registration Number", credits: 2 },
      "mobile-to-rc": { placeholder: "e.g., +91-9876543210", credits: 3 },
      "mobile-to-multiple-addresses": { placeholder: "e.g., +91-9876543210", credits: 4 },
      "fastag-to-rc": { placeholder: "e.g., FASTag Number", credits: 2 },
      "rc-to-fastag": { placeholder: "e.g., Registration Number", credits: 2 },
      "phone-to-bank": { placeholder: "e.g., +91-9876543210", credits: 3 },
      "bank-validation": { placeholder: "e.g., Account/IFSC code", credits: 2 },
      "bank-ifsc": { placeholder: "e.g., SBIN0001234", credits: 1 },
      "mobile-to-upi": { placeholder: "e.g., +91-9876543210", credits: 2 },
      "upi-details": { placeholder: "e.g., UPI ID", credits: 2 },
      "mobile-to-multiple-upi": { placeholder: "e.g., +91-9876543210", credits: 3 },
      "gst-search": { placeholder: "e.g., 27AABCT1234H1Z0", credits: 2 },
      "gst-pan": { placeholder: "e.g., 27AABCT1234H1Z0", credits: 2 },
      "gst-details": { placeholder: "e.g., 27AABCT1234H1Z0", credits: 3 },
      "pan-to-all-gst": { placeholder: "e.g., ABCDE1234F", credits: 3 },
      "gst-validation": { placeholder: "e.g., 27AABCT1234H1Z0", credits: 1 },
      "income-tax": { placeholder: "e.g., PAN or Aadhar", credits: 2 },
      "pan-to-uan": { placeholder: "e.g., ABCDE1234F", credits: 2 },
      "pan-employment": { placeholder: "e.g., ABCDE1234F", credits: 2 },
      "mobile-to-delivery": { placeholder: "e.g., +91-9876543210", credits: 2 },
      "mobile-to-uan": { placeholder: "e.g., +91-9876543210", credits: 2 },
      "gas-connection": { placeholder: "e.g., Consumer Number/Mobile", credits: 2 },
      "phone-aadhar": { placeholder: "e.g., +91-9876543210", credits: 3 },
      "pan-to-gst": { placeholder: "e.g., ABCDE1234F", credits: 2 },
      "multi-search": { placeholder: "e.g., Phone/Aadhar/PAN", credits: 5 },
      "property-search": { placeholder: "e.g., Property ID/Address", credits: 3 },
      "company-search": { placeholder: "e.g., Company Name/CIN", credits: 2 },
      "court-records": { placeholder: "e.g., Case Number/Party Name", credits: 4 },
      "case-details": { placeholder: "e.g., Case Number", credits: 3 },
      "fampay-to-mobile": { placeholder: "e.g., Fampay Account/ID", credits: 2 },
    };

    return (
      infoMap[type] || { placeholder: "Enter details to verify", credits: 2 }
    );
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setIsSearching(true);

    setTimeout(() => {
      const verificationInfo = getVerificationInfo(verificationType);
      const sampleData = getSampleData(verificationType, query);

      const newResult: VerificationResult = {
        id: Date.now().toString(),
        type: verificationType
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        query,
        status: "success",
        timestamp: new Date().toISOString(),
        creditsUsed: verificationInfo.credits,
        data: sampleData,
      };

      setResults([newResult, ...results]);
      setQuery("");
      setCredits(credits - newResult.creditsUsed);
      setIsSearching(false);
    }, 1200);
  };

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
        credits={credits}

      />

      <EulaModal
        isOpen={showEulaModal}
        onAccept={handleEulaAccept}
        onDecline={handleEulaDecline}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {/* Credit Balance Card */}
          {/* <div className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <Link to="/wallet">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20 h-8"
                >
                  Recharge
                </Button>
              </Link>
            </div>
            <p className="text-white/80 text-sm mb-1">Available Credits</p>
            <p className="text-4xl font-bold">{credits}</p>
            <p className="text-white/60 text-xs mt-2">
              Avg cost: 2.5 credits per verification
            </p>
          </div> */}

          {/* Quick Stats */}
          {/* <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-secondary" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-1">
              Verifications Today
            </p>
            <p className="text-3xl font-bold">
              {results.length > 0 ? 1 : 0}
            </p>
          </div> */}

          {/* <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-accent" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-1">
              Credits Used Today
            </p>
            <p className="text-3xl font-bold">
              {results.reduce((sum, r) => sum + r.creditsUsed, 0)}
            </p>
          </div> */}

          {/* <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-1">All Verifications</p>
            <p className="text-3xl font-bold">{results.length}</p>
          </div> */}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Verification Tool */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-border rounded-xl p-8 shadow-sm">
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                  Verify Records
                </h2>
                <p className="text-muted-foreground">
                  Search and verify government records securely
                </p>
              </div>

              {/* Tabs */}
              <div className="flex gap-4 mb-6 border-b border-border">
                <button
                  onClick={() => setActiveTab("verify")}
                  className={`pb-3 px-1 border-b-2 transition-colors ${
                    activeTab === "verify"
                      ? "border-primary text-primary font-medium"
                      : "border-transparent text-muted-foreground"
                  }`}
                >
                  New Verification
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`pb-3 px-1 border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === "history"
                      ? "border-primary text-primary font-medium"
                      : "border-transparent text-muted-foreground"
                  }`}
                >
                  <History className="w-4 h-4" /> History
                </button>
              </div>

              {activeTab === "verify" ? (
                <form onSubmit={handleVerification} className="space-y-6">
                  {/* Search Category Tabs */}
                  <div>
                    <Label className="text-sm font-medium block mb-4">
                      Select Verification Category
                    </Label>
                    <div className="flex gap-3 mb-6 flex-wrap">
                      {(["identity", "financial", "advanced"] as const).map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setSearchCategory(cat);
                            setVerificationType(VERIFICATION_CATEGORIES[cat][0].value);
                          }}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            searchCategory === cat
                              ? cat === "identity"
                                ? "bg-primary text-white shadow-lg"
                                : cat === "financial"
                                  ? "bg-secondary text-white shadow-lg"
                                  : "bg-accent text-accent-foreground shadow-lg"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {cat === "identity"
                            ? "📋 Identity"
                            : cat === "financial"
                              ? "💳 Financial"
                              : "🔍 Advanced"}
                        </button>
                      ))}
                    </div>

                    {/* Search Options Grid */}
                    <div className="grid sm:grid-cols-2 gap-3 mb-6">
                      {VERIFICATION_CATEGORIES[searchCategory].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setVerificationType(option.value)}
                          className={`p-3 rounded-lg border-2 transition-all text-left ${
                            verificationType === option.value
                              ? "border-primary bg-primary/5 shadow-md"
                              : "border-border hover:border-primary/30"
                          }`}
                        >
                          <p className="font-medium text-foreground text-sm">
                            {option.label}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {getVerificationInfo(option.value).credits} credits
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Query Input */}
                  <div className="space-y-2">
                    <Label htmlFor="query" className="text-sm font-medium">
                      Enter Details
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="query"
                        type="text"
                        placeholder={getVerificationInfo(verificationType).placeholder}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        disabled={isSearching || credits < 1}
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This verification will cost approximately{" "}
                      <strong>
                        {getVerificationInfo(verificationType).credits} credits
                      </strong>
                    </p>
                  </div>

                  {credits < 1 && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-900 text-sm p-4 rounded-lg flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Low Credits</p>
                        <p className="text-sm">
                          You don't have enough credits. Please recharge your
                          wallet.
                        </p>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSearching || !query || credits < 1}
                    className="w-full gap-2"
                  >
                    {isSearching ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" /> Verify Records
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  {results.length > 0 ? (
                    results.map((result) => (
                      <div
                        key={result.id}
                        className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        {/* Header */}
                        <div className="bg-slate-50 p-4 border-b border-border">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground">
                                {result.type}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                Query: <code className="bg-white px-2 py-0.5 rounded text-xs">{result.query}</code>
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {new Date(result.timestamp).toLocaleString()}
                              </p>
                            </div>
                            <div className="text-right">
                              {result.status === "success" ? (
                                <CheckCircle className="w-5 h-5 text-secondary" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-amber-500" />
                              )}
                              <p className="text-sm font-medium text-muted-foreground mt-2">
                                -{result.creditsUsed} credits
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Data Results */}
                        {result.data && (
                          <div className="p-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {Object.entries(result.data).map(([key, value]) => (
                                <div key={key}>
                                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                    {key.replace(/([A-Z])/g, " $1").trim()}
                                  </p>
                                  {Array.isArray(value) ? (
                                    <ul className="text-sm text-foreground mt-1 space-y-1">
                                      {value.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  ) : typeof value === "object" ? (
                                    <div className="text-sm text-foreground mt-1 space-y-1 bg-slate-50 p-2 rounded">
                                      {Object.entries(value as Record<string, any>).map(([k, v]) => (
                                        <div key={k} className="text-xs">
                                          <span className="font-medium">{k}:</span> {String(v)}
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-sm text-foreground font-medium mt-1">
                                      {typeof value === "boolean"
                                        ? value
                                          ? "✓ Yes"
                                          : "✗ No"
                                        : String(value)}
                                    </p>
                                  )}
                                </div>
                              ))}   
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <History className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        No verification history yet
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}



{/* Sidebar */}
          // <div className="space-y-6">
          //   {/* Quick Actions */}
          //   <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          //     <h3 className="font-heading font-bold text-foreground mb-4">
          //       Quick Actions
          //     </h3>
          //     <div className="space-y-3">
          //       <Link to="/wallet">
          //         <Button
          //           variant="outline"
          //           className="w-full justify-start gap-2 h-10"
          //         >
          //           <Wallet className="w-4 h-4" /> Recharge Credits
          //         </Button>
          //       </Link>

          //       {/* Admin Only Features */}
          //       {user?.role === "admin" && (
          //         <>
          //           <Link to="/health">
          //             <Button
          //               variant="outline"
          //               className="w-full justify-start gap-2 h-10"
          //             >
          //               <Zap className="w-4 h-4" /> System Health
          //             </Button>
          //           </Link>
          //           <Link to="/admin">
          //             <Button
          //               variant="outline"
          //               className="w-full justify-start gap-2 h-10"
          //             >
          //               <Settings className="w-4 h-4" /> Admin Panel
          //             </Button>
          //           </Link>
          //         </>
          //       )}

          //       <Button
          //         variant="outline"
          //         className="w-full justify-start gap-2 h-10"
          //         onClick={handleLogout}
          //       >
          //         <LogOut className="w-4 h-4" /> Logout
          //       </Button>
          //     </div>
          //   </div>

          //   {/* Supported Verifications */}
          //   <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          //     <h3 className="font-heading font-bold text-foreground mb-4">
          //       Supported Verifications
          //     </h3>
          //     <div className="space-y-3 text-xs">
          //       <div>
          //         <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">Identity (17)</p>
          //         <ul className="space-y-1">
          //           <li className="flex items-center gap-2 text-muted-foreground">
          //             <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          //             Aadhar & PAN Linking
          //           </li>
          //           <li className="flex items-center gap-2 text-muted-foreground">
          //             <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          //             RC Details & Mobile
          //           </li>
          //           <li className="flex items-center gap-2 text-muted-foreground">
          //             <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          //             FASTag Verification
          //           </li>
          //           <li className="flex items-center gap-2 text-muted-foreground">
          //             <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          //             Aadhar Family Tree
          //           </li>
          //           <li className="flex items-center gap-2 text-muted-foreground">
          //             <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          //             Driving License & Voter
          //           </li>
          //         </ul>
          //       </div>

          //       <div>
          //         <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">Financial (17)</p>
          //         <ul className="space-y-1">
          //           <li className="flex items-center gap-2 text-muted-foreground">
          //             <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
          //             Mobile to Bank/UPI
          //           </li>
          //           <li className="flex items-center gap-2 text-muted-foreground">
          //             <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
          //             GST & PAN Linking
          //           </li>
          //           <li className="flex items-center gap-2 text-muted-foreground">
          //             <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
          //             PAN to UAN/Employment
          //           </li>
          //           <li className="flex items-center gap-2 text-muted-foreground">
          //             <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
          //             Income Tax & Gas
          //           </li>
          //           <li className="flex items-center gap-2 text-muted-foreground">
          //             <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
          //             Delivery Address & UAN
          //           </li>
          //         </ul>
          //       </div>

          //       <div>
          //         <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">Advanced (8)</p>
          //         <ul className="space-y-1">
          //           <li className="flex items-center gap-2 text-muted-foreground">
          //             <div className="w-1.5 h-1.5 bg-accent rounded-full" />
          //             Court Records & Cases
          //           </li>
          //           <li className="flex items-center gap-2 text-muted-foreground">
          //             <div className="w-1.5 h-1.5 bg-accent rounded-full" />
          //             Multi-Record Search
          //           </li>
          //           <li className="flex items-center gap-2 text-muted-foreground">
          //             <div className="w-1.5 h-1.5 bg-accent rounded-full" />
          //             Property & Company
          //           </li>
          //           <li className="flex items-center gap-2 text-muted-foreground">
          //             <div className="w-1.5 h-1.5 bg-accent rounded-full" />
          //             Fampay Search
          //           </li>
          //         </ul>
          //       </div>
          //     </div>
          //   </div>

          //   {/* Security Info */}
          //   <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          //     <div className="flex gap-3">
          //       <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          //       <div>
          //         <p className="font-medium text-blue-900 text-sm mb-1">
          //           🔒 Secured
          //         </p>
          //         <p className="text-blue-800 text-xs">
          //           All verifications are encrypted and logged for compliance
          //         </p>
          //       </div>
          //     </div>
          //   </div>
          // </div>