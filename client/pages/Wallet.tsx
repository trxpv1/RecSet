import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { verifyPayment, getAuthToken, createOrder, getUserTransactions, type Transaction as APITransaction, type TransactionsResponse } from "@/lib/apiClient";
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
  status?: string;
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
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [transactionsPage, setTransactionsPage] = useState(1);
  const [transactionsTotalPages, setTransactionsTotalPages] = useState(1);

  const fetchTransactions = async (forceRefresh = false) => {
    // Check cache first (unless force refresh)
    if (!forceRefresh) {
      const cachedData = sessionStorage.getItem('wallet_transactions');
      if (cachedData) {
        try {
          const parsed = JSON.parse(cachedData);
          const cacheAge = Date.now() - parsed.timestamp;
          // Use cache if less than 5 minutes old
          if (cacheAge < 5 * 60 * 1000) {
            setTransactions(parsed.data);
            setTransactionsTotalPages(parsed.totalPages);
            return;
          }
        } catch (e) {
          console.error('Failed to parse cached transactions:', e);
        }
      }
    }

    setTransactionsLoading(true);
    try {
      const response: TransactionsResponse = await getUserTransactions(transactionsPage, 20);
      // Map API transactions to local Transaction type
      const mappedTransactions: Transaction[] = response.transactions.map((apiTxn: APITransaction) => ({
        id: apiTxn.order_id,
        type: "credit" as const,
        amount: apiTxn.credits,
        description: `${apiTxn.status === 'completed' ? 'Payment Completed' : 'Payment Attempted'} - ${apiTxn.credits} Credits`,
        timestamp: apiTxn.timestamp,
        balanceAfter: 0, // Not provided by API
        status: apiTxn.status,
      }));
      setTransactions(mappedTransactions);
      const totalTransactions = response.transactions.length;
      const totalPages = totalTransactions > 0 ? Math.ceil(totalTransactions / 20) : 1;
      setTransactionsTotalPages(totalPages);
      
      // Cache the data
      sessionStorage.setItem('wallet_transactions', JSON.stringify({
        data: mappedTransactions,
        totalPages,
        timestamp: Date.now()
      }));
    } catch (error: any) {
      console.error('Failed to fetch transactions:', error);
      // Don't show dummy data - keep transactions empty if API fails
      setTransactions([]);
    } finally {
      setTransactionsLoading(false);
    }
  };

  // Fetch transactions from API
  useEffect(() => {
    if (isAuthenticated) {
      fetchTransactions();
    }
  }, [isAuthenticated, transactionsPage]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Map auth user to local user state
    if (authUser) {
      const fullName = authUser.first_name && authUser.last_name 
        ? `${authUser.first_name} ${authUser.last_name}`.trim()
        : authUser.first_name || authUser.username || authUser.email.split('@')[0];
      
      setUser({
        name: fullName,
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

      const amount = parseInt(price.replace('₹', '').replace(',', ''));
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

      const idempotencyKey = generateUUID();
      console.log('🔑 Idempotency Key:', idempotencyKey);
      
      let orderData;
      try {
        orderData = await createOrder({ 
          amount,
          idempotency_key: idempotencyKey 
        });
        console.log('✅ Order created:', orderData);
        
        if (!orderData.order_id || !orderData.razorpay_key_id) {
          console.error('❌ Invalid order response:', orderData);
          throw new Error('Invalid order data received from server');
        }
      } catch (orderError: any) {
        console.error('❌ Order creation failed:', orderError);
        
        toast({
          title: "Payment System Error",
          description: orderError.message || "Failed to create order. Please try again.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      const options = {
        key: orderData.razorpay_key_id,
        amount: orderData.amount * 100,
        currency: orderData.currency || 'INR',
        order_id: orderData.order_id,
        name: 'RecordSetu',
        description: `${credits} Credits Recharge`,
        image: '/logo.svg',
        handler: async (response: any) => {
          try {
            console.log('💳 Razorpay Payment Response:', response);
            
            const verifyData = await verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              amount: amount,
              token: authToken,
            });

            setBalance(verifyData.new_balance);
            await fetchTransactions(true);

            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
            
            if (authUser) {
              updateUser({ ...authUser, credits: verifyData.new_balance });
            }

            toast({
              title: "Payment Successful!",
              description: `${verifyData.credits_added} credits added to your wallet`,
            });
          } catch (error: any) {
            console.error('❌ Payment verification failed:', error);
            
            toast({
              title: "Payment Verification Failed",
              description: error.message || "Failed to verify payment. Please contact support.",
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

      // @ts-ignore
      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', (response: any) => {
        console.error('❌ Razorpay Payment Failed:', response.error);
        
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
      
      toast({
        title: "Error",
        description: error.message || "Failed to initiate payment",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const handleCustomRecharge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rechargeAmount || parseInt(rechargeAmount) < 10) {
      toast({
        title: "Invalid Amount",
        description: "Minimum recharge amount is ₹10",
        variant: "destructive",
      });
      return;
    }

    // Use the same Razorpay flow as quick recharge
    const amount = parseInt(rechargeAmount);
    await handleQuickRecharge(amount, `₹${amount}`);
    setRechargeAmount("");
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-primary hover:text-primary/80 text-sm font-medium mb-6 transition"
        >
          ← Back to Dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
            Wallet & Credits
          </h1>
          <p className="text-muted-foreground">
            Manage your verification credits and recharge your wallet
          </p>
        </div>

        <div className="grid md:grid-cols-[1.5fr_1fr] gap-6">
          <div className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-2xl p-8 shadow-lg">
            <p className="text-white/80 text-sm mb-2">Available Credits</p>
            <h2 className="text-5xl font-bold mb-4">{balance}</h2>
            <p className="text-white/70 text-sm">
              = Rs.{(balance).toLocaleString()}  credit value
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

          <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl p-8 shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4">Bulk Orders</h3>
              <p className="text-white/90 text-lg mb-6">
                To get the credits in bulk
              </p>
            </div>
            <Button
              onClick={() => navigate("/contact")}
              className="w-full bg-white text-amber-600 hover:bg-white/90 font-semibold py-6 text-lg shadow-md"
            >
              Contact Us
            </Button>
          </div>
        </div>

        {showSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-900 p-4 rounded-xl flex items-center gap-3 animate-slide-up max-w-2xl">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="font-medium">Recharge Successful!</p>
              <p className="text-sm">Your wallet has been updated.</p>
            </div>
          </div>
        )}

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
                <div className="h-3 bg-primary"></div>
                
                <div className="p-8 text-center">
                  <h4 className="text-2xl font-semibold text-muted-foreground mb-6">
                    {option.name}
                  </h4>
                  
                  <div className="mb-6">
                    <p className="text-5xl font-bold text-[#DDB33A]">
                      {option.price}
                    </p>
                  </div>
                  
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

        <div className="mt-8 bg-white border border-border rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
            Transaction History
          </h3>

          {transactionsLoading ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading transactions...</p>
            </div>
          ) : transactions.length > 0 ? (
            <>
              <div className="space-y-4">
                {transactions.filter(transaction => transaction.type === "credit").map((transaction) => {
                  const isPending = transaction.status === 'pending';
                  return (
                  <div
                    key={transaction.id}
                    className={`border border-border rounded-lg p-4 hover:bg-slate-50 transition-colors ${
                      isPending ? 'opacity-50' : ''
                    }`}
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
                        {!isPending && (
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
                        )}
                        {transaction.balanceAfter > 0 && (
                          <p className="text-xs text-muted-foreground">
                            Balance: {transaction.balanceAfter}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>

              {transactionsTotalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                  <Button
                    onClick={() => setTransactionsPage(prev => Math.max(1, prev - 1))}
                    disabled={transactionsPage === 1}
                    variant="outline"
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {transactionsPage} of {transactionsTotalPages}
                  </span>
                  <Button
                    onClick={() => setTransactionsPage(prev => Math.min(transactionsTotalPages, prev + 1))}
                    disabled={transactionsPage === transactionsTotalPages}
                    variant="outline"
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <Coins className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No transactions found</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Your payment transactions will appear here
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-background mt-8">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>© 2024 CyberShastra. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="https://docs.cybershastra.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                Documentation
              </a>
              <a href="/contact" className="hover:text-foreground transition-colors">
                Support
              </a>
            </div>
            <div className="text-muted-foreground">
              Version 2.4.1
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
