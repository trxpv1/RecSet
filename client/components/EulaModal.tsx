import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X, ChevronDown } from "lucide-react";

interface EulaModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export default function EulaModal({ isOpen, onAccept, onDecline }: EulaModalProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) {
    return null;
  }

  const eulaContent = `END USER LICENSE AGREEMENT (EULA)

Last Updated: December 24, 2025

This End User License Agreement ("Agreement" or "EULA") is a legally binding contract between RecordSetu ("Company", "we", "us", "our") and the individual or entity accessing or using the RecordSetu platform ("User", "you", "your").

By clicking "I Agree", creating an account, or using the Platform, you confirm that you have read, understood, and agreed to this Agreement. If you disagree, you must not access or use the Platform.

1. PLATFORM & LICENSE GRANT

RecordSetu offers a secure, restricted-access digital platform for searching, verifying, and analyzing records.

Subject to your compliance with this Agreement, RecordSetu grants you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and use the Platform solely for lawful, authorized purposes.

This license:
• Does not constitute a sale
• Does not grant ownership rights
• May be revoked at any time

2. ELIGIBILITY & AUTHORITY

By using the Platform, you represent and warrant that:
• You are legally competent to enter this Agreement
• You are authorised by your organisation or agency
• You have lawful authority, consent, or statutory power to conduct searches
• Your use complies with all applicable Indian laws

Unauthorised access or impersonation is strictly prohibited.

3. DATA PROTECTION & DPDP COMPLIANCE

3.1 Roles Under DPDP Act, 2023
For the Digital Personal Data Protection Act, 2023 ("DPDP Act"):
• The User or User's organisation acts as the Data Fiduciary
• RecordSetu acts as a Data Intermediary / Data Processor

3.2 User Obligations Under DPDP Act
You acknowledge and agree that:
• You are responsible for the lawful purpose limitation
• You must ensure consent or legal authority before searches
• You must not misuse or unlawfully disclose personal data
• You must comply with the DPDP Act obligations applicable to Data Fiduciaries

RecordSetu does not validate the legal basis of each search.

3.3 Data Processing by RecordSetu
RecordSetu may process:
• Account identification data
• Authentication and access metadata
• Search metadata (not full datasets)
• Hashed audit logs for compliance

RecordSetu does not permanently store raw search result datasets by default.

4. WALLET-BASED ACCESS & CREDITS

RecordSetu operates on a prepaid wallet credit model only.

Credits:
• Are purchased in advance
• Are consumed per feature usage
• Do not represent currency or stored value
• Are non-transferable and non-refundable

Unused credits do not create any vested rights.

5. PERMITTED USE

You may use the Platform only for:
• Lawful investigative or verification purposes
• Authorised internal analysis
• Compliance, due-diligence, or intelligence support

All use must align with:
• This EULA
• Terms of Service
• Privacy Policy
• Applicable laws

6. PROHIBITED USE

You shall not:
• Use the Platform for personal, commercial, or unlawful purposes
• Misuse of Aadhaar or UIDAI systems
• Resell, sublicense, or share access credentials
• Scrape, copy, or reverse engineer the Platform
• Use outputs to harass, defame, or violate privacy
• Present outputs as certified or court-admissible evidence

Violation may result in immediate termination.

7. SEARCH OUTPUTS & DISCLAIMER

Search results:
• Are informational and indicative only
• May originate from public or licensed third-party sources
• Are provided "as is" without warranties

RecordSetu does not guarantee accuracy, completeness, or timeliness.

8. AUDIT LOGGING & MONITORING

You acknowledge that:
• All actions may be logged
• Logs may be hashed or tamper-evident
• Logs may be reviewed for security and compliance
• Logs may be disclosed to lawful authorities if required

9. INTELLECTUAL PROPERTY

All intellectual property in the Platform, including software, UI, APIs, documentation, and branding, remains the exclusive property of RecordSetu.

No rights are granted except those expressly stated.

10. SUSPENSION & TERMINATION

RecordSetu may suspend or terminate access:
• For policy or legal violations
• For security or compliance risks
• Without prior notice if required

Upon termination:
• The license ends immediately
• Remaining wallet credits are forfeited
• Audit logs may be retained as required by law

11. LIMITATION OF LIABILITY

To the maximum extent permitted by law:

Total liability, if any, shall not exceed the total value of wallet credits remaining in the User's account at the time the claim arises, or ₹10,000, whichever is lower.

RecordSetu shall not be liable for indirect, incidental, or consequential damages.

12. INDEMNIFICATION

You agree to indemnify and hold harmless RecordSetu, its directors, employees, and partners from any claims arising from:
• Your misuse of the Platform
• Violation of law or DPDP obligations
• Unauthorised searches
• Third-party rights violations

13. GOVERNING LAW & JURISDICTION

This Agreement shall be governed by the laws of India. Courts at India shall have exclusive jurisdiction.

14. MODIFICATIONS

RecordSetu may modify this Agreement at any time. Continued use after updates constitutes acceptance.

15. ENTIRE AGREEMENT

This EULA, together with:
• Terms of Service
• Privacy Policy
• Refund Policy
• DPDP Consent Notice

constitutes the entire agreement between you and RecordSetu.

16. CONTACT INFORMATION

Privacy: privacy@recordsetu.com
Support: support@recordsetu.com

© 2025-26 RecordSetu. All Rights Reserved.

---

END OF EULA - Thank you for reading this agreement in full.`;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isAtBottom = 
      element.scrollHeight - element.scrollTop - element.clientHeight < 50;
    setHasScrolledToBottom(isAtBottom);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-border shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground">
              End-User License Agreement
            </h2>
            {!hasScrolledToBottom && (
              <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                <ChevronDown className="w-3 h-3" />
                Please scroll down to read the full agreement
              </p>
            )}
          </div>
          <button
            onClick={onDecline}
            className="text-muted-foreground hover:text-foreground transition flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto overflow-x-hidden p-6 bg-white"
        >
          <div className="text-sm text-muted-foreground leading-relaxed font-mono whitespace-pre-wrap">
            {eulaContent}
          </div>
        </div>

        {/* Scroll Indicator */}
        {!hasScrolledToBottom && (
          <div className="bg-amber-50 border-t border-amber-200 px-6 py-3 flex items-center gap-2 flex-shrink-0">
            <ChevronDown className="w-4 h-4 text-amber-600 animate-bounce" />
            <span className="text-sm text-amber-700 font-medium">
              Please scroll to the bottom to continue
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-border p-6 space-y-4 flex-shrink-0">
          <label className="flex items-start gap-3 cursor-pointer">
            <Checkbox
              checked={isChecked}
              onCheckedChange={setIsChecked}
              disabled={!hasScrolledToBottom}
              className="mt-1"
            />
            <span className={`text-sm ${
              hasScrolledToBottom 
                ? "text-muted-foreground cursor-pointer" 
                : "text-muted-foreground/50 cursor-not-allowed"
            }`}>
              I have read and agree to the End-User License Agreement and all its terms and conditions
            </span>
          </label>

          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={onDecline}
            >
              Decline
            </Button>
            <Button
              onClick={onAccept}
              disabled={!isChecked || !hasScrolledToBottom}
              className="gap-2"
            >
              I Agree
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
