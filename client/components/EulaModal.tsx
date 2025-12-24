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

  const eulaContent = `End-User License Agreement (EULA) for RecordSetu

Effective Date: January 1, 2024

This End-User License Agreement (EULA) is a legal agreement between you ("User", "You", "Your") and RecordSetu ("Company", "We", "Us", "Our"), governing your access to and use of the RecordSetu platform, including its web application, APIs, analytics modules, data search interfaces, and related services ("Service").

By creating an account, accessing, or using the Service, you agree to be bound by this EULA. If you do not agree, do not access or use the Service.

1. LICENSE GRANT

RecordSetu grants you a non-exclusive, non-transferable, limited, revocable license to access and use the Service strictly in accordance with this Agreement for authorized government, law-enforcement, compliance, verification, or investigative purposes only.

Unauthorized commercial resale, redistribution, or replication of any part of the platform is strictly prohibited.

2. AUTHORIZED USE

You agree to:
• Use the platform only for legitimate, lawful, and authorized data access
• Access only those datasets you are approved for by organizational admin or lawful authority
• Maintain confidentiality of any information accessed
• Ensure that access logs, records, audits, and investigation outputs are handled as per your organization's security and confidentiality norms

3. RESTRICTIONS

You shall not:
• Copy, reverse-engineer, decompile, modify, or attempt to extract source code
• Use the system for personal data profiling or surveillance without lawful authorization
• Share credentials, access tokens, or reports without written permission
• Introduce malware, attempt to break system security, or perform stress testing without approval
• Use the system to violate any privacy, compliance, or data-protection laws

Violation may result in immediate suspension.

4. ACCOUNT RESPONSIBILITY

You are responsible for maintaining account confidentiality, including login details, tokens, and session security. All activity under your account is presumed to be authorized by you.

5. DATA ACCURACY & AVAILABILITY

RecordSetu aggregates information from multiple official and open-source repositories. We do not guarantee accuracy, completeness, or real-time availability of records, data integrity of third-party datasets, or uninterrupted uptime or compatibility with all devices.

Outputs must be independently validated before use in legal proceedings.

6. INTELLECTUAL PROPERTY

All software, design, workflows, datasets, content, branding, and documentation associated with RecordSetu remain the exclusive intellectual property of the Company. No ownership rights are transferred under this Agreement.

7. COMPLIANCE & LAWFUL USE

Users must comply with the Digital Personal Data Protection Act (DPDPA), IT Act 2000/IT Rules 2021 (India), and applicable laws, regulations, and agency policies.

Unauthorized access, misuse, or breach may result in legal action.

8. TERMINATION

The Company may suspend or terminate access if:
• User breaches any terms of this Agreement
• Unauthorized use or misuse is detected
• Required by law-enforcement, court order, or compliance audit

Upon termination, access to all data, dashboards, logs, or reports will be revoked without refund.

9. WARRANTY & LIMITATION OF LIABILITY

Service is provided "as-is" and "as-available" without guarantees.

The Company shall not be liable for:
• Direct, indirect, incidental, consequential, or punitive damages
• Loss of data, revenue, or reputation
• Decisions or actions taken based on provided information

10. INDEMNIFICATION

You agree to indemnify and hold harmless the Company from any claims arising from misuse, illegal access, or violation of laws or policies by you or under your account.

11. GOVERNING LAW & DISPUTE RESOLUTION

This agreement is governed by the laws of India. Any disputes shall be resolved under arbitration in Indore, Madhya Pradesh, under the Arbitration and Conciliation Act, 1996.

12. CHANGES TO AGREEMENT

The Company may update terms periodically. Continued use after updates constitutes acceptance.

13. CONTACT INFORMATION

For questions, compliance requests, or dispute notices:
Email: support@recordsetu.com

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
