import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
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

        <article className="bg-white rounded-xl border border-border p-8 sm:p-12 space-y-8">
          {/* Header */}
          <div className="space-y-4 border-b border-border pb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground">
              Privacy Policy
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
              <p>Effective Date: January 1, 2024</p>
              <p>Last Updated: January 1, 2024</p>
            </div>
          </div>

          {/* Content */}
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                1. Purpose
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                This Privacy Policy describes how RecordSetu processes limited Personal Information required for platform access and audit accountability. We are committed to protecting your privacy and ensuring you have a positive experience on our platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                2. Data We Collect
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li><span className="font-semibold text-foreground">Identity data:</span> Name, official email, mobile, agency ID proof</li>
                <li><span className="font-semibold text-foreground">Access metadata:</span> Login timestamp, IP address, device information</li>
                <li><span className="font-semibold text-foreground">Audit logs:</span> Only hashed search identifiers, not search results</li>
                <li><span className="font-semibold text-foreground">Billing & invoices:</span> If applicable to your agency</li>
              </ul>
              <p className="text-muted-foreground mt-3 font-semibold">
                Important: We do not permanently store search results.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                3. Lawful Basis of Processing
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Performance of public duty and national security investigation support</li>
                <li>Legitimate interest of authorized LEAs and government agencies</li>
                <li>Consent through agency agreement and user acknowledgment</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                4. How We Use Your Data
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li><span className="font-semibold text-foreground">Identity data:</span> Used for authentication, audit and secure access</li>
                <li><span className="font-semibold text-foreground">Audit hash logs:</span> Used for legal accountability and internal compliance</li>
                <li><span className="font-semibold text-foreground">Access metadata:</span> Used for security monitoring and fraud prevention</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                5. Data Retention
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li><span className="font-semibold text-foreground">Identity and hashed logs:</span> Retained minimum 3 years as per compliance standards</li>
                <li><span className="font-semibold text-foreground">Search results:</span> Stored zero days (no permanent storage)</li>
                <li><span className="font-semibold text-foreground">Access metadata:</span> Retained for 1 year for security audit purposes</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                6. Data Security Measures
              </h2>
              <p className="text-muted-foreground mb-3">RecordSetu implements industry-leading security practices:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>AES-256 encryption at rest</li>
                <li>TLS 1.3 encryption in transit</li>
                <li>Role-based access control (RBAC)</li>
                <li>Multi-factor authentication (MFA)</li>
                <li>IP limits and device binding</li>
                <li>Hash-chain audit ledger for tamper detection</li>
                <li>Periodic vulnerability assessment and penetration testing (VAPT)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                7. Data Sharing
              </h2>
              <p className="text-muted-foreground mb-3">
                RecordSetu does not commercially share or sell any personal data. Data is only disclosed to:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Government authorities upon lawful request</li>
                <li>Judicial orders or legal compulsion</li>
                <li>Internal audit and compliance teams</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                8. Cookies & Tracking
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Minimal cookies strictly for authentication session control</li>
                <li>No marketing or ad-tracking cookies are used</li>
                <li>Users can manage cookie preferences in their browser settings</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                9. User Rights
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Right to access your login history and account activity</li>
                <li>Right to request correction of onboarding identity data</li>
                <li>Right to log export for compliance (if authorized role)</li>
                <li>Right to data portability in structured format</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                10. Data Breach Policy
              </h2>
              <p className="text-muted-foreground mb-3">In case of a data breach:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Containment within 24 hours</li>
                <li>Notification to impacted agency and CERT-In</li>
                <li>Corrective and preventive report within 72 hours</li>
                <li>Transparent communication about the incident and mitigation measures</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-blue-900 mb-2">Contact Information</h3>
              <p className="text-sm text-blue-800">
                For privacy-related questions or concerns, please contact our Data Protection Officer at privacy@recordsetu.com
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
