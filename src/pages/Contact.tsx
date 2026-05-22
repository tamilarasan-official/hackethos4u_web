import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { TechBackground, GridBackground, FlowingLinesBackground, ParticleBackground } from "@/components/backgrounds";
import { useData } from "@/contexts/DataContext";
import SEO, { organizationSchema, localBusinessSchema, createBreadcrumbSchema } from "@/components/SEO";

const Contact = () => {
  const { toast } = useToast();
  const { addContact } = useData();

  const breadcrumbs = createBreadcrumbSchema([
    { name: "Home", url: "https://hackethos4u.com/" },
    { name: "Contact", url: "https://hackethos4u.com/contact" }
  ]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "Course Inquiry",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      await addContact({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        message: `[${formData.subject}] ${formData.message}`,
        source: 'contact-page',
        status: 'new',
        date: new Date().toISOString(),
      });

      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "Course Inquiry",
        message: "",
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-background grid-background">
      <SEO
        title="Contact Us - Expert Cybersecurity Solutions in Hyderabad | Hackethos4U"
        description="Contact Hackethos4U for professional VAPT services, cybersecurity training inquiries, or security consulting. 📍 Located in Dilsukhnagar, Hyderabad, India. 📞 Call +91-8008593735 or ✉️ email maniteja.thagaram@hackethos4u.com. 🕐 Available Mon-Sat, 9 AM - 6 PM. Get free security consultation and course guidance."
        keywords="contact hackethos4u, cybersecurity contact Hyderabad, VAPT inquiry India, security training contact, penetration testing quote, Hyderabad cybersecurity company, security consultation, cyber security course inquiry, ethical hacking training contact, VAPT services quote, security audit contact"
        canonical="https://hackethos4u.com/contact"
        structuredData={[organizationSchema, localBusinessSchema, breadcrumbs]}
      />
      <Header />

      <div className="pt-16 md:pt-20">
      {/* Hero Section with Professional Grid */}
      <section className="relative hero-grid py-24 md:py-32 overflow-hidden">
        <FlowingLinesBackground variant="circuit" direction="ltr" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-semibold tracking-wide">
                CONTACT US
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Get <span className="text-primary">In Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Have questions? We're here to help you start your cybersecurity journey
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-16 md:py-24">
        <FlowingLinesBackground variant="wave" direction="rtl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="card-sleek p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-primary/10 text-primary rounded-lg p-2.5 border border-primary/20">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold">Send us a message</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">First Name *</label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Enter your first name"
                      className="rounded-lg bg-black border-white/10 focus:border-primary focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Last Name</label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Enter your last name"
                      className="rounded-lg bg-black border-white/10 focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="rounded-lg bg-black border-white/10 focus:border-primary focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Phone</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="rounded-lg bg-black border-white/10 focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-black text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                  >
                    <option>Course Inquiry</option>
                    <option>Service Inquiry</option>
                    <option>Partnership</option>
                    <option>General Question</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Message *</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we can help you..."
                    className="rounded-lg min-h-[120px] bg-black border-white/10 focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-primary text-black hover:bg-primary/90 font-semibold"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {submitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Contact Details */}
              <div className="card-sleek p-8">
                <h3 className="text-xl font-bold mb-6 text-white">Contact Information</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary rounded-lg p-2.5 border border-primary/20 flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold mb-1.5 text-white text-sm">Email</h4>
                      <p className="text-muted-foreground text-sm break-words">maniteja.thagaram@hackethos4u.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary rounded-lg p-2.5 border border-primary/20 flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1.5 text-white text-sm">Phone</h4>
                      <p className="text-muted-foreground text-sm">+91 8008593735</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary rounded-lg p-2.5 border border-primary/20 flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1.5 text-white text-sm">Address</h4>
                      <p className="text-muted-foreground text-sm">
                        9G8C+PRQ, Dilsukhnagar<br />
                        Hyderabad, Telangana<br />
                        India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div data-light-bg="true" className="bg-gradient-to-br from-primary to-accent text-black rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-2.5 mb-5">
                  <Clock className="w-5 h-5" />
                  <h3 className="text-xl font-bold">Office Hours</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center pb-3 border-b border-black/10">
                    <span className="font-semibold">Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-black/10">
                    <span className="font-semibold">Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>

              {/* Quick Response */}
              <div className="card-sleek p-6">
                <h4 className="font-semibold mb-2.5 text-white text-sm">Quick Response Time</h4>
                <p className="text-muted-foreground text-sm mb-3">
                  We typically respond within 24 hours during business days.
                </p>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="font-medium">Support team available now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-16 md:py-24 bg-secondary/30">
        <FlowingLinesBackground variant="circuit" direction="ltr" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "How do I enroll in a course?",
                  a: "You can enroll through our website by selecting your preferred course and filling out the enrollment form. Our team will contact you within 24 hours to complete the process.",
                },
                {
                  q: "Do you offer corporate training?",
                  a: "Yes, we provide customized corporate training programs for teams. Contact us to discuss your requirements and get a tailored solution.",
                },
                {
                  q: "What certifications do you provide?",
                  a: "Upon successful completion of our courses, you'll receive industry-recognized certificates that can boost your career prospects.",
                },
                {
                  q: "Can I get a refund?",
                  a: "We offer a 7-day money-back guarantee if you're not satisfied with the course. Terms and conditions apply.",
                },
              ].map((faq, index) => (
                <div key={index} className="card-sleek p-6">
                  <h3 className="font-semibold mb-2 text-white">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="relative py-16">
        <FlowingLinesBackground variant="wave" direction="rtl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">Visit Our Office</h3>
              <p className="text-muted-foreground">9G8C+PRQ, Dilsukhnagar, Hyderabad, Telangana</p>
            </div>
            <div className="card-sleek overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.823!2d78.5215!3d17.3665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIxJzU5LjQiTiA3OMKwMzEnMTcuNCJF!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[400px]"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
