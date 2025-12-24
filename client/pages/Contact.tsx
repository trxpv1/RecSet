import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    agencyName: "",
    designation: "",
    email: "",
    phone: "",
    useCase: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        agencyName: "",
        designation: "",
        email: "",
        phone: "",
        useCase: ""
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header variant="app" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        {/* <Link to="/">
          <button className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium mb-8 transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </Link> */}

        <article className="space-y-12">
          {/* Header Section */}
          <div className="space-y-4">
            <h1 className="text-4xl font-heading font-bold text-foreground">
              Contact RecordSetu
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              For authorized agency onboarding, demonstrations, and support inquiries.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Contact Info Cards */}
            <div className="bg-white rounded-xl border border-border p-6 space-y-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">General Inquiries</h3>
              <a href="mailto:support@recordsetu.com" className="text-primary hover:text-primary/80 transition">
                support@recordsetu.com
              </a>
            </div>

            <div className="bg-white rounded-xl border border-border p-6 space-y-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground">Support</h3>
              <a href="https://wa.me/+919303556894" className="text-secondary hover:text-secondary/80 transition">
                +91 9303556894
              </a>
            </div>

            {/* <div className="bg-white rounded-xl border border-border p-6 space-y-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Organization</h3>
              <p className="text-sm text-muted-foreground">
                TRAP Intelligence Pvt. Ltd.
              </p>
            </div> */}
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl border border-border p-8 sm:p-12 space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Request a Demo or Access
              </h2>
              <p className="text-muted-foreground">
                Fill out the form below and our team will contact you within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-6 text-center space-y-2">
                <h3 className="font-semibold text-secondary text-lg">Thank You!</h3>
                <p className="text-sm text-muted-foreground">
                  Your request has been received. Our team will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agencyName" className="text-sm font-medium">
                      Agency Name *
                    </Label>
                    <Input
                      id="agencyName"
                      name="agencyName"
                      placeholder="Your agency or department"
                      value={formData.agencyName}
                      onChange={handleChange}
                      required
                      className="h-10"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="designation" className="text-sm font-medium">
                      Designation *
                    </Label>
                    <Input
                      id="designation"
                      name="designation"
                      placeholder="Your official designation"
                      value={formData.designation}
                      onChange={handleChange}
                      required
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="h-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Official Email ID *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@agency.gov.in"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="useCase" className="text-sm font-medium">
                    Reason for Access / Use Case *
                  </Label>
                  <textarea
                    id="useCase"
                    name="useCase"
                    placeholder="Describe your agency's investigative or compliance requirements..."
                    value={formData.useCase}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-foreground placeholder-muted-foreground"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Submit Request
                </Button>
              </form>
            )}
          </div>

          {/* FAQ Section */}
          {/* <div className="bg-white rounded-xl border border-border p-8 sm:p-12 space-y-6">
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Common Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">How long does onboarding take?</h3>
                <p className="text-muted-foreground text-sm">
                  Typical onboarding takes 5-10 business days from request submission, including identity verification and agency authorization.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">What documentation is required?</h3>
                <p className="text-muted-foreground text-sm">
                  You'll need official agency identification, authorized signatory details, and a letter of authorization from your department head.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Is there a trial period?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes! We offer a 60-day pilot program with 200 complimentary credits. See our Pilot Program page for details.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Can I demo RecordSetu before committing?</h3>
                <p className="text-muted-foreground text-sm">
                  Absolutely. Our team offers live demonstrations tailored to your agency's specific requirements and use cases.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">What support is available?</h3>
                <p className="text-muted-foreground text-sm">
                  We provide 24/7 technical support, dedicated account management, regular training sessions, and comprehensive documentation.
                </p>
              </div>
            </div>
          </div> */}

          {/* Privacy Notice */}
          {/* <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-3">
            <h3 className="font-semibold text-blue-900">Privacy Notice</h3>
            <p className="text-sm text-blue-800">
              Your contact information will be used solely for agency onboarding and product communication. We respect your privacy and will not share your information with third parties. See our <Link to="/privacy" className="underline hover:no-underline">Privacy Policy</Link> for more details.
            </p>
          </div> */}
        </article>
      </div>
    </div>
  );
}
