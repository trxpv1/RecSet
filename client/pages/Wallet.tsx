import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { verifyPayment, getAuthToken, createOrder } from "@/lib/apiClient";
import { useToast } from "@/hooks/use-toast";
import {
  Coins,
  LogOut,
  ArrowUpRight,
  ArrowDownLeft,
  Zap,
  CheckCircle,
} from "lucide-react";

interface User {
  email: string;
  name: string;
  role?: "admin" | "user";
  phone?: string;
}

interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  timestamp: string;
  balanceAfter: number;
}

export default function Wallet() {
  const navigate = useNavigate();
  const { user: authUser, logout: authLogout, isAuthenticated, updateUser, isDemoUser } = useAuth();
  const { toast } = useToast();
  
  // Note: Razorpay key now comes from backend response (not hardcoded)
  // This allows switching between test/live keys on the server
  
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState(250);
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [rechargeMethod, setRechargeMethod] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "credit",
      amount: 100,
      description: "Recharge via Credit Card",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      balanceAfter: 350,
    },
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Map auth user to local user state
    if (authUser) {
      setUser({
        name: `${authUser.first_name} ${authUser.last_name}`,
        email: authUser.email,
        phone: authUser.phone || '+91 98765 43210',
      });
      setBalance(authUser.credits);
    }
  }, [navigate, isAuthenticated, authUser]);

  const handleLogout = async () => {
    await authLogout();
    navigate("/");
  };

  const rechargeOptions = [
    { name: "Silver", credits: 299, price: "₹299", popular: false },
    { name: "Gold", credits: 499, price: "₹499", popular: true },
    { name: "Diamond", credits: 999, price: "₹999", popular: false },
  ];

  // Helper function to generate UUID for idempotency
  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const handleQuickRecharge = async (credits: number, price: string) => {
    try {
      setIsProcessing(true);

      // Calculate amount in INR (remove ₹ and comma)
      const amount = parseInt(price.replace('₹', '').replace(',', ''));

      // Get auth token for payment verification
      const authToken = getAuthToken();
      if (!authToken) {
        toast({
          title: "Authentication Required",
          description: "Please login to make a payment",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      // STEP 1: Create Razorpay order on backend with idempotency key
      // WHY: Backend creates order server-side to prevent amount tampering
      // WHY idempotency_key: Prevents duplicate orders if user clicks multiple times
      const idempotencyKey = generateUUID();
      console.log('🔑 Idempotency Key:', idempotencyKey);
      
      let orderData;
      try {
        orderData = await createOrder({ 
          amount,
          idempotency_key: idempotencyKey 
        });
        console.log('✅ Order created:', orderData);
        
        // PRODUCTION: Validate critical fields
        if (!orderData.order_id || !orderData.razorpay_key_id) {
          console.error('❌ Invalid order response:', orderData);
          throw new Error('Invalid order data received from server');
        }
      } catch (orderError: any) {
        // Enhanced error logging for production debugging
        console.error('❌ Order creation failed:', {
          error: orderError,
          message: orderError.message,
          stack: orderError.stack,
          timestamp: new Date().toISOString(),
          amount: amount,
          user: authUser?.email
        });
        
        toast({
          title: "Payment System Error",
          description: orderError.message || "Failed to create order. Please try again.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      // STEP 2: Open Razorpay checkout with order_id
      // WHY: Use razorpay_key_id from backend response (not hardcoded)
      // This allows backend to switch between test/live keys
      const options = {
        key: orderData.razorpay_key_id, // From backend response
        amount: orderData.amount * 100,  // Amount in paise (INR * 100)
        currency: orderData.currency || 'INR',
        order_id: orderData.order_id, // Backend-created order ID for signature verification
        name: 'RecordSetu',
        description: `${credits} Credits Recharge`,
        image: '/logo.svg', // Company logo
        handler: async (response: any) => {
          // STEP 3: Payment successful - verify on backend
          try {
            // Debug: Log what Razorpay returns
            console.log('💳 Razorpay Payment Response:', {
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature ? '[REDACTED]' : 'MISSING',
              timestamp: new Date().toISOString()
            });
            
            // Razorpay returns: payment_id, order_id, signature when order was created
            const verifyData = await verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              amount: amount,
              token: authToken,
            });

            // STEP 4: Update UI with new balance
            setBalance(verifyData.new_balance);
            
            // Add transaction to history
            const newTransaction: Transaction = {
              id: response.razorpay_payment_id,
              type: "credit",
              amount: verifyData.credits_added,
              description: `Razorpay Payment - ${credits} Credits`,
              timestamp: new Date().toISOString(),
              balanceAfter: verifyData.new_balance,
            };
            setTransactions([newTransaction, ...transactions]);

            // Show success message
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
            
            // Update user in context
            if (authUser) {
              updateUser({ ...authUser, credits: verifyData.new_balance });
            }

            toast({
              title: "Payment Successful!",
              description: `${verifyData.credits_added} credits added to your wallet`,
            });
          } catch (error: any) {
            console.error('❌ Payment verification failed:', {
              error: error,
              message: error.message,
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              timestamp: new Date().toISOString()
            });
            
            toast({
              title: "Payment Verification Failed",
              description: error.message || "Failed to verify payment. Please contact support with payment ID: " + response.razorpay_payment_id,
              variant: "destructive",
            });
          }
        },
        prefill: {
          email: authUser?.email,
          contact: authUser?.phone,
        },
        theme: {
          color: '#3B82F6',
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          }
        }
      };

      // @ts-ignore - Razorpay is loaded via script tag
      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', (response: any) => {
        // Enhanced error logging for Razorpay failures
        console.error('❌ Razorpay Payment Failed:', {
          code: response.error.code,
          description: response.error.description,
          source: response.error.source,
          step: response.error.step,
          reason: response.error.reason,
          order_id: response.error.metadata?.order_id,
          payment_id: response.error.metadata?.payment_id,
          timestamp: new Date().toISOString()
        });
        
        toast({
          title: "Payment Failed",
          description: response.error.description || "Payment could not be processed",
          variant: "destructive",
        });
        setIsProcessing(false);
      });

      razorpay.open();
    } catch (error: any) {
      console.error('Payment error:', error);
      
      // Handle backend endpoint not ready
      if (error.message.includes('404') || error.message.includes('Not Found')) {
        toast({
          title: "Backend Not Ready",
          description: "Payment endpoints need to be implemented. Contact backend team.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to initiate payment",
          variant: "destructive",
        });
      }
      setIsProcessing(false);
    }
  };

  const handleCustomRecharge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rechargeAmount || parseInt(rechargeAmount) < 10) {
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const credits = parseInt(rechargeAmount);
      const newBalance = balance + credits;
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: "credit",
        amount: credits,
        description: `Recharge via ${
          rechargeMethod === "credit-card"
            ? "Credit Card"
            : rechargeMethod === "upi"
              ? "UPI"
              : "Bank Transfer"
        }`,
        timestamp: new Date().toISOString(),
        balanceAfter: newBalance,
      };

      setBalance(newBalance);
      setTransactions([newTransaction, ...transactions]);
      setRechargeAmount("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setIsProcessing(false);
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
        credits={balance}
      />

      {/* Demo Mode Banner */}
      {/* {isDemoUser && (
        <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900 px-6 py-3 text-center font-medium shadow-md">
          <span className="inline-flex items-center gap-2">
            🎭 <span className="font-bold">Demo Mode Active</span> - You're using a demo account. Recharge is simulated.
          </span>
        </div>
      )} */}

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
            Wallet & Credits
          </h1>
          <p className="text-muted-foreground">
            Manage your verification credits and recharge your wallet
          </p>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-2xl p-8 shadow-lg max-w-2xl">
          <p className="text-white/80 text-sm mb-2">Available Credits</p>
          <h2 className="text-5xl font-bold mb-4">{balance}</h2>
          <p className="text-white/70 text-sm">
            ≈ {(balance * 10).toLocaleString()} INR credit value
          </p>
          <div className="mt-6 pt-6 border-t border-white/20 flex items-center justify-between">
            <div>
              <p className="text-white/70 text-xs">Username </p>
              <p className="text-lg font-semibold">{user.name}</p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-xs">Mail ID</p>
              <p className="text-lg font-semibold">{user.email || "Not provided"}</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-900 p-4 rounded-xl flex items-center gap-3 animate-slide-up max-w-2xl">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="font-medium">Recharge Successful!</p>
              <p className="text-sm">Your wallet has been updated.</p>
            </div>
          </div>
        )}

        {/* Quick Recharge Section */}
        <div className="mt-8">
          <h3 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
            Buy Credits 
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
            {rechargeOptions.map((option) => (
              <div
                key={option.name}
                className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-border hover:shadow-xl transition-all hover:scale-105"
              >
                {/* Blue top border */}
                <div className="h-3 bg-primary"></div>
                
                {/* Card content */}
                <div className="p-8 text-center">
                  <h4 className="text-2xl font-semibold text-muted-foreground mb-6">
                    {option.name}
                  </h4>
                  
                  <div className="mb-6">
                    <p className="text-5xl font-bold text-[#DDB33A]">
                      {option.price}
                    </p>
                  </div>
                  
                  {/* <div className="flex items-center justify-center gap-2 mb-8 text-muted-foreground">
                    <Coins className="w-5 h-5" />
                    <span className="text-xl font-medium">{option.credits} Credits</span>
                  </div> */}
                  
                  <Button
                    onClick={() => handleQuickRecharge(option.credits, option.price)}
                    disabled={isProcessing}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 text-lg"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center mb-2">
            *Purchased credits have lifetime validity 
          </p>
          <p className="text-sm text-muted-foreground text-center mb-2">
            *prices inclusive of 18% GST
          </p>
          
        </div>

        {/* Transaction History */}
        <div className="mt-8 bg-white border border-border rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
            Transaction History
          </h3>

          <div className="space-y-4">
            {transactions.filter(transaction => transaction.type === "credit").map((transaction) => (
              <div
                key={transaction.id}
                className="border border-border rounded-lg p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === "credit"
                          ? "bg-secondary/10"
                          : "bg-muted"
                      }`}
                    >
                      {transaction.type === "credit" ? (
                        <ArrowDownLeft className="w-5 h-5 text-secondary" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transaction.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold text-lg ${
                        transaction.type === "credit"
                          ? "text-secondary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {transaction.type === "credit" ? "+" : "-"}
                      {transaction.amount}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Balance: {transaction.balanceAfter}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
