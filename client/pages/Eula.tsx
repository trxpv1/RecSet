import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { ArrowLeft } from "lucide-react";

export default function Eula() {
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
              End User License Agreement (EULA)
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
              <p>Last Updated: December 24, 2025</p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              This End User License Agreement ("Agreement" or "EULA") is a legally binding contract between RecordSetu ("Company", "we", "us", "our") and the individual or entity accessing or using the RecordSetu platform ("User", "you", "your").
            </p>
            <p className="text-muted-foreground font-semibold">
              By clicking "I Agree", creating an account, or using the Platform, you confirm that you have read, understood, and agreed to this Agreement. If you disagree, you must not access or use the Platform.
            </p>
          </div>

          {/* Content */}
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                1. PLATFORM & LICENSE GRANT
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                RecordSetu offers a secure, restricted-access digital platform for searching, verifying, and analyzing records.
              </p>
              <p className="text-muted-foreground mb-3">
                Subject to your compliance with this Agreement, RecordSetu grants you a <span className="font-semibold">limited, non-exclusive, non-transferable, non-sublicensable, revocable license</span> to access and use the Platform solely for lawful, authorized purposes.
              </p>
              <p className="text-muted-foreground mb-2">This license:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Does not constitute a sale</li>
                <li>Does not grant ownership rights</li>
                <li>May be revoked at any time</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                2. ELIGIBILITY & AUTHORITY
              </h2>
              <p className="text-muted-foreground mb-3">By using the Platform, you represent and warrant that:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>You are legally competent to enter this Agreement</li>
                <li>You are authorised by your organisation or agency</li>
                <li>You have lawful authority, consent, or statutory power to conduct searches</li>
                <li>Your use complies with all applicable Indian laws</li>
              </ul>
              <p className="text-muted-foreground mt-3 font-semibold">
                Unauthorised access or impersonation is strictly prohibited.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                3. DATA PROTECTION & DPDP COMPLIANCE
              </h2>
              
              <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">3.1 Roles Under DPDP Act, 2023</h3>
              <p className="text-muted-foreground mb-2">For the Digital Personal Data Protection Act, 2023 ("DPDP Act"):</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>The User or User's organisation acts as the <span className="font-semibold">Data Fiduciary</span></li>
                <li>RecordSetu acts as a <span className="font-semibold">Data Intermediary / Data Processor</span></li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mb-2 mt-6">3.2 User Obligations Under DPDP Act</h3>
              <p className="text-muted-foreground mb-2">You acknowledge and agree that:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>You are responsible for the lawful purpose limitation</li>
                <li>You must ensure consent or legal authority before searches</li>
                <li>You must not misuse or unlawfully disclose personal data</li>
                <li>You must comply with the DPDP Act obligations applicable to Data Fiduciaries</li>
              </ul>
              <p className="text-muted-foreground mt-3 font-semibold">
                RecordSetu does not validate the legal basis of each search.
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-2 mt-6">3.3 Data Processing by RecordSetu</h3>
              <p className="text-muted-foreground mb-2">RecordSetu may process:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Account identification data</li>
                <li>Authentication and access metadata</li>
                <li>Search metadata (not full datasets)</li>
                <li>Hashed audit logs for compliance</li>
              </ul>
              <p className="text-muted-foreground mt-3 font-semibold">
                RecordSetu does not permanently store raw search result datasets by default.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                4. WALLET-BASED ACCESS & CREDITS
              </h2>
              <p className="text-muted-foreground mb-3">
                RecordSetu operates on a <span className="font-semibold">prepaid wallet credit model only</span>.
              </p>
              <p className="text-muted-foreground mb-2">Credits:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Are purchased in advance</li>
                <li>Are consumed per feature usage</li>
                <li>Do not represent currency or stored value</li>
                <li>Are non-transferable and non-refundable</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Unused credits do not create any vested rights.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                5. PERMITTED USE
              </h2>
              <p className="text-muted-foreground mb-3">You may use the Platform only for:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Lawful investigative or verification purposes</li>
                <li>Authorised internal analysis</li>
                <li>Compliance, due-diligence, or intelligence support</li>
              </ul>
              <p className="text-muted-foreground mt-3 mb-2">All use must align with:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>This EULA</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Applicable laws</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                6. PROHIBITED USE
              </h2>
              <p className="text-muted-foreground mb-3">You shall not:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Use the Platform for personal, commercial, or unlawful purposes</li>
                <li>Misuse of Aadhaar or UIDAI systems</li>
                <li>Resell, sublicense, or share access credentials</li>
                <li>Scrape, copy, or reverse engineer the Platform</li>
                <li>Use outputs to harass, defame, or violate privacy</li>
                <li>Present outputs as certified or court-admissible evidence</li>
              </ul>
              <p className="text-muted-foreground mt-3 font-semibold">
                Violation may result in immediate termination.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                7. SEARCH OUTPUTS & DISCLAIMER
              </h2>
              <p className="text-muted-foreground mb-2">Search results:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Are informational and indicative only</li>
                <li>May originate from public or licensed third-party sources</li>
                <li>Are provided "as is" without warranties</li>
              </ul>
              <p className="text-muted-foreground mt-3 font-semibold">
                RecordSetu does not guarantee accuracy, completeness, or timeliness.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                8. AUDIT LOGGING & MONITORING
              </h2>
              <p className="text-muted-foreground mb-3">You acknowledge that:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>All actions may be logged</li>
                <li>Logs may be hashed or tamper-evident</li>
                <li>Logs may be reviewed for security and compliance</li>
                <li>Logs may be disclosed to lawful authorities if required</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                9. INTELLECTUAL PROPERTY
              </h2>
              <p className="text-muted-foreground">
                All intellectual property in the Platform, including software, UI, APIs, documentation, and branding, remains the exclusive property of RecordSetu.
              </p>
              <p className="text-muted-foreground mt-3">
                No rights are granted except those expressly stated.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                10. SUSPENSION & TERMINATION
              </h2>
              <p className="text-muted-foreground mb-3">RecordSetu may suspend or terminate access:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>For policy or legal violations</li>
                <li>For security or compliance risks</li>
                <li>Without prior notice if required</li>
              </ul>
              <p className="text-muted-foreground mt-3 mb-2">Upon termination:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>The license ends immediately</li>
                <li>Remaining wallet credits are forfeited</li>
                <li>Audit logs may be retained as required by law</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                11. LIMITATION OF LIABILITY
              </h2>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-3">
                <p className="text-sm text-amber-900 font-semibold">
                  To the maximum extent permitted by law:
                </p>
                <p className="text-sm text-amber-800 mt-2">
                  Total liability, if any, shall not exceed the total value of wallet credits remaining in the User's account at the time the claim arises, or ₹10,000, whichever is lower.
                </p>
              </div>
              <p className="text-muted-foreground">
                RecordSetu shall not be liable for indirect, incidental, or consequential damages.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                12. INDEMNIFICATION
              </h2>
              <p className="text-muted-foreground mb-3">
                You agree to indemnify and hold harmless RecordSetu, its directors, employees, and partners from any claims arising from:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Your misuse of the Platform</li>
                <li>Violation of law or DPDP obligations</li>
                <li>Unauthorised searches</li>
                <li>Third-party rights violations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                13. GOVERNING LAW & JURISDICTION
              </h2>
              <p className="text-muted-foreground">
                This Agreement shall be governed by the laws of India. Courts at <span className="font-semibold">India</span> shall have exclusive jurisdiction.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                14. MODIFICATIONS
              </h2>
              <p className="text-muted-foreground">
                RecordSetu may modify this Agreement at any time. Continued use after updates constitutes acceptance.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                15. ENTIRE AGREEMENT
              </h2>
              <p className="text-muted-foreground mb-2">This EULA, together with:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Refund Policy</li>
                <li>DPDP Consent Notice</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                constitutes the entire agreement between you and RecordSetu.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                16. CONTACT INFORMATION
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="space-y-2">
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">Privacy:</span> privacy@recordsetu.com
                  </p>
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">Support:</span> support@recordsetu.com
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                © 2025-26 RecordSetu. All Rights Reserved.
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
