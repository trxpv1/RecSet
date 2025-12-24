import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Gift, Users, BarChart3, Award } from "lucide-react";

export default function Pilot() {
  const benefits = [
    {
      icon: Gift,
      title: "200 Free Credits",
      description: "Complimentary search credits for 60 days to evaluate the platform"
    },
    {
      icon: Users,
      title: "10 Authorized Officers",
      description: "Access for up to 10 officers from your agency during the pilot period"
    },
    {
      icon: Award,
      title: "Dedicated Training",
      description: "Comprehensive onboarding session and hands-on training for your team"
    },
    {
      icon: BarChart3,
      title: "Success Metrics Report",
      description: "Hash-based audit report issued at end of pilot with usage analytics"
    }
  ];

  const successMetrics = [
    "Daily usage and credits consumed",
    "Case ID linked search outcomes",
    "Time-efficiency improvement indicators",
    "User adoption and team feedback",
    "Integration and workflow assessments"
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
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-heading font-bold text-foreground">
              RecordSetu Pilot Program
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Evaluate RecordSetu with your team at no cost. Get 200 free credits and dedicated support for 60 days.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white rounded-xl border border-border p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Program Details */}
          <div className="bg-white rounded-xl border border-border p-8 sm:p-12 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                What's Included in the Pilot
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-primary/10 text-primary rounded-full text-sm font-semibold flex-shrink-0">✓</span>
                  <span className="text-muted-foreground"><span className="font-semibold text-foreground">200 complimentary credits</span> for 60 days</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-primary/10 text-primary rounded-full text-sm font-semibold flex-shrink-0">✓</span>
                  <span className="text-muted-foreground"><span className="font-semibold text-foreground">Full platform access</span> to all available datasets</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-primary/10 text-primary rounded-full text-sm font-semibold flex-shrink-0">✓</span>
                  <span className="text-muted-foreground"><span className="font-semibold text-foreground">Dedicated training session</span> for up to 10 officers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-primary/10 text-primary rounded-full text-sm font-semibold flex-shrink-0">✓</span>
                  <span className="text-muted-foreground"><span className="font-semibold text-foreground">Priority support</span> during pilot period</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-primary/10 text-primary rounded-full text-sm font-semibold flex-shrink-0">✓</span>
                  <span className="text-muted-foreground"><span className="font-semibold text-foreground">Usage analytics and reporting</span> tools</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-primary/10 text-primary rounded-full text-sm font-semibold flex-shrink-0">✓</span>
                  <span className="text-muted-foreground"><span className="font-semibold text-foreground">Audit report</span> issued at pilot completion</span>
                </li>
              </ul>
            </section>

            <section className="border-t border-border pt-8 space-y-4">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Success Metrics Tracked
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We track key metrics during your pilot to measure value and inform your implementation decisions.
              </p>
              <ul className="grid md:grid-cols-2 gap-3">
                {successMetrics.map((metric, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">{metric}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="border-t border-border pt-8 space-y-4">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Pilot Program Timeline
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-secondary/10 rounded-full text-secondary font-semibold text-sm flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Day 1: Onboarding</h3>
                    <p className="text-sm text-muted-foreground mt-1">Welcome session and team setup with 10 authorized officers</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-secondary/10 rounded-full text-secondary font-semibold text-sm flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Days 2-7: Training</h3>
                    <p className="text-sm text-muted-foreground mt-1">Hands-on training on platform features, datasets, and workflows</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-secondary/10 rounded-full text-secondary font-semibold text-sm flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Days 8-55: Active Testing</h3>
                    <p className="text-sm text-muted-foreground mt-1">Your team uses RecordSetu with 200 credits in real investigations</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-secondary/10 rounded-full text-secondary font-semibold text-sm flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Day 60: Final Report</h3>
                    <p className="text-sm text-muted-foreground mt-1">Receive comprehensive audit report and transition planning</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-t border-border pt-8 space-y-4">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                After the Pilot
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                After successful pilot evaluation, agencies typically transition to a paid subscription with options to purchase credits based on their usage patterns. There is no obligation to continue after the pilot period.
              </p>
            </section>
          </div>

          {/* Eligibility */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-3">
            <h3 className="font-semibold text-blue-900">Pilot Program Eligibility</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Verified government agencies and law enforcement organizations</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Departments with legitimate investigative or compliance requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Commitment from at least one authorized senior officer for oversight</span>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl border border-primary/20 p-8 text-center space-y-4">
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Ready to Try RecordSetu Risk-Free?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Apply for the pilot program and get 200 free credits for 60 days with full support and training.
            </p>
            <Link to="/contact">
              <Button size="lg">Apply for Pilot Program</Button>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
