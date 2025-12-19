import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, BookOpen, CreditCard, AlertTriangle, Scale, Ban, RefreshCw, Mail } from "lucide-react";
import { FlowingLinesBackground } from "@/components/backgrounds";
import SEO, { organizationSchema, createBreadcrumbSchema } from "@/components/SEO";

const TermsAndConditions = () => {
  const breadcrumbs = createBreadcrumbSchema([
    { name: "Home", url: "https://hackethos4u.com/" },
    { name: "Terms and Conditions", url: "https://hackethos4u.com/terms-and-conditions" }
  ]);

  return (
    <div className="min-h-screen bg-background grid-background">
      <SEO
        title="Terms and Conditions - Hackethos4U"
        description="Read the terms and conditions for using Hackethos4U cybersecurity training services. Understand your rights and obligations when using our platform."
        keywords="terms and conditions, user agreement, hackethos4u terms, service agreement, legal terms"
        canonical="https://hackethos4u.com/terms-and-conditions"
        structuredData={[organizationSchema, breadcrumbs]}
      />
      <Header />

      <div className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative hero-grid py-16 md:py-24 overflow-hidden">
          <FlowingLinesBackground variant="circuit" direction="ltr" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-semibold tracking-wide">
                  LEGAL
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                Terms and <span className="text-primary">Conditions</span>
              </h1>
              <p className="text-muted-foreground">
                Last updated: December 2024
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="relative py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-3xl p-6 md:p-10 shadow-card space-y-8">

                {/* Agreement */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                      <Scale className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">Agreement to Terms</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing or using the Hackethos4U website and services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services. These terms apply to all visitors, users, and others who access or use our services.
                  </p>
                </div>

                {/* Services */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">Our Services</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>Hackethos4U provides cybersecurity training courses and VAPT (Vulnerability Assessment and Penetration Testing) services. Our services include:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>Online and offline cybersecurity training courses</li>
                      <li>Ethical hacking and penetration testing courses</li>
                      <li>Professional VAPT services for businesses</li>
                      <li>Security consultation and assessment</li>
                      <li>Certification preparation programs</li>
                    </ul>
                  </div>
                </div>

                {/* User Responsibilities */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                      <AlertTriangle className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">User Responsibilities</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>As a user of our services, you agree to:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>Provide accurate and complete information during registration</li>
                      <li>Maintain the confidentiality of your account credentials</li>
                      <li>Use the knowledge gained ethically and legally</li>
                      <li>Not share course materials or content without authorization</li>
                      <li>Not engage in any illegal hacking activities</li>
                      <li>Respect intellectual property rights</li>
                      <li>Follow responsible disclosure practices</li>
                    </ul>
                  </div>
                </div>

                {/* Ethical Use */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                      <Ban className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">Ethical Use Policy</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p className="font-medium text-foreground">Important: Our training is intended for ethical and legal purposes only.</p>
                    <p>You must NOT use the skills and knowledge acquired through our courses to:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>Access systems without proper authorization</li>
                      <li>Steal, damage, or manipulate data</li>
                      <li>Conduct attacks on any system you don't own or have permission to test</li>
                      <li>Engage in any form of cybercrime</li>
                      <li>Harm individuals, organizations, or infrastructure</li>
                    </ul>
                    <p>Hackethos4U is not responsible for any misuse of the knowledge gained through our training programs.</p>
                  </div>
                </div>

                {/* Payment Terms */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                      <CreditCard className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">Payment Terms</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>All course fees must be paid in full before accessing the course content</li>
                      <li>Prices are subject to change without prior notice</li>
                      <li>Payment can be made through our accepted payment methods</li>
                      <li>All transactions are processed securely</li>
                      <li>GST and other applicable taxes are included in the displayed prices unless stated otherwise</li>
                    </ul>
                  </div>
                </div>

                {/* Refund Policy */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                      <RefreshCw className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">Refund Policy</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>Refund requests must be made within 7 days of purchase</li>
                      <li>Refunds are not available after accessing more than 20% of the course content</li>
                      <li>No refunds for completed courses or downloaded materials</li>
                      <li>Refund processing may take 7-14 business days</li>
                      <li>Special offers and discounted courses may have different refund terms</li>
                    </ul>
                  </div>
                </div>

                {/* Intellectual Property */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">Intellectual Property</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    All content on this website, including but not limited to text, graphics, logos, images, videos, course materials, and software, is the property of Hackethos4U and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our prior written consent.
                  </p>
                </div>

                {/* Limitation of Liability */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                      <Scale className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">Limitation of Liability</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Hackethos4U shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability shall not exceed the amount paid by you for the specific service in question. We do not guarantee specific outcomes from our training programs.
                  </p>
                </div>

                {/* Governing Law */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                      <Scale className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">Governing Law</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.
                  </p>
                </div>

                {/* Contact Us */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">Contact Us</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about these Terms and Conditions, please contact us at:
                  </p>
                  <div className="mt-4 p-4 rounded-xl bg-secondary/50 border border-border">
                    <p className="text-foreground font-medium">Hackethos4U</p>
                    <p className="text-muted-foreground">Email: maniteja.thagaram@hackethos4u.com</p>
                    <p className="text-muted-foreground">Phone: +91 8008593735</p>
                    <p className="text-muted-foreground">Address: 9G8C+PRQ, Dilsukhnagar, Hyderabad, Telangana</p>
                  </div>
                </div>

                {/* Changes to Terms */}
                <div className="pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on this page. Your continued use of our services after any modifications indicates your acceptance of the updated terms. We encourage you to review these terms periodically.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
