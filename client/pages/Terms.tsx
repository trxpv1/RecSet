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
              Terms of Use
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
                1. Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Use ("Terms") constitute a legally binding agreement between the User and RecordSetu ("Platform"), governing access and use of the Platform. By accessing and using RecordSetu, you agree to be bound by these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                2. Definitions
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <span className="font-semibold text-foreground">"Platform"</span> means RecordSetu, a restricted SaaS platform providing authorized access to approved datasets for law enforcement and government agencies.
                </li>
                <li>
                  <span className="font-semibold text-foreground">"User"</span> refers to any individual accessing the Platform with an authorized login.
                </li>
                <li>
                  <span className="font-semibold text-foreground">"Agency"</span> means a government department, LEA, cyber cell, or intelligence unit sponsoring authorized users.
                </li>
                <li>
                  <span className="font-semibold text-foreground">"Data"</span> refers to search results obtained through the Platform.
                </li>
                <li>
                  <span className="font-semibold text-foreground">"Credits"</span> refers to the usage-based credit balance against which searches are performed.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                3. Access Control
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Access is strictly invite-only. The Platform is not available to the general public.</li>
                <li>User onboarding requires identity verification and agency approval.</li>
                <li>RecordSetu reserves the right to suspend or terminate access for violation of policies.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                4. Permitted Use
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>The Platform may be used only for lawful investigation, compliance, verification or internal agency purposes.</li>
                <li>Searches must be linked to valid Case ID and authorized justification.</li>
                <li>Users are responsible for accuracy and legality of queries initiated.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                5. Restrictions
              </h2>
              <p className="text-muted-foreground mb-3">Users shall not:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Store, copy, scrape, resell, redistribute, publish or commercially exploit platform data.</li>
                <li>Attempt reverse engineering, decompilation or bypass security.</li>
                <li>Automate searches beyond allowed rates.</li>
                <li>Access data outside lawful purpose scope.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                6. Data Handling
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>The Platform does not permanently store search results.</li>
                <li>Only hashed audit logs are stored (UserID, timestamp, hashed query).</li>
                <li>Search outputs are visible only once during active session and are auto-purged.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                7. Confidentiality & Security Obligations
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Users must maintain login confidentiality and report compromise immediately.</li>
                <li>MFA and device binding must be enabled.</li>
                <li>All platform activity is monitored with audit hashing.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                8. Payment Terms
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Credit system governs search usage.</li>
                <li>Credits are non-transferable and non-refundable except as governed by our Refund Policy.</li>
                <li>All invoices are subject to applicable taxes.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                9. Suspension & Termination
              </h2>
              <p className="text-muted-foreground mb-3">Access may be suspended or terminated due to:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Security threat</li>
                <li>Abnormal usage or misuse</li>
                <li>Legal order or investigation</li>
                <li>Non-payment (if applicable)</li>
              </ul>
              <p className="text-muted-foreground mt-3">All audit logs will remain preserved for compliance purposes.</p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                10. Intellectual Property Rights
              </h2>
              <p className="text-muted-foreground">
                All trademarks, source code, UI/UX, architecture, design and content are proprietary to RecordSetu. No ownership rights transfer by usage.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                11. Indemnity
              </h2>
              <p className="text-muted-foreground">
                User and Agency agree to indemnify RecordSetu for misuse, illegal access, or data abuse resulting from their actions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                12. Governing Law & Dispute Resolution
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Jurisdiction: Courts of India</li>
                <li>Governing Law: IT Act 2000, Digital Personal Data Protection Act 2023, Indian Contract Act</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                13. Changes to Terms
              </h2>
              <p className="text-muted-foreground">
                RecordSetu may update these Terms and notify Users. Continued usage of the Platform indicates your acceptance of the updated Terms.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-blue-900 mb-2">Questions?</h3>
              <p className="text-sm text-blue-800">
                If you have questions about these Terms, please contact our legal team at support@recordsetu.com
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
