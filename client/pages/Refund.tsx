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
              Refund Policy
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
                1. Agency Subscription & Credit Purchase
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Credit purchase is final once activated on the platform.</li>
                <li>Credits are prepaid usage units deducted per search transaction.</li>
                <li>No refund is provided after credits have been consumed.</li>
                <li>All credit purchases are non-cancellable after activation.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                2. Refund Eligibility
              </h2>
              <p className="text-muted-foreground mb-3">
                Refunds are permitted <span className="font-semibold">only</span> in the following circumstances:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li><span className="font-semibold text-foreground">Duplicate payment:</span> Accidental or duplicate transaction charges</li>
                <li><span className="font-semibold text-foreground">Technical failure:</span> Service activation failure preventing platform access</li>
                <li><span className="font-semibold text-foreground">Billing error:</span> Incorrect billing or charges not authorized by agency</li>
                <li><span className="font-semibold text-foreground">Service termination:</span> Termination initiated by RecordSetu for non-user-fault reasons</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                3. Non-Refundable Cases
              </h2>
              <p className="text-muted-foreground mb-3">Refunds will <span className="font-semibold">NOT</span> be issued for:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Credits not used within the validity period</li>
                <li>Account suspension due to policy violation or misuse</li>
                <li>Change of requirement or decision by the agency</li>
                <li>Credits used for searches (consumed credits are final)</li>
                <li>User-initiated account closure or subscription cancellation</li>
                <li>Credits transferred between users or agencies</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                4. Refund Processing Timeline
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li><span className="font-semibold text-foreground">Request window:</span> Refund requests must be raised within 7 days of the transaction</li>
                <li><span className="font-semibold text-foreground">Processing time:</span> Refunds processed through original payment method within 10–15 working days</li>
                <li><span className="font-semibold text-foreground">Government orders:</span> Offline government orders follow treasury cycle and approval procedures</li>
                <li><span className="font-semibold text-foreground">Verification:</span> Agency may be requested to provide supporting documentation</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                5. Credit Validity Period
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Credits are valid for <span className="font-semibold">12 months</span> from the date of purchase</li>
                <li>Unused credits after the validity period expire automatically with no refund</li>
                <li>Agency will be notified 30 days before credit expiration</li>
                <li>No extension of validity period is provided</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                6. How to Request a Refund
              </h2>
              <div className="bg-slate-50 border border-border rounded-lg p-4 space-y-2">
                <p className="text-muted-foreground">
                  To request a refund, please contact our support team with:
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                  <li>Transaction ID or invoice number</li>
                  <li>Date of purchase</li>
                  <li>Reason for refund request</li>
                  <li>Supporting documentation (if applicable)</li>
                  <li>Agency contact person details</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                7. Credit Transfers & Assignment
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Credits are non-transferable between agencies</li>
                <li>Credits cannot be reassigned to different users within the same agency</li>
                <li>Credits are bound to the agency and account they were purchased for</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                8. Payment Methods Accepted
              </h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Direct bank transfers from government accounts</li>
                <li>Digital payment gateways (NEFT, RTGS, UPI for approved agencies)</li>
                <li>Cheque or demand draft (on case-by-case basis)</li>
                <li>PO and invoice-based billing for regular subscribers</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-amber-900 mb-2">Important Notice</h3>
              <p className="text-sm text-amber-800 mb-3">
                This policy is subject to the terms and conditions outlined in our Terms of Use and applicable Indian law. In case of disputes, the decision of RecordSetu management will be final.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2">Support & Queries</h3>
              <p className="text-sm text-blue-800">
                For refund-related questions or to initiate a refund request, please contact our support team at support@recordsetu.com or call our dedicated support line.
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
