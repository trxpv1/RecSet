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
              TERMS OF SERVICE
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
              <p>Effective Date: January 1, 2026</p>
              <p>Last Updated: January 1, 2026</p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service / Terms of Use ("Terms") constitute a legally binding agreement between you ("User", "You", "Your") and RecordSetu ("Platform", "We", "Us", "Our").
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By creating an account, accessing, or using the Platform in any manner, you acknowledge that you have read, understood, and agree to be bound by these Terms.
            </p>
            <p className="text-muted-foreground font-semibold">
              If you do not agree, you must not access or use the Platform.
            </p>
          </div>

          {/* Content */}
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                1. Platform Overview & Ownership
              </h2>
              <p className="text-muted-foreground mb-3">
                RecordSetu is a restricted-access investigative and intelligence SaaS platform providing lawful access to analytical tools, correlation engines, and approved datasets for investigation, due diligence, compliance, and internal analysis purposes.
              </p>
              <p className="text-muted-foreground mb-3">
                The Platform is owned and operated by [Legal Entity Name], incorporated under the laws of India, with its registered office at [Address].
              </p>
              <p className="text-muted-foreground font-semibold">
                Nothing in these Terms shall be construed as granting any ownership or proprietary rights to Users.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                2. Definitions
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li><span className="font-semibold text-foreground">"Platform"</span> means the RecordSetu website, dashboards, APIs, tools, and services.</li>
                <li><span className="font-semibold text-foreground">"User"</span> means any authorized individual accessing the Platform.</li>
                <li><span className="font-semibold text-foreground">"Agency"</span> refers to an organization, enterprise, or entity sponsoring or authorizing Users.</li>
                <li><span className="font-semibold text-foreground">"Data"</span> means results, metadata, intelligence outputs, or analytical information generated through searches.</li>
                <li><span className="font-semibold text-foreground">"Credits"</span> means prepaid usage units required to execute searches or services.</li>
                <li><span className="font-semibold text-foreground">"Service"</span> means all features, tools, and intelligence modules offered by the Platform.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                3. Access Control & Eligibility
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Access to RecordSetu is restricted and not available to the general public.</li>
                <li>User onboarding may require identity verification, organizational approval, or manual review.</li>
                <li>RecordSetu reserves the right to approve, deny, suspend, or revoke access at its sole discretion.</li>
                <li>Users must be legally competent and authorized to use investigative tools under applicable laws.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                4. User Accounts & Credentials
              </h2>
              <p className="text-muted-foreground mb-2">a) You are responsible for maintaining accurate account information.</p>
              <p className="text-muted-foreground mb-2">b) Login credentials are personal and must not be shared, transferred, sublicensed, or sold.</p>
              <p className="text-muted-foreground mb-2">c) You are fully responsible for all activity performed under your account.</p>
              <p className="text-muted-foreground mb-2">d) RecordSetu may suspend or terminate accounts without notice if misuse or policy violations are detected.</p>
              <p className="text-muted-foreground">e) Upon termination, RecordSetu has no obligation to retain user data or search outputs.</p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                5. Permitted Use
              </h2>
              <p className="text-muted-foreground mb-3">The Platform may be used only for lawful purposes, including but not limited to:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Investigation and research</li>
                <li>Compliance and due diligence</li>
                <li>Internal risk assessment</li>
                <li>Analytical and intelligence correlation</li>
              </ul>
              <p className="text-muted-foreground mt-3 mb-2">All searches must be:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Legally permissible</li>
                <li>Properly justified</li>
                <li>Initiated with lawful authority and intent</li>
              </ul>
              <p className="text-muted-foreground mt-3 font-semibold">
                Search results are informational in nature and are NOT admissible as legal or court evidence.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                6. Prohibited Use & Restrictions
              </h2>
              <p className="text-muted-foreground mb-3">Users shall NOT:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Copy, store, scrape, resell, redistribute, publish, or commercially exploit Platform data.</li>
                <li>Reverse engineer, decompile, or bypass Platform safeguards.</li>
                <li>Automate searches beyond permitted thresholds</li>
                <li>Conduct surveillance, harassment, profiling, or unlawful tracking.</li>
                <li>Use outputs for personal, defamatory, or malicious purposes.</li>
                <li>Misrepresent identity, authority, or case justification</li>
              </ul>
              <p className="text-muted-foreground mt-3 font-semibold">
                Any violation may result in immediate suspension or termination.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                7. Data Handling & Retention
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>RecordSetu does not permanently store search results.</li>
                <li>Search outputs are session-based and may be automatically purged.</li>
                <li>Only hashed audit logs (User ID, timestamp, module, credit usage) are retained for security and compliance.</li>
                <li>Users are responsible for the lawful handling of any data they export or record.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                8. Confidentiality & Security
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Users must maintain strict confidentiality of credentials and access methods.</li>
                <li>Multi-factor authentication, device controls, or monitoring may be enforced.</li>
                <li>All Platform activity may be logged and monitored for security, abuse prevention, and compliance.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                9. Payments, Credits & Wallet Model
              </h2>
              <p className="text-muted-foreground mb-3">
                RecordSetu operates on a prepaid credit-based wallet system.
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Credits are required to execute searches and services.</li>
                <li>Credits are non-transferable and non-refundable once consumed.</li>
                <li>Pricing, credit value, and consumption rules may change without notice.</li>
                <li>Payments are processed via third-party payment gateways; RecordSetu does not store payment card details.</li>
                <li>Taxes, including GST, shall apply as per law.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                10. Intellectual Property Rights
              </h2>
              <p className="text-muted-foreground mb-3">
                All Platform components—including software, source code, UI/UX, algorithms, trademarks, designs, and documentation—are the exclusive intellectual property of RecordSetu.
              </p>
              <p className="text-muted-foreground">
                Use of the Platform does not grant any ownership or license beyond limited, revocable access.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                11. Disclaimer of Data Accuracy
              </h2>
              <p className="text-muted-foreground mb-3">
                All information is provided "as is" and "as available."
              </p>
              <p className="text-muted-foreground mb-2">RecordSetu:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Does not verify or authenticate all data points</li>
                <li>Makes no guarantees regarding accuracy, completeness, timeliness, or legality</li>
                <li>Does not warrant uninterrupted or error-free operation</li>
              </ul>
              <p className="text-muted-foreground mt-3 font-semibold">
                Users rely on Platform outputs entirely at their own risk.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                12. Indemnification
              </h2>
              <p className="text-muted-foreground mb-3">
                You and your sponsoring entity agree to indemnify and hold harmless RecordSetu, its founders, employees, contractors, and partners from any claims, losses, damages, or legal actions arising from:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Your misuse of the Platform</li>
                <li>Violation of these Terms</li>
                <li>Violation of applicable laws or third-party rights</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                13. Limitation of Liability
              </h2>
              <p className="text-muted-foreground mb-3">
                To the maximum extent permitted by law:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>RecordSetu shall not be liable for indirect, incidental, consequential, or punitive damages.</li>
                <li>Total liability, if any, shall not exceed the value of credits purchased in the preceding three (3) months.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                14. Suspension & Termination
              </h2>
              <p className="text-muted-foreground mb-3">Access may be suspended or terminated due to:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Security risks or abnormal usage</li>
                <li>Policy or legal violations</li>
                <li>Legal or regulatory orders</li>
                <li>Non-payment or misuse</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Audit logs may be retained for compliance and legal purposes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                15. Governing Law & Jurisdiction
              </h2>
              <p className="text-muted-foreground mb-3">These Terms shall be governed by and interpreted under:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Information Technology Act, 2000</li>
                <li>Digital Personal Data Protection Act, 2023</li>
                <li>Indian Contract Act, 1872</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Courts of India shall have exclusive jurisdiction.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                16. Modifications to Terms
              </h2>
              <p className="text-muted-foreground mb-3">
                RecordSetu may modify these Terms at any time.
              </p>
              <p className="text-muted-foreground">
                Continued use of the Platform constitutes acceptance of the updated Terms.
              </p>
            </div>

            <div className="text-center pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                © 2026 RecordSetu · Terms of Service · Privacy Policy · Refund Policy
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
