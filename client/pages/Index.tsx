import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Shield,
  Zap,
  BarChart3,
  Lock,
  Users,
  ArrowRight,
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header variant="landing" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Background gradient */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-60" />
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-4 pb-4">
                <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground leading-tight pb-3">
                  Instant
                   verified
                  <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent pb-2">
                     investigations
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg pb-2">
A unified investigation suite for Law Enforcement Agencies.                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto gap-2 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    Access Portal <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Request Access
                  </Button>
                </Link>
              </div>

              {/* <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Shield className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>Bank-level security for all government record access</span>
              </div> */}
            </div>

            {/* Hero Image */}
            <div className="hidden md:block relative h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-2xl" />
              <div className="relative bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl border border-border p-8 h-full flex items-center justify-center">
                <div className="space-y-4 w-full">
                  <div className="h-3 bg-primary/20 rounded-full w-3/4" />
                  <div className="h-3 bg-secondary/20 rounded-full w-1/2" />
                  <div className="pt-4 space-y-3">
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-primary rounded-lg" />
                      <div className="flex-1">
                        <div className="h-2 bg-border rounded w-3/4" />
                        <div className="h-2 bg-border rounded w-1/2 mt-1" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-secondary rounded-lg" />
                      <div className="flex-1">
                        <div className="h-2 bg-border rounded w-2/3" />
                        <div className="h-2 bg-border rounded w-1/3 mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-primary/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
              Powerful Features for Investigators  
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to verify government records and manage your
              verification credits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white border border-border rounded-xl p-8 hover:shadow-lg transition-shadow hover:border-primary/20">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                Secure Verification
              </h3>
              <p className="text-muted-foreground">
                Receive verification outputs within seconds through optimized, investigation-ready workflows—without manual delays.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-border rounded-xl p-8 hover:shadow-lg transition-shadow hover:border-secondary/20">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                Instant Results
              </h3>
              <p className="text-muted-foreground">
                Get verification results in seconds. Real-time government record
                lookup with zero delays
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-border rounded-xl p-8 hover:shadow-lg transition-shadow hover:border-accent/20">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                Credit Management
              </h3>
              <p className="text-muted-foreground">
                Wallet-based credit system. Recharge anytime and track your
                usage with detailed analytics
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white border border-border rounded-xl p-8 hover:shadow-lg transition-shadow hover:border-primary/20">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                Compliance Ready
              </h3>
              <p className="text-muted-foreground">
                Meet all government compliance requirements with audit logs and
                detailed record history
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white border border-border rounded-xl p-8 hover:shadow-lg transition-shadow hover:border-secondary/20">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                Multi-User Support
              </h3>
              <p className="text-muted-foreground">
                Manage teams with role-based access control. Admin panel for
                user onboarding and management
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white border border-border rounded-xl p-8 hover:shadow-lg transition-shadow hover:border-accent/20">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                24/7 Support
              </h3>
              <p className="text-muted-foreground">
                Dedicated support team ready to help. Fast response times for
                all inquiries
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Carousel Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-primary/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground text-center mb-16">
            Trusted by Investigators From
          </h2>

          {/* Horizontal Scrolling Carousel */}
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex justify-center gap-8 pb-4 min-w-min">
                {/* Client 1 - Telangana Police */}
                <div className="flex-shrink-0 w-44 h-44 bg-white rounded-xl border border-gray-200 flex items-center justify-center hover:shadow-lg transition-shadow p-4">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F947f2237632a43429310ba11a6143374%2Ffcfbc341fe594b34b2d0e5471140aef6?format=webp&width=800&height=1200"
                    alt="Telangana Police"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Client 2 - AP Police */}
                <div className="flex-shrink-0 w-44 h-44 bg-white rounded-xl border border-gray-200 flex items-center justify-center hover:shadow-lg transition-shadow p-4">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F947f2237632a43429310ba11a6143374%2Fdc6661867f554c05a34f378b70d1cf39?format=webp&width=800&height=1200"
                    alt="AP Police"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Client 3 - Delhi Police */}
                <div className="flex-shrink-0 w-44 h-44 bg-white rounded-xl border border-gray-200 flex items-center justify-center hover:shadow-lg transition-shadow p-4">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F947f2237632a43429310ba11a6143374%2F6047b665c13541af96b07cd9a12f1cec?format=webp&width=800&height=1200"
                    alt="Delhi Police"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Client 4 - Maharashtra Police */}
                <div className="flex-shrink-0 w-44 h-44 bg-white rounded-xl border border-gray-200 flex items-center justify-center hover:shadow-lg transition-shadow p-4">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F947f2237632a43429310ba11a6143374%2F811860ea6d0c47048ba8f72929ba2165?format=webp&width=800&height=1200"
                    alt="Maharashtra Police"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Client 5 - Madhya Pradesh Police */}
                <div className="flex-shrink-0 w-44 h-44 bg-white rounded-xl border border-gray-200 flex items-center justify-center hover:shadow-lg transition-shadow p-4">
                  <img
                    src="/mp-police.png"
                    alt="Madhya Pradesh Police"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Client 6 - Uttar Pradesh Police */}
                <div className="flex-shrink-0 w-44 h-44 bg-white rounded-xl border border-gray-200 flex items-center justify-center hover:shadow-lg transition-shadow p-4">
                  <img
                    src="/up-police.png"
                    alt="Uttar Pradesh Police"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
              Ready to streamline your investigations ?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join hundreds of investigators trusting Recordsetu for secure government
              record verification
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button
                size="lg"
                className="gap-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                Access Portal <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline">
                Request Access
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <img src="/logo.svg" alt="Recordsetu" className="h-8 w-auto" />
              </div>
              <p className="text-sm text-muted-foreground">
                    One platform for verified investigations              </p>
            </div>

            {/* <div>
              <h4 className="font-heading font-bold text-sm mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/features" className="hover:text-primary transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-primary transition">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/security" className="hover:text-primary transition">
                    Security
                  </Link>
                </li>
              </ul>
            </div> */}

            <div>
              <h4 className="font-heading font-bold text-sm mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/about" className="hover:text-primary transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-primary transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-sm mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/privacy" className="hover:text-primary transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-primary transition">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link to="/refund" className="hover:text-primary transition">
                    Refund Policy
                  </Link>
                </li>
                {/* <li>
                  <Link to="/eula" className="hover:text-primary transition">
                    EULA
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2026 Recordsetu. All rights reserved.</p>
            <p>A unified investigation suite for Investigation units</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
