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
              End-User License Agreement
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
                Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                This <span className="font-semibold">End-User License Agreement (EULA)</span> is a legal agreement between you ("User", "You", "Your") and <span className="font-semibold">RecordSetu</span> ("Company", "We", "Us", "Our"), governing your access to and use of the RecordSetu platform, including its web application, APIs, analytics modules, data search interfaces, and related services ("Service").
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                By creating an account, accessing, or using the Service, you agree to be bound by this EULA. If you do not agree, do not access or use the Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                1. License Grant
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                RecordSetu grants you a <span className="font-semibold">non-exclusive, non-transferable, limited, revocable license</span> to access and use the Service strictly in accordance with this Agreement for authorized government, law-enforcement, compliance, verification, or investigative purposes only.
              </p>
              <p className="text-muted-foreground">
                Unauthorized commercial resale, redistribution, or replication of any part of the platform is strictly prohibited.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                2. Authorized Use
              </h2>
              <p className="text-muted-foreground mb-3">You agree to:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Use the platform only for legitimate, lawful, and authorized data access.</li>
                <li>Access only those datasets you are approved for by organizational admin or lawful authority.</li>
                <li>Maintain confidentiality of any information accessed.</li>
                <li>Ensure that access logs, records, audits, and investigation outputs are handled as per your organization's security and confidentiality norms.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                3. Restrictions
              </h2>
              <p className="text-muted-foreground mb-3">You shall not:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Copy, reverse-engineer, decompile, modify, or attempt to extract source code.</li>
                <li>Use the system for personal data profiling or surveillance without lawful authorization.</li>
                <li>Share credentials, access tokens, or reports without written permission.</li>
                <li>Introduce malware, attempt to break system security, or perform stress testing without approval.</li>
                <li>Use the system to violate any privacy, compliance, or data-protection laws.</li>
              </ul>
              <p className="text-muted-foreground mt-3">Violation may result in immediate suspension.</p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                4. Account Responsibility
              </h2>
              <p className="text-muted-foreground">
                You are responsible for maintaining account confidentiality, including login details, tokens, and session security. All activity under your account is presumed to be authorized by you.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                5. Data Accuracy & Availability
              </h2>
              <p className="text-muted-foreground mb-3">
                RecordSetu aggregates information from multiple official and open-source repositories. We do not guarantee:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Accuracy, completeness, or real-time availability of records</li>
                <li>Data integrity of third-party datasets</li>
                <li>Uninterrupted uptime or compatibility with all devices</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Outputs must be independently validated before use in legal proceedings.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                6. Intellectual Property
              </h2>
              <p className="text-muted-foreground">
                All software, design, workflows, datasets, content, branding, and documentation associated with RecordSetu remain the exclusive intellectual property of the Company. No ownership rights are transferred under this Agreement.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                7. Compliance & Lawful Use
              </h2>
              <p className="text-muted-foreground">
                Users must comply with the <span className="font-semibold">Digital Personal Data Protection Act (DPDPA), IT Act 2000/IT Rules 2021 (India), and applicable laws, regulations, and agency policies</span>.
              </p>
              <p className="text-muted-foreground mt-3">
                Unauthorized access, misuse, or breach may result in legal action.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                8. Termination
              </h2>
              <p className="text-muted-foreground mb-3">The Company may suspend or terminate access if:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>User breaches any terms of this Agreement</li>
                <li>Unauthorized use or misuse is detected</li>
                <li>Required by law-enforcement, court order, or compliance audit</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Upon termination, access to all data, dashboards, logs, or reports will be revoked without refund.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                9. Warranty & Limitation of Liability
              </h2>
              <p className="text-muted-foreground mb-3">
                Service is provided <span className="font-semibold">"as-is" and "as-available"</span> without guarantees.
              </p>
              <p className="text-muted-foreground mb-3">The Company shall not be liable for:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Direct, indirect, incidental, consequential, or punitive damages</li>
                <li>Loss of data, revenue, or reputation</li>
                <li>Decisions or actions taken based on provided information</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                10. Indemnification
              </h2>
              <p className="text-muted-foreground">
                You agree to indemnify and hold harmless the Company from any claims arising from misuse, illegal access, or violation of laws or policies by you or under your account.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                11. Governing Law & Dispute Resolution
              </h2>
              <p className="text-muted-foreground mb-3">
                This agreement is governed by the laws of India. Any disputes shall be resolved under arbitration in <span className="font-semibold">Indore, Madhya Pradesh</span>, under the Arbitration and Conciliation Act, 1996.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                12. Changes to Agreement
              </h2>
              <p className="text-muted-foreground">
                The Company may update terms periodically. Continued use after updates constitutes acceptance.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                13. Contact Information
              </h2>
              <p className="text-muted-foreground mb-3">For questions, compliance requests, or dispute notices:</p>
              <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                <li>Email: support@recordsetu.com</li>
                <li>Support: Available during business hours</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-amber-900 mb-3">Acceptance</h3>
              <p className="text-sm text-amber-800">
                By clicking "I Agree", creating an account, or using the platform, you acknowledge that:
              </p>
              <ul className="space-y-1 text-sm text-amber-800 list-disc list-inside mt-2">
                <li>You have read and understood this Agreement</li>
                <li>You agree to be legally bound by all terms</li>
              </ul>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
