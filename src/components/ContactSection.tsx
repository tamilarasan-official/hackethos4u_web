import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FlowingLinesBackground } from "@/components/backgrounds";
import { useData } from "@/contexts/DataContext";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const { addContact } = useData();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
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
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        source: 'home',
        status: 'new',
        date: new Date().toISOString(),
      });

      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
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
    <section
      id="contact"
      className="relative py-20 md:py-28 bg-secondary/30"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - Fixed height to prevent layout shift */}
        <div className="text-center mb-16 min-h-[180px] flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mx-auto">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold tracking-wide">
              GET IN TOUCH
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Have questions? We're here to help you start your cybersecurity journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Contact Form - Use min-height instead of inline style */}
          <div className="card-sleek p-8 md:p-10 min-h-[650px] flex flex-col">
            <h3 className="text-2xl font-bold mb-6 text-white">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white block h-5">Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="rounded-lg bg-black border-white/10 focus:border-primary focus:ring-1 focus:ring-primary h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white block h-5">Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email address"
                  className="rounded-lg bg-black border-white/10 focus:border-primary focus:ring-1 focus:ring-primary h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white block h-5">Phone</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                  className="rounded-lg bg-black border-white/10 focus:border-primary focus:ring-1 focus:ring-primary h-10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white block h-5">Message *</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Enter your message or inquiry"
                  className="rounded-lg bg-black border-white/10 focus:border-primary focus:ring-1 focus:ring-primary resize-none h-[120px]"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-primary text-black hover:bg-primary/90 font-semibold h-11"
                size="lg"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>

          {/* Contact Info - Fixed heights to prevent layout shift */}
          <div className="space-y-6">
            <div className="card-sleek p-8 min-h-[340px]">
              <h3 className="text-xl font-bold mb-6 text-white h-7">Contact Information</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4 min-h-[60px]">
                  <div className="bg-primary/10 text-primary rounded-lg p-2.5 border border-primary/20 flex-shrink-0 w-9 h-9">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1.5 text-white text-sm h-5">Email</h4>
                    <p className="text-muted-foreground text-sm">maniteja.thagaram@hackethos4u.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 min-h-[60px]">
                  <div className="bg-primary/10 text-primary rounded-lg p-2.5 border border-primary/20 flex-shrink-0 w-9 h-9">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1.5 text-white text-sm h-5">Phone</h4>
                    <p className="text-muted-foreground text-sm">+91 8008593735</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 min-h-[80px]">
                  <div className="bg-primary/10 text-primary rounded-lg p-2.5 border border-primary/20 flex-shrink-0 w-9 h-9">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1.5 text-white text-sm h-5">Address</h4>
                    <p className="text-muted-foreground text-sm">
                      9G8C+PRQ, Dilsukhnagar<br />
                      Hyderabad, Telangana<br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-accent text-black rounded-xl p-6 shadow-lg min-h-[220px]">
              <h3 className="text-xl font-bold mb-5 h-7">Office Hours</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-3 border-b border-black/10 h-11">
                  <span className="font-semibold">Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-black/10 h-11">
                  <span className="font-semibold">Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center h-8">
                  <span className="font-semibold">Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
