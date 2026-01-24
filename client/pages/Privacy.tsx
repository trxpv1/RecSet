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
              PRIVACY POLICY
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
              <p>Effective Date: January 1, 2026</p>
              <p>Last Updated: January 1, 2026</p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              This Privacy Policy describes how RecordSetu ("Company", "we", "us", or "our") collects, uses, stores, shares, and protects information when you access or use our platform, websites, dashboards, APIs, or related services (collectively, the "Services").
            </p>
            <p className="text-muted-foreground font-semibold">
              By using the Services, you consent to the practices described in this Privacy Policy.
            </p>
          </div>

          {/* Content */}
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                1. Purpose & Scope
              </h2>
              <p className="text-muted-foreground mb-3">
                RecordSetu is a restricted-access investigative and intelligence platform.
              </p>
              <p className="text-muted-foreground mb-3">
                This Privacy Policy applies to all Users, including individuals accessing the Platform through an organization, agency, or enterprise authorization.
              </p>
              <p className="text-muted-foreground mb-3">We are committed to processing only the minimum personal data necessary for:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Secure access</li>
                <li>Audit accountability</li>
                <li>Legal and compliance obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                2. Information We Collect
              </h2>
              
              <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">A. Information You Provide Voluntarily</h3>
              <p className="text-muted-foreground mb-2">Depending on onboarding and authorization requirements, we may collect:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Full name</li>
                <li>Official email address</li>
                <li>Mobile number</li>
                <li>Username and password</li>
                <li>Organizational / agency affiliation</li>
                <li>Identity proof solely for verification purposes</li>
              </ul>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-900 font-semibold">
                  Important:
                </p>
                <p className="text-sm text-blue-800 mt-2">
                  Identity proof documents are used only for verification and are deleted once the account is activated. We do not retain copies for any other purpose.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2 mt-6">B. Information Collected Automatically</h3>
              <p className="text-muted-foreground mb-2">When you use the Platform, we may collect limited technical metadata, including:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Login timestamps</li>
                <li>IP address</li>
                <li>Device type and browser</li>
                <li>Operating system</li>
                <li>Session identifiers</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                This information is used strictly for security monitoring, fraud detection, and system integrity.
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-2 mt-6">C. Audit & Usage Logs</h3>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Hashed user identifiers</li>
                <li>Hashed search references</li>
                <li>Timestamp and module accessed</li>
                <li>Credit consumption records</li>
              </ul>
              <p className="text-muted-foreground mt-3 font-semibold">
                We do not permanently store search results or intelligence outputs.
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-2 mt-6">D. Payment Information</h3>
              <p className="text-muted-foreground">
                RecordSetu does not collect or store payment card or banking details.
              </p>
              <p className="text-muted-foreground mt-2">
                Payments are processed by third-party payment processors (Razorpay), who operate under their own privacy policies.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                3. Lawful Basis for Processing
              </h2>
              <p className="text-muted-foreground mb-3">We process personal data under one or more of the following lawful bases:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Consent obtained during account creation and use</li>
                <li>Legitimate interest for security, fraud prevention, and audit</li>
                <li>Compliance with legal obligations under Indian law</li>
                <li>Performance of authorized investigative, compliance, or due-diligence functions</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                4. How We Use Your Information
              </h2>
              <p className="text-muted-foreground mb-3">We use the collected information for the following purposes:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>User authentication and access control</li>
                <li>Account administration and support</li>
                <li>Security monitoring and abuse prevention</li>
                <li>Audit logging and compliance verification</li>
                <li>Platform performance and reliability improvement</li>
                <li>Communication regarding service updates, policy changes, or support issues</li>
              </ul>
              <p className="text-muted-foreground mt-3 font-semibold">
                We do not use personal data for advertising, profiling, or behavioral tracking.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                5. Data Retention
              </h2>
              <p className="text-muted-foreground mb-3">We retain information only for as long as necessary:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Identity and account data: retained during the account lifecycle</li>
                <li>Audit hash logs: retained for up to 3 years or as required by law</li>
                <li>Access metadata: retained up to 12 months</li>
                <li>Search results: not stored (zero-day retention)</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                When retention is no longer required, data is securely deleted or anonymized.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                6. Data Security Measures
              </h2>
              <p className="text-muted-foreground mb-3">RecordSetu implements industry-standard and advanced security controls, including:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>AES-256 encryption at rest</li>
                <li>TLS 1.3 encryption in transit</li>
                <li>Role-based access control (RBAC)</li>
                <li>Multi-factor authentication (MFA)</li>
                <li>Device binding and IP restrictions</li>
                <li>Tamper-evident hashed audit logs</li>
                <li>Periodic vulnerability assessments and penetration testing</li>
              </ul>
              <p className="text-muted-foreground mt-3 italic">
                Despite best efforts, no system can be guaranteed to be 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                7. Data Sharing & Disclosure
              </h2>
              <p className="text-muted-foreground mb-3 font-semibold">
                RecordSetu does not sell or commercially share personal data.
              </p>
              <p className="text-muted-foreground mb-2">Information may be disclosed only:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>To government authorities upon lawful request</li>
                <li>Pursuant to judicial or statutory orders</li>
                <li>For internal audit, security, or compliance purposes</li>
                <li>In connection with a merger, acquisition, or asset transfer (with notice)</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Any sharing is limited to the minimum necessary.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                8. Cookies & Tracking
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Only essential cookies are used for session management and authentication</li>
                <li>No marketing, advertising, or third-party tracking cookies are used</li>
                <li>Users may control cookies via browser settings</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                9. User Rights (DPDP Act 2023)
              </h2>
              <p className="text-muted-foreground mb-3">Subject to applicable law and authorization level, Users may have the right to:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Access their account information and login history</li>
                <li>Request correction of inaccurate personal data</li>
                <li>Request deletion or anonymization where legally permissible</li>
                <li>Obtain data portability in a structured format</li>
                <li>Withdraw consent where applicable</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Requests may be subject to identity verification and legal limitations.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                10. Data Breach Response
              </h2>
              <p className="text-muted-foreground mb-3">In the event of a data security incident:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Containment actions will be initiated promptly</li>
                <li>Impacted users or organizations will be notified as required</li>
                <li>Regulatory authorities (including CERT-In) will be informed where applicable</li>
                <li>Remedial and preventive measures will be implemented</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                11. Children's Privacy
              </h2>
              <p className="text-muted-foreground">
                The Platform is not intended for individuals under 18 years of age.
              </p>
              <p className="text-muted-foreground mt-2">
                We do not knowingly collect data from minors. Any such data identified will be promptly deleted.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                12. Account Management & Deletion
              </h2>
              <p className="text-muted-foreground mb-3">
                Users may request account review, correction, or termination by contacting us.
              </p>
              <p className="text-muted-foreground mb-2">Upon termination:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Active account data will be deleted or anonymized</li>
                <li>Certain audit or compliance records may be retained as legally required</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                13. Changes to This Privacy Policy
              </h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy periodically.
              </p>
              <p className="text-muted-foreground mt-2">
                Material changes will be notified via the Platform or official communication. Continued use constitutes acceptance.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                14. Contact Information
              </h2>
              <p className="text-muted-foreground mb-3">For privacy or data protection inquiries, contact:</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="space-y-2">
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">Data Protection Officer</span>
                  </p>
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">Email:</span> privacy@recordsetu.com
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                © 2026 RecordSetu · Privacy Policy · Terms of Service · Refund Policy
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}