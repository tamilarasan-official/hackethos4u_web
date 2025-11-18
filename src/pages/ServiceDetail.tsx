import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, CheckCircle, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FlowingLinesBackground } from "@/components/backgrounds";

interface ServiceData {
  title: string;
  description: string;
  icon: React.ComponentType;
  features: string[];
  curriculum: string[];
  clients: string[];
}

const serviceData: Record<string, ServiceData> = {
  "wpat-testing": {
    title: "Web & Mobile Application Penetration Testing",
    description: "Comprehensive security testing for web and mobile applications to identify and remediate vulnerabilities before they can be exploited.",
    icon: Shield,
    features: [
      "Complete vulnerability assessment",
      "Manual and automated testing",
      "OWASP Top 10 coverage",
      "Detailed remediation guidance",
      "Executive and technical reports",
      "Retest verification included",
    ],
    curriculum: [
      "Reconnaissance and Information Gathering",
      "Authentication and Session Management Testing",
      "Business Logic Vulnerabilities",
      "Input Validation and Injection Flaws",
      "Client-Side Security Testing",
      "API Security Assessment",
    ],
    clients: ["TechCorp", "FinanceApp", "HealthSystems", "E-Commerce Ltd"],
  },
  "mobile-security": {
    title: "Mobile Security Testing",
    description: "In-depth security analysis for iOS and Android applications covering all aspects of mobile security.",
    icon: Shield,
    features: [
      "iOS and Android testing",
      "Static and dynamic analysis",
      "Reverse engineering",
      "Network traffic analysis",
      "Data storage security",
      "Runtime manipulation testing",
    ],
    curriculum: [
      "Mobile App Architecture Analysis",
      "Secure Data Storage Testing",
      "Network Communication Security",
      "Authentication Mechanisms",
      "Code Obfuscation Analysis",
      "Platform-Specific Vulnerabilities",
    ],
    clients: ["MobileBank", "SocialApp", "DeliveryService", "FitnessTracker"],
  },
  "api-testing": {
    title: "API Security Testing",
    description: "Thorough testing of REST, GraphQL, and SOAP APIs to ensure secure data exchange and prevent unauthorized access.",
    icon: Shield,
    features: [
      "REST, GraphQL, SOAP testing",
      "Authentication bypass testing",
      "Rate limiting assessment",
      "Input validation testing",
      "Business logic flaws",
      "API documentation review",
    ],
    curriculum: [
      "API Architecture Review",
      "Authentication and Authorization",
      "Input Validation and Sanitization",
      "Rate Limiting and DoS Protection",
      "Error Handling and Information Disclosure",
      "Business Logic Vulnerabilities",
    ],
    clients: ["PaymentGateway", "CloudService", "DataPlatform", "IntegrationHub"],
  },
  "owasp-testing": {
    title: "OWASP Top 10 Security Testing",
    description: "Complete assessment based on OWASP's most critical web application security risks.",
    icon: Shield,
    features: [
      "All OWASP Top 10 coverage",
      "Injection attack testing",
      "Broken authentication testing",
      "Sensitive data exposure",
      "Security misconfiguration",
      "XSS and XXE testing",
    ],
    curriculum: [
      "Injection Vulnerabilities",
      "Broken Authentication",
      "Sensitive Data Exposure",
      "XML External Entities (XXE)",
      "Broken Access Control",
      "Security Misconfiguration",
    ],
    clients: ["WebPortal", "EnterpriseApp", "SaaSPlatform", "CustomerPortal"],
  },
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = slug ? serviceData[slug] : null;

  if (!service) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-8">The service you're looking for doesn't exist.</p>
          <Link to="/services">
            <Button className="rounded-full">Back to Services</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-background grid-background">
      <Header />

      <div className="pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative hero-grid py-16 md:py-24 overflow-hidden">
        <FlowingLinesBackground variant="circuit" direction="ltr" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary/10 text-primary rounded-2xl p-4">
                <Icon className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{service.title}</h1>
              </div>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="rounded-full">
                  Get a Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">What's Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Testing Methodology</h2>
            <div className="bg-card rounded-3xl p-8 shadow-card">
              <div className="space-y-4">
                {service.curriculum.map((item: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-secondary/50 transition-colors"
                  >
                    <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Trusted By</h2>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {service.clients.map((client: string, index: number) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl px-8 py-4 shadow-card font-semibold text-muted-foreground"
                >
                  {client}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-card rounded-3xl p-8 shadow-card">
            <h2 className="text-3xl font-bold mb-6 text-center">Request a Quote</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input placeholder="Your name" className="rounded-2xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company</label>
                  <Input placeholder="Company name" className="rounded-2xl" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="your.email@example.com" className="rounded-2xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input type="tel" placeholder="+91 XXXXX XXXXX" className="rounded-2xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Requirements</label>
                <Textarea
                  placeholder="Tell us about your security testing needs..."
                  className="rounded-2xl min-h-[120px]"
                />
              </div>
              <Button className="w-full rounded-full" size="lg">
                Submit Request
              </Button>
            </form>
          </div>
        </div>
      </section>
      </div>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
