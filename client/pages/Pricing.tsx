import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";

export default function Pricing() {
  const creditTiers = [
    
    {
      name: "Standard",
      credits: 299,
      price: "Standard-tier",
      description: "For regular departmental usage"
    },
    {
      name: "Professional",
      credits: 499,
      price: "Professional-tier",
      description: "For large-scale investigations"
    },
    {
      name: "Enterprise",
      credits: 999,
      price: "Enterprise-tier",
      description: "For multi-agency deployments"
    }
  ];

  const paymentMethods = [
    "UPI / Net banking",
    "RTGS / NEFT transfers",
    "Government challan verification",
    "Automated digital invoicing"
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header variant="app" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link to="/">
          <button className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium mb-8 transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </Link>

        <article className="space-y-12">
          {/* Header Section */}
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-heading font-bold text-foreground">
              Simple, Pay-Per-Use Pricing
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              RecordSetu operates on a prepaid wallet system. Purchase credits and use them for searches. No hidden fees or minimum commitments.
            </p>
          </div>

          {/* Pricing Tiers */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center max-w-4xl mx-auto">
            {creditTiers.map((tier, index) => (
              <div key={index} className="bg-white rounded-xl border border-border p-6 space-y-4 hover:shadow-lg transition w-full max-w-xs">
                <div>
                  <h3 className="text-xl font-heading font-bold text-foreground">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {tier.description}
                  </p>
                </div>

                <div className="border-t border-border pt-4 text-center">
                  <div className="text-3xl font-heading font-bold text-primary">
                    {tier.credits.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    credits
                  </p>
                </div>

                <Link to="/contact" className="block">
                  <Button className="w-full bg-blue-100 text-primary hover:bg-primary hover:text-white hover:shadow-lg transition-all duration-200" variant="ghost">
                    Get Started
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-xl border border-border p-8 sm:p-12 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                How Credit System Works
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-primary font-semibold text-sm flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Purchase Credits</h3>
                    <p className="text-sm text-muted-foreground mt-1">Select a credit tier and complete payment through approved channels</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-primary font-semibold text-sm flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Activate Wallet</h3>
                    <p className="text-sm text-muted-foreground mt-1">Credits are immediately added to your agency wallet</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-primary font-semibold text-sm flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Perform Searches</h3>
                    <p className="text-sm text-muted-foreground mt-1">Each search consumes credits based on dataset type and complexity</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-primary font-semibold text-sm flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Real-Time Balance</h3>
                    <p className="text-sm text-muted-foreground mt-1">Monitor your wallet balance and usage in real-time through the dashboard</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-t border-border pt-8 space-y-4">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Credit Validity
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Credits purchased are valid for lifetime from the date of activation.
              </p>
            </section>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-xl border border-border p-8 sm:p-12 space-y-6">
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Payment Methods
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-muted-foreground">{method}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground border-t border-border pt-6">
              Digital invoicing is automatically generated for all transactions. Government and institutional invoicing is supported. Contact our billing team for custom payment arrangements.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl border border-border p-8 sm:p-12 space-y-6">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Can credits be transferred between agencies?</h3>
                <p className="text-muted-foreground text-sm">No. Credits are non-transferable and locked to the agency account that purchased them.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">What happens if I run out of credits?</h3>
                <p className="text-muted-foreground text-sm">Your agency can purchase additional credits anytime. The purchase process is quick and credits are activated immediately upon payment confirmation.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Is there a refund policy?</h3>
                <p className="text-muted-foreground text-sm">Credits are non-refundable after activation. Refunds are issued only for duplicate payments or technical failures. See our Refund Policy for complete details.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">How much do individual searches cost?</h3>
                <p className="text-muted-foreground text-sm">Credit cost varies by dataset and search type. Simple identity verification may cost 1-2 credits, while complex corporate or financial lookups may cost 3-5 credits. Your dashboard shows exact costs before each search.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl border border-primary/20 p-8 text-center space-y-4">
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Contact our team to set up your agency account and purchase your first credit package.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg">Request Access</Button>
              </Link>
              {/* <Link to="/pilot">
                <Button size="lg" variant="outline">Try Pilot Program</Button>
              </Link> */}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
