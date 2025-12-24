import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Database, Lock } from "lucide-react";

export default function Datasets() {
  const datasets = [
    {
      category: "Identity & KYC",
      items: [
        "PAN verification and details",
        "PAN-Aadhaar link status",
        "Voter ID and electoral data",
        "Driving License verification",
        "Identity validation across databases"
      ]
    },
    {
      category: "Financial & Tax",
      items: [
        "GSTIN information and status",
        "GST return filing history",
        "Income tax records and filing status",
        "Bank account verification",
        "UPI and mobile payment linkage",
        "Financial fraud indicators"
      ]
    },
    {
      category: "Corporate & Registry",
      items: [
        "Corporate MCA director records",
        "Company registration details",
        "Incorporation and status history",
        "Director and shareholder information",
        "Corporate structure verification",
        "Shell entity identification patterns"
      ]
    },
    {
      category: "Telecom & Infrastructure",
      items: [
        "Telecom subscriber information",
        "SIM and phone number linkage",
        "Mobile to address mapping",
        "Telecom fraud indicators",
        "Number portability records"
      ]
    },
    {
      category: "Vehicle & Transportation",
      items: [
        "Vehicle registration details",
        "Registration Certificate (RC) lookup",
        "Vehicle to owner mapping",
        "FASTag and vehicle linkage",
        "Insurance and pollution clearance status",
        "Logistics trail verification"
      ]
    },
    {
      category: "Bulk & Advanced Processing",
      items: [
        "Batch query processing",
        "Bulk verification workflows",
        "Multi-record simultaneous search",
        "Property and asset records search",
        "Cross-database correlation"
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
              Supported Datasets
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Depends on agency permissions. RecordSetu provides access to a comprehensive range of government and statutory datasets.
            </p>
          </div>

          {/* Important Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex items-start gap-4">
            <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Access Control</h3>
              <p className="text-sm text-blue-800">
                Each agency has specific dataset permissions assigned during onboarding. Additional datasets are available through licensed integrations and government partnerships.
              </p>
            </div>
          </div>

          {/* Datasets Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {datasets.map((dataset, index) => (
              <div key={index} className="bg-white rounded-xl border border-border p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-heading font-bold text-foreground">
                    {dataset.category}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {dataset.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-xl border border-border p-8 sm:p-12 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                About Dataset Access
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                RecordSetu maintains partnerships with authorized government ministries, departments, and statutory authorities to provide real-time, accurate dataset access. All integrations are compliant with DPDP Act 2023, IT Act 2000, and relevant government regulations.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Data Accuracy & Governance
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Datasets are sourced directly from official government repositories and are updated in real-time. RecordSetu does not cache or store permanent copies of search results. Each query returns live data with cryptographic proof of source and timestamp, ensuring accuracy and authenticity for investigative and compliance purposes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Custom Dataset Integration
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Agencies with unique requirements can request custom dataset integrations. RecordSetu works with government authorities to securely integrate additional data sources while maintaining compliance and security standards. Contact our team to discuss specialized dataset needs.
              </p>
            </section>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl border border-primary/20 p-8 text-center space-y-4">
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Access the Datasets Your Agency Needs
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Contact us to discuss dataset requirements and access permissions for your organization.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">Request Access</Button>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
