import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, Wallet, Lock, Users, BarChart3, CheckCircle } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Search,
      title: "Secure Search Engine",
      description: "Authorised access to real-time dataset queries. Justification and Case-ID mandatory for each search.",
      color: "primary"
    },
    {
      icon: Wallet,
      title: "Wallet-Based Credit System",
      description: "Rechargeable credit wallet. Pay only for the searches performed. No hidden fees or minimum commitments.",
      color: "secondary"
    },
    {
      icon: Lock,
      title: "Immutable Audit Chain",
      description: "Searches not stored. Logs stored as hash ledger entries for integrity compliance and tamper-proof accountability.",
      color: "accent"
    },
    {
      icon: Users,
      title: "Role-Based Access Control",
      description: "Super Admin, Agency Admin, Investigator, and Auditor roles with principle of least privilege access.",
      color: "primary"
    },
    {
      icon: BarChart3,
      title: "Comprehensive Admin Panel",
      description: "User administration, credit management, usage reports, and health monitoring through centralized dashboard.",
      color: "secondary"
    },
    {
      icon: CheckCircle,
      title: "DPDP-Aligned Governance",
      description: "Consent and purpose limitation enforcement, breach response SOP, and least-privilege architecture compliance.",
      color: "accent"
    }
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
          <div className="space-y-4">
            <h1 className="text-4xl font-heading font-bold text-foreground">
              Core Features
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              RecordSetu is built with government-grade security, compliance, and accountability at every layer.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colorClasses = {
                primary: "bg-primary/10 border-primary/20 text-primary",
                secondary: "bg-secondary/10 border-secondary/20 text-secondary",
                accent: "bg-accent/10 border-accent/20 text-accent"
              };
              const classes = colorClasses[feature.color as keyof typeof colorClasses];

              return (
                <div key={index} className="bg-white rounded-xl border border-border p-8 space-y-4 hover:shadow-lg transition">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${classes}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Technical Highlights */}
          <div className="bg-white rounded-xl border border-border p-8 sm:p-12 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Technical Architecture
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                RecordSetu combines advanced cryptography, distributed ledger principles, and zero-knowledge architecture to provide verification capabilities without storing sensitive data. Each search is cryptographically signed and timestamped in an immutable audit ledger.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Admin Dashboard Capabilities
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  User and role management with audit trails
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  Credit wallet management and recharge functionality
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  Comprehensive usage analytics and reporting
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  Real-time system health monitoring and alerts
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  Immutable audit log export and compliance reports
                </li>
              </ul>
            </section>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl border border-primary/20 p-8 text-center space-y-4">
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Experience RecordSetu Features
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Schedule a demonstration to see how RecordSetu can streamline your agency's record verification process.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">Request Demo</Button>
              </Link>
              <Link to="/pilot">
                <Button size="lg" variant="outline">Join Pilot Program</Button>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
