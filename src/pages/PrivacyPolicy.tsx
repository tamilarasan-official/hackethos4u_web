import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, Database, UserCheck, Mail } from "lucide-react";
import { FlowingLinesBackground } from "@/components/backgrounds";
import SEO, { organizationSchema, createBreadcrumbSchema } from "@/components/SEO";

const PrivacyPolicy = () => {
  const breadcrumbs = createBreadcrumbSchema([
    { name: "Home", url: "https://hackethos4u.com/" },
    { name: "Privacy Policy", url: "https://hackethos4u.com/privacy-policy" }
  ]);

  return (
    <div className="min-h-screen bg-background grid-background">
      <SEO
        title="Privacy Policy - Hackethos4U"
        description="Learn how Hackethos4U collects, uses, and protects your personal information. Our privacy policy outlines our commitment to safeguarding your data."
        keywords="privacy policy, data protection, hackethos4u privacy, personal information security, GDPR compliance"
        canonical="https://hackethos4u.com/privacy-policy"
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
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-semibold tracking-wide">
                  LEGAL
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                Privacy <span className="text-primary">Policy</span>
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

                {/* Introduction */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                      <Eye className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">Introduction</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    At Hackethos4U, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this policy carefully to understand our practices regarding your personal data.
                  </p>
                </div>

                {/* Information We Collect */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                      <Database className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">Information We Collect</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p><strong className="text-foreground">Personal Information:</strong> When you register for our courses, contact us, or use our services, we may collect personal information such as:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>Name and contact details (email address, phone number)</li>
                      <li>Billing and payment information</li>
                      <li>Educational background and professional experience</li>
                      <li>Communication preferences</li>
                    </ul>
                    <p><strong className="text-foreground">Automatically Collected Information:</strong> We automatically collect certain information when you visit our website, including:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>IP address and browser type</li>
                      <li>Device information and operating system</li>
                      <li>Pages visited and time spent on our site</li>
                      <li>Referring website addresses</li>
                    </ul>
                  </div>
                </div>

                {/* How We Use Your Information */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                      <UserCheck className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">How We Use Your Information</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>We use the information we collect for various purposes, including:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>Providing and maintaining our cybersecurity training services</li>
                      <li>Processing your course enrollments and payments</li>
                      <li>Sending you course materials, updates, and certifications</li>
                      <li>Responding to your inquiries and providing customer support</li>
                      <li>Improving our website and services based on usage patterns</li>
                      <li>Sending promotional communications (with your consent)</li>
                      <li>Complying with legal obligations</li>
                    </ul>
                  </div>
                </div>

                {/* Data Security */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                      <Lock className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">Data Security</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, and regular security assessments. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </div>

                {/* Third-Party Sharing */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">Third-Party Sharing</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>Service providers who assist us in operating our website and services</li>
                      <li>Payment processors for secure transaction handling</li>
                      <li>Legal authorities when required by law or to protect our rights</li>
                    </ul>
                  </div>
                </div>

                {/* Your Rights */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                      <UserCheck className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">Your Rights</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>You have the following rights regarding your personal information:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>Access and obtain a copy of your personal data</li>
                      <li>Request correction of inaccurate information</li>
                      <li>Request deletion of your personal data</li>
                      <li>Opt-out of marketing communications</li>
                      <li>Withdraw consent at any time</li>
                    </ul>
                  </div>
                </div>

                {/* Cookies */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                      <Database className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">Cookies</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device that help us remember your preferences and understand how you use our site. You can control cookie settings through your browser, but disabling cookies may affect certain features of our website.
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
                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <div className="mt-4 p-4 rounded-xl bg-secondary/50 border border-border">
                    <p className="text-foreground font-medium">Hackethos4U</p>
                    <p className="text-muted-foreground">Email: maniteja.thagaram@hackethos4u.com</p>
                    <p className="text-muted-foreground">Phone: +91 8008593735</p>
                    <p className="text-muted-foreground">Address: 9G8C+PRQ, Dilsukhnagar, Hyderabad, Telangana</p>
                  </div>
                </div>

                {/* Changes to Policy */}
                <div className="pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of our services after any modifications indicates your acceptance of the updated Privacy Policy.
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

export default PrivacyPolicy;
