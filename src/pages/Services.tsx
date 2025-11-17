import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Smartphone, Cloud, Lock, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  slug: string;
  gradient: string;
  features: string[];
}

const services: Service[] = [
  {
    id: 1,
    title: "WPAT Testing",
    description: "Comprehensive web and mobile application penetration testing to identify vulnerabilities before attackers do.",
    icon: <Shield className="w-12 h-12" />,
    slug: "wpat-testing",
    gradient: "from-orange-500 to-red-500",
    features: ["Web Application Testing", "Mobile App Testing", "OWASP Top 10", "Detailed Reports"],
  },
  {
    id: 2,
    title: "Mobile Security Testing",
    description: "In-depth security analysis for iOS and Android applications with reverse engineering and runtime testing.",
    icon: <Smartphone className="w-12 h-12" />,
    slug: "mobile-security",
    gradient: "from-orange-600 to-pink-500",
    features: ["iOS & Android", "Static Analysis", "Dynamic Testing", "Code Review"],
  },
  {
    id: 3,
    title: "API Testing",
    description: "Thorough testing of REST, GraphQL, and SOAP APIs to ensure secure data exchange and authentication.",
    icon: <Cloud className="w-12 h-12" />,
    slug: "api-testing",
    gradient: "from-orange-500 to-yellow-500",
    features: ["REST APIs", "GraphQL Testing", "SOAP Services", "Auth Testing"],
  },
  {
    id: 4,
    title: "OWASP Top 10 Testing",
    description: "Complete assessment based on OWASP's most critical web application security risks and vulnerabilities.",
    icon: <Lock className="w-12 h-12" />,
    slug: "owasp-testing",
    gradient: "from-red-500 to-orange-600",
    features: ["Injection Testing", "XSS Detection", "Access Control", "Security Config"],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-secondary/20 to-background py-20 md:py-28 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Security Testing Services
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Protect your digital assets with comprehensive penetration testing and vulnerability assessments from certified security experts
            </p>
            <Link to="/contact">
              <Button size="lg" className="rounded-full">
                Get a Quote
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group relative bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-smooth"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5 group-hover:opacity-10 transition-smooth`} />
                
                <div className="relative p-8 md:p-10">
                  {/* Icon */}
                  <div className={`inline-flex bg-gradient-to-br ${service.gradient} text-white rounded-2xl p-4 mb-6 group-hover:scale-110 transition-smooth`}>
                    {service.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 text-lg">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <Link to={`/services/${service.slug}`}>
                    <Button className="rounded-full w-full md:w-auto group-hover:scale-105 transition-smooth">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Certified Experts</h3>
                <p className="text-muted-foreground">
                  Our team holds industry-leading certifications including CEH, OSCP, and CISSP
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Proven Methodology</h3>
                <p className="text-muted-foreground">
                  We follow industry-standard testing frameworks and best practices
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">100% Confidential</h3>
                <p className="text-muted-foreground">
                  Your data and findings are protected under strict NDA agreements
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-orange-600 rounded-3xl p-8 md:p-12 text-primary-foreground text-center shadow-card-hover">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Secure Your Application?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Get started with a free consultation and learn how we can help protect your business
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Schedule Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
