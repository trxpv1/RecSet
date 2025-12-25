import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
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
              Terms of Service
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
              <p>Last Updated: December 24, 2025</p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using RecordSetu ("Platform"), you agree to these Terms of Service ("ToS"). If you do not agree, do not use the Platform.
            </p>
          </div>

          {/* Content */}
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                1. PLATFORM & ELIGIBILITY
              </h2>
              <p className="text-muted-foreground mb-3">
                RecordSetu is a <span className="font-semibold">restricted-access platform</span> intended only for authorised government, law enforcement, investigative, or compliance users.
              </p>
              <p className="text-muted-foreground mb-2">By using the Platform, you confirm that:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>You are authorised by your organisation</li>
                <li>You have lawful authority for searches conducted</li>
                <li>You comply with applicable Indian laws</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                2. ELIGIBILITY & INTENDED USE
              </h2>
              <p className="text-muted-foreground mb-3">The Services are strictly intended for:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Law Enforcement Agencies</li>
                <li>Government departments</li>
                <li>Licensed investigators</li>
                <li>Legal professionals</li>
                <li>Compliance, risk, or fraud investigation professionals</li>
                <li>Other users expressly approved by RecordSetu</li>
              </ul>
              <p className="text-muted-foreground mt-3 mb-2">You confirm that:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>You are legally competent to contract</li>
                <li>You have lawful authority, consent, or statutory power to conduct searches</li>
                <li>You will not use the Services for personal curiosity, harassment, stalking, profiling, or unlawful surveillance</li>
              </ul>
              <p className="text-muted-foreground mt-3 font-semibold">
                Unauthorized or consumer use is strictly prohibited.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                3. ACCOUNT REGISTRATION
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>You must provide accurate, current, and complete information while creating an account.</li>
                <li>You are solely responsible for safeguarding your login credentials.</li>
                <li>Account sharing, resale, sublicensing, or transfer is prohibited unless explicitly authorized in writing.</li>
                <li>RecordSetu reserves the right to suspend or terminate accounts without notice if misuse or risk is detected.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                4. NATURE OF INFORMATION PROVIDED
              </h2>
              <p className="text-muted-foreground mb-3">RecordSetu aggregates, indexes, and processes information obtained from:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Publicly accessible sources</li>
                <li>Government databases (where legally accessible)</li>
                <li>User-submitted inputs</li>
                <li>Third-party lawful data providers</li>
              </ul>
              <p className="text-muted-foreground mt-3 mb-3">
                All information is provided <span className="font-semibold">"AS IS"</span> and <span className="font-semibold">"AS AVAILABLE"</span>.
              </p>
              <p className="text-muted-foreground mb-2">RecordSetu:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Does not verify ground truth</li>
                <li>Does not guarantee accuracy, completeness, timeliness, or reliability</li>
                <li>Does not certify admissibility in court</li>
              </ul>
              <p className="text-muted-foreground mt-3 font-semibold">
                Outputs are investigative leads only, not evidence.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                5. DATA PROTECTION & DPDP ACT COMPLIANCE (MANDATORY)
              </h2>
              <p className="text-muted-foreground mb-3">
                RecordSetu complies with the <span className="font-semibold">Digital Personal Data Protection Act, 2023 (India)</span>.
              </p>
              <p className="text-muted-foreground mb-2">You acknowledge and agree that:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>You are the <span className="font-semibold text-foreground">Data Fiduciary</span> for all searches you initiate</li>
                <li>RecordSetu acts as a <span className="font-semibold text-foreground">data intermediary / processor / aggregator</span></li>
                <li>You confirm lawful purpose, consent, or statutory authorization for each search</li>
                <li>You bear sole responsibility for compliance with DPDP Act, IT Act, IPC, CrPC, and other applicable laws</li>
              </ul>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-red-900 font-semibold">
                  You agree to indemnify RecordSetu against any violation of data protection or privacy laws arising from your use.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                6. AADHAAR & SENSITIVE IDENTIFIERS DISCLAIMER
              </h2>
              <p className="text-muted-foreground mb-2">RecordSetu:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Does NOT perform Aadhaar authentication</li>
                <li>Does NOT access UIDAI systems</li>
                <li>Does NOT conduct biometric or OTP-based Aadhaar verification</li>
                <li>Does NOT claim UIDAI validation</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Any Aadhaar-related output is derived from lawfully accessible, non-UIDAI sources and provided strictly as an investigative reference.
              </p>
              <p className="text-muted-foreground mt-3 font-semibold">
                Misuse of Aadhaar-linked searches is grounds for immediate termination.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                7. FEATURE ACCESS, SUBSCRIPTION & CREDITS
              </h2>
              <p className="text-muted-foreground mb-3">
                RecordSetu operates on a <span className="font-semibold">prepaid wallet credit model only</span>.
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>All features consume credits per use</li>
                <li>Credits must be purchased in advance</li>
                <li>Credits do not represent currency or stored value</li>
                <li>Credits are non-transferable and non-refundable</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                8. PAYMENTS
              </h2>
              <p className="text-muted-foreground mb-3">
                RecordSetu does not store or process payment card, UPI, or banking information. Payments are processed via independent third-party payment gateways.
              </p>
              <p className="text-muted-foreground mb-2">RecordSetu is not liable for:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Payment gateway downtime</li>
                <li>Transaction failures</li>
                <li>Refund delays caused by third parties</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                9. INTERMEDIARY SAFE HARBOUR (IT ACT, 2000)
              </h2>
              <p className="text-muted-foreground mb-3">
                RecordSetu is an intermediary under <span className="font-semibold">Section 79 of the Information Technology Act, 2000</span>.
              </p>
              <p className="text-muted-foreground mb-2">RecordSetu:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Does not initiate searches on its own</li>
                <li>Does not modify user-initiated inputs</li>
                <li>Does not publish or endorse content</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                RecordSetu shall not be liable for user misuse, subject to lawful compliance and takedown obligations.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                10. AUDIT LOGS & MONITORING
              </h2>
              <p className="text-muted-foreground mb-3">To ensure lawful use, RecordSetu:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Maintains audit logs of searches</li>
                <li>Implements rate-limiting and abuse detection</li>
                <li>May monitor usage for risk, fraud, or misuse</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Logs may be disclosed to competent authorities if legally required.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                11. PROHIBITED USE
              </h2>
              <p className="text-muted-foreground mb-3">You shall NOT use the Services to:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Harass, stalk, threaten, or defame</li>
                <li>Conduct personal background checks without authority</li>
                <li>Engage in financial fraud, impersonation, or extortion</li>
                <li>Resell or redistribute outputs</li>
                <li>Circumvent safeguards or access controls</li>
              </ul>
              <p className="text-muted-foreground mt-3 font-semibold">
                Violation may result in permanent termination and legal action.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                12. CONFIDENTIALITY
              </h2>
              <p className="text-muted-foreground mb-3">You agree to maintain strict confidentiality of:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Platform features</li>
                <li>Search methodologies</li>
                <li>Outputs</li>
                <li>Pricing</li>
                <li>Internal logic</li>
              </ul>
              <p className="text-muted-foreground mt-3 font-semibold">
                Unauthorized disclosure is prohibited.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                13. INDEMNITY
              </h2>
              <p className="text-muted-foreground mb-3">
                You agree to fully indemnify and hold harmless RecordSetu, its directors, employees, partners, and vendors from any claims, damages, penalties, losses, or legal proceedings arising from:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Your misuse of Services</li>
                <li>Violation of laws</li>
                <li>False or unlawful searches</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                14. LIMITATION OF LIABILITY
              </h2>
              {/* <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
               
              </div> */}
               <p className="text-muted-foreground mb-3">
                  To the maximum extent permitted by law:
                </p>
                <p className="text-muted-foreground mb-3">
                  Total liability, if any, shall not exceed the total value of credits remaining in the User's wallet at the time the claim arises, or ₹10,000, whichever is lower.
                </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                15. TERMINATION
              </h2>
              <p className="text-muted-foreground mb-3">RecordSetu may suspend or terminate access:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Without notice</li>
                <li>For suspected misuse</li>
                <li>For legal or regulatory risk</li>
                <li>For violation of these Terms</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                No obligation exists to retain data after termination.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                16. GOVERNING LAW & JURISDICTION
              </h2>
              <p className="text-muted-foreground">
                These Terms are governed by the laws of India. Courts at <span className="font-semibold">India</span> shall have exclusive jurisdiction.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                17. CHANGES TO TERMS
              </h2>
              <p className="text-muted-foreground">
                RecordSetu may update these Terms at any time. Continued use constitutes acceptance of revised Terms.
              </p>
            </div>

            <div className="text-center pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                © 2025 RecordSetu. All Rights Reserved.
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
