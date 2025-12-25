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
              RecordSetu – Privacy Policy
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
              <p>Last Updated: December 24, 2025</p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              This Privacy Policy explains how RecordSetu ("we", "us", "our") collects, uses, stores, processes, and protects information when you access or use our website, applications, APIs, WhatsApp bot, or related services (collectively, the "Platform").
            </p>
            <p className="text-muted-foreground font-semibold">
              By accessing or using the Platform, you agree to the practices described in this Privacy Policy.
            </p>
          </div>

          {/* Content */}
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                1. SCOPE OF THIS POLICY
              </h2>
              <p className="text-muted-foreground mb-3">This Privacy Policy applies to:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Registered users</li>
                <li>Authorized government and law enforcement users</li>
                <li>Website visitors</li>
                <li>API and bot users</li>
              </ul>
              <p className="text-muted-foreground mt-3 font-semibold">
                This Policy must be read together with the Terms of Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                2. LEGAL FRAMEWORK
              </h2>
              <p className="text-muted-foreground mb-3">RecordSetu processes data in accordance with:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Digital Personal Data Protection Act, 2023 (India)</li>
                <li>Information Technology Act, 2000</li>
                <li>Applicable rules, regulations, and lawful government directions</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                RecordSetu acts as a <span className="font-semibold text-foreground">data intermediary / processor / aggregator</span>.
              </p>
              <p className="text-muted-foreground mt-2 font-semibold">
                The User is the Data Fiduciary for searches conducted on the Platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                3. INFORMATION WE COLLECT
              </h2>
              
              <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">A. ACCOUNT INFORMATION</h3>
              <p className="text-muted-foreground mb-2">We may collect:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Name</li>
                <li>Official email address</li>
                <li>Organization/agency name</li>
                <li>Role or designation</li>
                <li>Contact number</li>
                <li>KYC or authorisation documents (where required)</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mb-2 mt-6">B. USAGE & SEARCH METADATA (NOT RESULTS)</h3>
              <p className="text-muted-foreground mb-2">For security, audit, and compliance purposes, we may log:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Search type executed</li>
                <li>Timestamp</li>
                <li>Feature used</li>
                <li>Credits consumed</li>
                <li>User account ID</li>
                <li>IP address</li>
                <li>Device/browser metadata</li>
              </ul>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-amber-900 font-semibold">
                  Important: RecordSetu does not permanently store raw search result datasets by default.
                </p>
                <ul className="space-y-1 text-sm text-amber-800 list-disc list-inside mt-2">
                  <li>We do NOT store raw personal data outputs as datasets.</li>
                  <li>Only metadata and hashed audit logs are retained for compliance.</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2 mt-6">C. PAYMENT INFORMATION</h3>
              <p className="text-muted-foreground">
                RecordSetu does not store payment credentials. All payments are processed by third-party payment gateways. We only receive transaction references and status.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                4. WHAT WE DO NOT COLLECT
              </h2>
              <p className="text-muted-foreground mb-3">We do NOT:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Perform Aadhaar authentication</li>
                <li>Access UIDAI systems</li>
                <li>Collect biometrics or OTPs</li>
                <li>Scrape private or breached databases</li>
                <li>Sell personal data</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                5. PURPOSE OF DATA PROCESSING
              </h2>
              <p className="text-muted-foreground mb-3">We process data strictly for:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Providing the requested search functionality</li>
                <li>Account authentication and access control</li>
                <li>Audit logging and abuse prevention</li>
                <li>Subscription and credit management</li>
                <li>Legal compliance and risk mitigation</li>
                <li>Service improvement and diagnostics</li>
              </ul>
              <p className="text-muted-foreground mt-3 font-semibold">
                We do not use data for advertising or profiling.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                6. USER RESPONSIBILITIES (CRITICAL)
              </h2>
              <p className="text-muted-foreground mb-3">By using RecordSetu, you confirm:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>You have lawful authority, consent, or statutory power to perform searches</li>
                <li>You will comply with DPDP Act purpose limitation</li>
                <li>You will not misuse outputs for unlawful or personal reasons</li>
              </ul>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-red-900 font-semibold">
                  RecordSetu is not responsible for unlawful searches conducted by users.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                7. DATA RETENTION
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Account data is retained while your account remains active.</li>
                <li>Audit logs are retained for a limited period for:
                  <ul className="ml-6 mt-1 space-y-1 list-circle">
                    <li>Legal compliance</li>
                    <li>Security monitoring</li>
                    <li>Regulatory obligations</li>
                  </ul>
                </li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Data may be deleted or anonymised after the retention period or upon account termination, unless legally required otherwise.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                8. DATA SHARING & DISCLOSURE
              </h2>
              <p className="text-muted-foreground mb-3 font-semibold">
                We do NOT sell or rent data.
              </p>
              <p className="text-muted-foreground mb-2">We may disclose limited information:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>To comply with lawful government or court orders</li>
                <li>To prevent fraud, abuse, or security incidents</li>
                <li>To payment gateways strictly for transaction processing</li>
                <li>To infrastructure providers under strict confidentiality</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                9. DATA SECURITY MEASURES
              </h2>
              <p className="text-muted-foreground mb-3">RecordSetu implements reasonable and industry-standard safeguards including:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Encryption at rest and in transit</li>
                <li>Hashed audit logs</li>
                <li>Role-based access control</li>
                <li>Activity monitoring</li>
                <li>Infrastructure-level security controls</li>
              </ul>
              <p className="text-muted-foreground mt-3 italic">
                However, no system is 100% secure. Users accept inherent risks of internet usage.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                10. USER RIGHTS UNDER DPDP ACT
              </h2>
              <p className="text-muted-foreground mb-3">Subject to applicable law, users may request:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Access to account information</li>
                <li>Correction of inaccurate account data</li>
                <li>Account closure</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Requests can be made via official support channels. Certain data may be retained if legally required.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                11. COOKIES & TRACKING
              </h2>
              <p className="text-muted-foreground mb-3">RecordSetu may use minimal cookies or similar technologies for:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Session management</li>
                <li>Authentication</li>
                <li>Security</li>
              </ul>
              <p className="text-muted-foreground mt-3 font-semibold">
                We do not use behavioural tracking or advertising cookies.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                12. THIRD-PARTY LINKS & DATA SOURCES
              </h2>
              <p className="text-muted-foreground">
                The Platform may reference or link to third-party sources. RecordSetu is not responsible for third-party privacy practices or content accuracy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                13. CHILDREN'S PRIVACY
              </h2>
              <p className="text-muted-foreground">
                RecordSetu is not intended for individuals below 18 years of age. We do not knowingly collect children's data.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                14. CHANGES TO THIS POLICY
              </h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. Continued use of the Platform indicates acceptance of revised terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                15. CONTACT & GRIEVANCE REDRESSAL
              </h2>
              <p className="text-muted-foreground mb-3">For privacy concerns or requests, contact:</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="space-y-2">
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">Email:</span> privacy@recordsetu.com
                  </p>
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">Support:</span> support@recordsetu.com
                  </p>
                  <p className="text-sm text-blue-800 italic mt-3">
                    Grievance Officer details may be updated as required under law.
                  </p>
                </div>
              </div>
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