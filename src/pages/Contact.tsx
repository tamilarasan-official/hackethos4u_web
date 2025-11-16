import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Have questions? We're here to help you start your cybersecurity journey
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 text-primary rounded-full p-3">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Send us a message</h2>
              </div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input placeholder="John" className="rounded-2xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input placeholder="Doe" className="rounded-2xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    placeholder="john.doe@example.com"
                    className="rounded-2xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="rounded-2xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <select className="w-full px-4 py-2 rounded-2xl border border-input bg-background">
                    <option>Course Inquiry</option>
                    <option>Service Inquiry</option>
                    <option>Partnership</option>
                    <option>General Question</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    placeholder="Tell us how we can help you..."
                    className="rounded-2xl min-h-[140px]"
                  />
                </div>
                <Button className="w-full rounded-full" size="lg">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Contact Details */}
              <div className="bg-card rounded-3xl p-8 shadow-card">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-full p-3 flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Email</h4>
                      <p className="text-muted-foreground text-sm">contact@hackethos4u.com</p>
                      <p className="text-muted-foreground text-sm">support@hackethos4u.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-orange-600 to-pink-500 text-white rounded-full p-3 flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Phone</h4>
                      <p className="text-muted-foreground text-sm">+91 98765 43210</p>
                      <p className="text-muted-foreground text-sm">+91 87654 32109</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white rounded-full p-3 flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Address</h4>
                      <p className="text-muted-foreground text-sm">
                        Tech Park, Cyber City<br />
                        Bangalore, Karnataka 560001<br />
                        India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-gradient-to-br from-primary to-orange-600 text-primary-foreground rounded-3xl p-8 shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6" />
                  <h3 className="text-2xl font-bold">Office Hours</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center pb-3 border-b border-primary-foreground/20">
                    <span className="font-medium">Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-primary-foreground/20">
                    <span className="font-medium">Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>

              {/* Quick Response */}
              <div className="bg-card rounded-3xl p-8 shadow-card">
                <h4 className="font-semibold mb-3">Quick Response Time</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="font-medium">Available now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
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
                <div key={index} className="bg-card rounded-2xl p-6 shadow-card">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-primary/10 to-orange-100 rounded-3xl h-[400px] flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Visit Our Office</h3>
                <p className="text-muted-foreground">Tech Park, Cyber City, Bangalore</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
