import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Refund() {
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
              Refund & Cancellation Policy
            </h1>
            <p className="text-xl text-muted-foreground">(Wallet-Based Model)</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
              <p>Last Updated: December 24, 2025</p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              This Refund & Cancellation Policy ("Policy") governs all payments, wallet credit purchases, and monetary transactions made on RecordSetu ("Platform", "Services").
            </p>
            <p className="text-muted-foreground font-semibold">
              By purchasing wallet credits or using paid features on RecordSetu, you agree to this Policy in full.
            </p>
          </div>

          {/* Content */}
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                1. NATURE OF SERVICES
              </h2>
              <p className="text-muted-foreground mb-3">
                RecordSetu operates on a <span className="font-semibold">prepaid, wallet-based, pay-per-use model</span>.
              </p>
              <p className="text-muted-foreground mb-2">All payments made on the Platform are for:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Prepaid usage credits</li>
                <li>Digital access to search and analysis features</li>
              </ul>
              <p className="text-muted-foreground mt-3 font-semibold">
                RecordSetu does not offer subscriptions or post-paid billing.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                2. WALLET CREDITS – NO REFUNDS
              </h2>
              
              <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">2.1 Credit Purchases</h3>
              <p className="text-muted-foreground mb-2">All wallet credits purchased on RecordSetu are:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Prepaid</li>
                <li>Non-refundable</li>
                <li>Non-transferable</li>
                <li>Non-exchangeable</li>
                <li>Not redeemable for cash or equivalent value</li>
              </ul>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-red-900 font-semibold mb-2">
                  Once credits are added to a user's wallet, no refund shall be issued, whether:
                </p>
                <ul className="space-y-1 text-sm text-red-800 list-disc list-inside">
                  <li>Credits are unused</li>
                  <li>Credits are partially used</li>
                  <li>User no longer requires the service</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2 mt-6">2.2 Credit Usage & Consumption</h3>
              <p className="text-muted-foreground mb-2">Credits are consumed:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Per search</li>
                <li>Per premium feature</li>
                <li>As per pricing displayed at the time of use</li>
              </ul>
              <p className="text-muted-foreground mt-3 font-semibold">
                Consumption of credits is final and irreversible.
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-2 mt-6">2.3 Credit Expiry (If Applicable)</h3>
              <p className="text-muted-foreground mb-2">If credits carry a validity or expiry period:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Expired credits cannot be restored</li>
                <li>Expired credits do not qualify for refunds</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                3. NO REFUNDS FOR SEARCH OUTCOMES
              </h2>
              <p className="text-muted-foreground mb-3">RecordSetu does not guarantee:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Availability of data</li>
                <li>Accuracy or completeness of results</li>
                <li>Positive or expected search outcomes</li>
              </ul>
              <p className="text-muted-foreground mt-3 mb-2">Accordingly, no refunds shall be issued for:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Searches returning no results</li>
                <li>Incomplete, outdated, or third-party sourced data</li>
                <li>Errors originating from external data providers</li>
                <li>Results not admissible in court</li>
              </ul>
              <p className="text-muted-foreground mt-3 font-semibold">
                Search outputs are informational only.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                4. PAYMENT FAILURES & DUPLICATE TRANSACTIONS
              </h2>
              <p className="text-muted-foreground mb-3">
                Refunds may be considered <span className="font-semibold">only</span> in the following limited scenarios:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Duplicate payment for the same transaction</li>
                <li>Payment successfully deducted but wallet credits not added</li>
              </ul>
              <div className="bg-slate-50 border border-border rounded-lg p-4 mt-4">
                <p className="text-sm text-foreground font-semibold mb-2">Conditions:</p>
                <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                  <li>Issue must be reported within 7 days of transaction</li>
                  <li>Valid transaction proof is required</li>
                  <li>Refunds are processed to the original payment method only</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-3">
                  Processing time depends on the payment gateway and banking channels.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                5. ACCOUNT SUSPENSION OR TERMINATION
              </h2>
              <p className="text-muted-foreground mb-3">If an account is suspended or terminated due to:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Violation of Terms of Service</li>
                <li>Unauthorised or unlawful usage</li>
                <li>Abuse, misuse, or misrepresentation</li>
              </ul>
              <p className="text-muted-foreground mt-3 mb-2 font-semibold">Any remaining wallet credits:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Are forfeited</li>
                <li>Are not refundable</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                6. SERVICE DOWNTIME & TECHNICAL ISSUES
              </h2>
              <p className="text-muted-foreground mb-3">
                Temporary service interruptions, maintenance windows, or degraded performance:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Do not qualify for refunds</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                At RecordSetu's discretion, service credits may be issued as goodwill, but this does not create an obligation.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                7. TAXES & GST
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>GST and other applicable taxes once invoiced are non-refundable</li>
                <li>Tax adjustments will be made only if legally mandated</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                8. GOVERNMENT / LEA EXCEPTION
              </h2>
              <p className="text-muted-foreground mb-3">
                For authorised government or law-enforcement entities:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Refunds, if any, shall be governed strictly by:
                  <ul className="ml-6 mt-1 space-y-1 list-circle">
                    <li>Written agreements</li>
                    <li>Purchase Orders</li>
                    <li>Official government terms</li>
                  </ul>
                </li>
              </ul>
              <p className="text-muted-foreground mt-3 font-semibold">
                No implied refund rights apply.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                9. CHANGES TO THIS POLICY
              </h2>
              <p className="text-muted-foreground">
                RecordSetu reserves the right to modify this Policy at any time. Continued use of the Platform after changes constitutes acceptance of the revised Policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                10. CONTACT INFORMATION
              </h2>
              <p className="text-muted-foreground mb-3">For billing or transaction issues, contact:</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="space-y-2">
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">Email:</span> billing@recordsetu.com
                  </p>
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">Support:</span> support@recordsetu.com
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
