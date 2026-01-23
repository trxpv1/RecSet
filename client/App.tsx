import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import Admin from "./pages/Admin";
import Health from "./pages/Health";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Refund from "./pages/Refund";
import Eula from "./pages/Eula";
import About from "./pages/About";
import Features from "./pages/Features";
import Datasets from "./pages/Datasets";
import Security from "./pages/Security";
import Pricing from "./pages/Pricing";
import Pilot from "./pages/Pilot";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const AppContent = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/wallet" element={<Wallet />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/health" element={<Health />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/refund" element={<Refund />} />
    <Route path="/eula" element={<Eula />} />
    <Route path="/about" element={<About />} />
    <Route path="/features" element={<Features />} />
    <Route path="/datasets" element={<Datasets />} />
    <Route path="/security" element={<Security />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/pilot" element={<Pilot />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/profile" element={<Profile />} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
