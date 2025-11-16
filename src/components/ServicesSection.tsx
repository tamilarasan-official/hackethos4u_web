import { Shield, Smartphone, Cloud, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  slug: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "WPAT Testing",
    description: "Comprehensive web and mobile application penetration testing to identify vulnerabilities.",
    icon: <Shield className="w-8 h-8" />,
    slug: "wpat-testing",
  },
  {
    id: 2,
    title: "Mobile Security Testing",
    description: "In-depth security analysis for iOS and Android applications.",
    icon: <Smartphone className="w-8 h-8" />,
    slug: "mobile-security",
  },
  {
    id: 3,
    title: "API Testing",
    description: "Thorough testing of REST, GraphQL, and SOAP APIs for security flaws.",
    icon: <Cloud className="w-8 h-8" />,
    slug: "api-testing",
  },
  {
    id: 4,
    title: "OWASP Top 10 Testing",
    description: "Complete assessment based on OWASP's most critical web application security risks.",
    icon: <Lock className="w-8 h-8" />,
    slug: "owasp-testing",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional cybersecurity testing services to protect your digital assets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const gradients = [
              "from-orange-500 to-red-500",
              "from-orange-600 to-pink-500",
              "from-orange-500 to-yellow-500",
              "from-red-500 to-orange-600",
            ];
            return (
              <div
                key={service.id}
                className="group relative bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-smooth hover:scale-105"
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-5 group-hover:opacity-10 transition-smooth`} />
                
                <div className="relative p-6">
                  <div className={`inline-flex bg-gradient-to-br ${gradients[index]} text-white rounded-2xl p-3 mb-4 group-hover:scale-110 transition-smooth`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 min-h-[60px]">
                    {service.description}
                  </p>
                  <Link to={`/services/${service.slug}`}>
                    <Button
                      variant="outline"
                      className="w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-smooth"
                    >
                      Explore Service
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
