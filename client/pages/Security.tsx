import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Lock, CheckCircle, AlertCircle } from "lucide-react";

export default function Security() {
  const securityMeasures = [
    "Multi-factor authentication (MFA) mandatory for all users",
    "Role-based access control with principle of least privilege",
    "Device binding for enhanced session security",
    "AES-256 encryption at rest for all data",
    "TLS 1.3 encryption in transit for all communications",
    "Firewall and isolated network environment",
    "Immutable hash-chain audit logs for tamper-proof accountability",
    "Regular security audits and penetration testing"
  ];

  const auditModel = [
    { label: "Action type", description: "The operation performed (search, user create, etc.)" },
    { label: "User ID", description: "Identifier of the user performing the action" },
    { label: "Case ID and justification", description: "Legal basis and case reference for the operation" },
    { label: "Timestamp", description: "Precise time of the action for audit trail" },
    { label: "Hash proof of action", description: "Cryptographic hash for integrity verification" }
  ];

  const complianceFrameworks = [
    {
      title: "Digital Personal Data Protection Act (DPDPA)",
      items: [
        "Consent and purpose limitation enforcement",
        "Data minimization principles implemented",
        "Individual rights (access, correction, deletion) where applicable",
        "Breach notification procedures documented and tested"
      ]
    },
    {
      title: "IT Act 2000 & IT Rules 2021",
      items: [
        "Reasonable security measures implemented",
        "Sensitive data encryption protocols",
        "Access logging and monitoring",
        "Data retention and deletion policies"
      ]
    },
    {
      title: "Government Compliance Standards",
      items: [
        "Alignment with NIC/CERT guidelines",
        "Compliance with Indian government data protection norms",
        "Regular third-party security assessments",
        "Incident response and disaster recovery procedures"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header variant="app" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link to="/">
          <button className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium mb-8 transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </Link>

        <article className="space-y-12">
          {/* Header Section */}
          <div className="space-y-4">
            <h1 className="text-4xl font-heading font-bold text-foreground">
              Security & Compliance
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              RecordSetu is built with government-grade security, compliance, and accountability standards.
            </p>
          </div>

          {/* Security Measures */}
          <div className="bg-white rounded-xl border border-border p-8 sm:p-12 space-y-6">
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Security Measures
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {securityMeasures.map((measure, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">{measure}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Logging Model */}
          <div className="bg-white rounded-xl border border-border p-8 sm:p-12 space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Audit Logging Model
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                RecordSetu maintains immutable audit logs with the following metadata. Search results themselves are never stored.
              </p>
            </div>

            <div className="space-y-3">
              {auditModel.map((item, index) => (
                <div key={index} className="border border-border rounded-lg p-4 flex items-start gap-4">
                  <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Zero Data Storage</h3>
                <p className="text-sm text-blue-800">
                  Search results and fetched records are not stored. Only metadata and cryptographic proofs are maintained.
                </p>
              </div>
            </div>
          </div>

          {/* Compliance Frameworks */}
          <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Compliance Frameworks
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {complianceFrameworks.map((framework, index) => (
                <div key={index} className="bg-white rounded-xl border border-border p-6 space-y-4">
                  <h3 className="font-heading font-bold text-foreground flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    {framework.title}
                  </h3>
                  <ul className="space-y-2">
                    {framework.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-secondary font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Data Breach Policy */}
          <div className="bg-white rounded-xl border border-border p-8 sm:p-12 space-y-6">
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Data Breach Response Policy
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-primary font-semibold text-sm flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-foreground">Containment</h3>
                  <p className="text-sm text-muted-foreground mt-1">Immediate containment and isolation within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-primary font-semibold text-sm flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-foreground">Notification</h3>
                  <p className="text-sm text-muted-foreground mt-1">Notification to impacted agencies and CERT-In as required</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-primary font-semibold text-sm flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-foreground">Investigation & Remediation</h3>
                  <p className="text-sm text-muted-foreground mt-1">Root cause analysis and corrective action plan within 72 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          {/* <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl border border-primary/20 p-8 text-center space-y-4">
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Learn More About Our Security Infrastructure
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Contact our security team for detailed security documentation and compliance certifications.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">Schedule Security Briefing</Button>
              </Link>
            </div>
          </div> */}
        </article>
      </div>
    </div>
  );
}
