import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import * as Icons from "lucide-react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlowingLinesBackground } from "@/components/backgrounds";
import { useData } from "@/contexts/DataContext";

const ServiceDetail = () => {
  const { slug } = useParams();
  const { services, clients } = useData();

  // Find service by slug from dynamic data
  const service = services.find(s => s.slug === slug && s.isActive);

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

  // Get icon component from service.icon string
  const IconComponent = service.icon ? (Icons[service.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>) : Icons.Shield;

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
                <IconComponent className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{service.title}</h1>
              </div>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              {service.details || service.description}
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

      {/* Curriculum Section - using features from data context */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Testing Methodology</h2>
            <div className="bg-card rounded-3xl p-8 shadow-card">
              <div className="space-y-4">
                {service.features && service.features.length > 0 ? service.features.map((item: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-secondary/50 transition-colors"
                  >
                    <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                )) : (
                  <p className="text-center text-muted-foreground">Testing methodology details coming soon.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Trusted By</h2>
            <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
              {clients && clients.length > 0 ? clients.slice(0, 4).map((client, index: number) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl px-8 py-4 shadow-card font-semibold text-muted-foreground"
                >
                  {client.name}
                </div>
              )) : (
                <p className="text-muted-foreground">Trusted by leading organizations worldwide</p>
              )}
            </div>

            {/* CTA Section */}
            <div className="mt-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Secure Your Business?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get in touch with our security experts to discuss your requirements and receive a customized quote.
              </p>
              <Link to="/contact">
                <Button size="lg" className="rounded-full">
                  Request a Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
