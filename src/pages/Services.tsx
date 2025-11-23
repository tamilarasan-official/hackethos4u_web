import Header from "@/components/Header";
import Footer from "@/components/Footer";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Link, useLocation } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { TechBackground, GridBackground, FlowingLinesBackground, ParticleBackground } from "@/components/backgrounds";
import SEO, { organizationSchema, createBreadcrumbSchema, professionalServiceSchema } from "@/components/SEO";

const Services = () => {
  const { services, clients, addContact } = useData();
  const activeServices = services.filter((s) => s.isActive);
  const location = useLocation();

  const breadcrumbs = createBreadcrumbSchema([
    { name: "Home", url: "https://hackethos4u.com/" },
    { name: "Services", url: "https://hackethos4u.com/services" }
  ]);

  // Auto-scroll to contact form if hash is present
  useEffect(() => {
    if (location.hash === '#contact') {
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Find the service name from slug
      const selectedService = activeServices.find(s => s.slug === formData.service);
      const serviceTitle = selectedService ? selectedService.title : formData.service;

      await addContact({
        name: formData.name,
        email: formData.email,
        phone: formData.company, // Using company field temporarily for additional info
        message: `Company: ${formData.company}\n\nService Interested: ${serviceTitle}\n\nMessage:\n${formData.message}`,
        source: 'services',
        serviceInterested: serviceTitle,
        status: 'new',
        date: new Date().toISOString(),
      });

      toast.success("Quote Request Sent!", {
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        message: "",
      });
    } catch (error) {
      console.error('Error submitting quote request:', error);
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const Icon = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
    return Icon ? <Icon className="w-12 h-12" /> : <Icons.Shield className="w-12 h-12" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Professional VAPT & Cybersecurity Services India | Hackethos4U"
        description="Expert penetration testing services: WPAT (Web Application), Mobile Security Testing, API Security Assessment, and OWASP Top 10 Vulnerability Testing. 🛡️ ISO certified security audits. 🎯 100+ successful pentests. Secure your business with professional security experts in Hyderabad, India. Get free security consultation."
        keywords="VAPT services India, penetration testing company Hyderabad, web application penetration testing, mobile app security testing, API security assessment, OWASP top 10 testing, vulnerability assessment services, security audit India, ethical hacking services, red team assessment, security compliance testing, PCI DSS compliance testing, GDPR security audit, application security testing, network penetration testing, cloud security testing"
        canonical="https://hackethos4u.com/services"
        structuredData={[organizationSchema, breadcrumbs, professionalServiceSchema]}
      />
      <Header />

      <div className="pt-16 md:pt-20">
      {/* Hero Section with Professional Grid */}
      <section className="relative hero-grid py-24 md:py-32 overflow-hidden">
        <FlowingLinesBackground variant="circuit" direction="ltr" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Icons.Shield className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-semibold tracking-wide">
                PROFESSIONAL SECURITY TESTING
              </span>
            </div>
            <h1 className="mb-6">
              Secure Your <span className="text-primary">Digital Assets</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Comprehensive penetration testing and vulnerability assessments from certified security experts to protect your business
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="#contact">
                <Button size="lg" className="rounded-full px-8 bg-primary text-black hover:bg-primary/90 font-semibold shadow-lg">
                  Get a Free Quote
                  <Icons.ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="rounded-full px-8 border-white/20 hover:border-primary/50 hover:bg-white/5">
                  Talk to Expert
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-20 md:py-28 bg-background">
        <FlowingLinesBackground variant="wave" direction="rtl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="mb-4">Our Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive security testing services tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {activeServices.map((service) => (
              <div
                key={service.id}
                className="group card-sleek p-8 relative overflow-hidden hover:border-white/20 transition-all duration-300"
              >
                {/* Icon */}
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-all duration-300 text-white relative z-10">
                  <div className="group-hover:scale-105 transition-transform duration-300">
                    {getIconComponent(service.icon)}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2.5 mb-8">
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Icons.Check className="w-4 h-4 text-white/60 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <Link to={`/services/${service.slug}`}>
                    <Button
                      className="w-full rounded-full bg-white/5 text-white border border-white/10 hover:bg-primary hover:text-black hover:border-primary font-semibold transition-all duration-300 group/btn"
                    >
                      Learn More
                      <Icons.ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      {clients.length > 0 && (
        <section className="relative py-16 md:py-20 bg-secondary/30">
          <FlowingLinesBackground variant="circuit" direction="ltr" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Trusted By Industry Leaders</h2>
              <p className="text-muted-foreground">
                Partnering with leading organizations to secure their digital infrastructure
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto items-center">
              {clients.map((client) => {
                const CardContent = (
                  <>
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-12 w-auto opacity-70 hover:opacity-100 transition-opacity"
                    />
                    <span className="text-sm text-muted-foreground font-medium text-center">
                      {client.name}
                    </span>
                  </>
                );

                return client.website ? (
                  <a
                    key={client.id}
                    href={client.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-6 bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 gap-3 cursor-pointer"
                  >
                    {CardContent}
                  </a>
                ) : (
                  <div
                    key={client.id}
                    className="flex flex-col items-center justify-center p-6 bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 gap-3"
                  >
                    {CardContent}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="relative py-16 md:py-24">
        <FlowingLinesBackground variant="wave" direction="rtl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border-l-2 border-primary pl-6">
                <h3 className="text-xl font-bold mb-3 text-primary">Certified Experts</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Our team holds industry-leading certifications including CEH, OSCP, and CISSP with years of practical experience
                </p>
              </div>
              <div className="border-l-2 border-primary pl-6">
                <h3 className="text-xl font-bold mb-3 text-primary">Proven Methodology</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  We follow industry-standard testing frameworks including OWASP, NIST, and PTES for comprehensive assessments
                </p>
              </div>
              <div className="border-l-2 border-primary pl-6">
                <h3 className="text-xl font-bold mb-3 text-primary">100% Confidential</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Your data and findings are protected under strict NDA agreements with enterprise-grade security protocols
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="relative py-16 md:py-24 bg-secondary/30">
        <FlowingLinesBackground variant="circuit" direction="ltr" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get a Free Quote</h2>
              <p className="text-lg text-muted-foreground">
                Tell us about your security needs and we'll get back to you within 24 hours
              </p>
            </div>

            <div className="card-sleek p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white" htmlFor="name">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      className="rounded-lg bg-black border-white/10 focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white" htmlFor="email">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      required
                      className="rounded-lg bg-black border-white/10 focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white" htmlFor="company">
                      Company Name
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Enter your company name"
                      className="rounded-lg bg-black border-white/10 focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white" htmlFor="service">
                      Service Interested In *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-black text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                    >
                      <option value="">Select a service</option>
                      {activeServices.map((service) => (
                        <option key={service.id} value={service.slug}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white" htmlFor="message">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your security requirements..."
                    rows={5}
                    required
                    className="rounded-lg bg-black border-white/10 focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="rounded-full w-full md:w-auto px-8 bg-primary text-black hover:bg-primary/90 font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Quote Request"}
                  {!isSubmitting && <Icons.Send className="w-4 h-4 ml-2" />}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-20">
        <FlowingLinesBackground variant="wave" direction="rtl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary via-accent to-primary rounded-3xl p-8 md:p-12 text-black text-center shadow-2xl relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Secure Your Application?
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Get started with a free consultation and learn how we can help protect your business from cyber threats
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="#contact">
                  <Button
                    size="lg"
                    className="rounded-full bg-black text-white hover:bg-black/90 shadow-xl font-semibold"
                  >
                    Schedule Consultation
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-2 border-black text-black bg-black/5 hover:bg-black hover:text-white font-semibold"
                  >
                    Contact Us
                  </Button>
                </Link>
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

export default Services;
