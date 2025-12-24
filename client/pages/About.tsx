import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Users, CheckCircle } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header variant="app" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              About RecordSetu
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A secure government-grade records verification and analysis system designed for authorised agencies.
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-xl border border-border p-8 sm:p-12 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Our Platform
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                RecordSetu enables investigators to verify PAN, GST, Telecom identifiers, Corporate registry data, and other statutory datasets with complete accountability and zero data retention. The platform is engineered with compliance-first principles, role-based access control, multi-factor authentication, and immutable audit ledger mechanisms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Built by Team RecordSetu.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                RecordSetu is developed and maintained by Team RecordSetu., a specialized firm focused on secure government and investigative technology infrastructure. Our team brings expertise in compliance-first design, cryptographic integrity verification, and government-grade security architecture.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Enable agencies to verify records securely, responsibly and efficiently while maintaining full legal and procedural integrity.
              </p>
            </section>

            {/* Access Model Section */}
            <section className="space-y-6 border-t border-border pt-8">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Access Model
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Restricted Access</h3>
                    <p className="text-muted-foreground">
                      Exclusive access for verified government agencies and law enforcement only.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Not for Public Users</h3>
                    <p className="text-muted-foreground">
                      The platform is intentionally closed to general public access to maintain security and compliance standards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Verified Agencies</h3>
                    <p className="text-muted-foreground">
                      Onboarding requires identity verification, organizational credentials, and authorization from government authorities.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Core Principles */}
            <section className="space-y-6 border-t border-border pt-8">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Core Principles
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
                  <h3 className="font-semibold text-foreground mb-2">Compliance First</h3>
                  <p className="text-sm text-muted-foreground">
                    Built with DPDP, IT Act 2000, and government compliance standards at the foundation.
                  </p>
                </div>

                <div className="bg-secondary/5 rounded-lg p-6 border border-secondary/10">
                  <h3 className="font-semibold text-foreground mb-2">Zero Data Retention</h3>
                  <p className="text-sm text-muted-foreground">
                    Search results are never stored. Only immutable hash-based audit logs are maintained.
                  </p>
                </div>

                <div className="bg-accent/5 rounded-lg p-6 border border-accent/10">
                  <h3 className="font-semibold text-foreground mb-2">Tamper-Proof Auditing</h3>
                  <p className="text-sm text-muted-foreground">
                    Immutable audit chain with cryptographic hash integrity for complete accountability.
                  </p>
                </div>

                <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                  <h3 className="font-semibold text-amber-900 mb-2">Role-Based Access</h3>
                  <p className="text-sm text-amber-800">
                    Super Admin, Agency Admin, Investigator, and Auditor roles with principle of least privilege.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl border border-primary/20 p-8 text-center space-y-4">
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Ready to Access RecordSetu?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Contact us to learn more about access requirements and onboarding for your authorized agency.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">Request Access</Button>
              </Link>
              <Link to="/pilot">
                <Button size="lg" variant="outline">Pilot Program</Button>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
