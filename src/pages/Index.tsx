import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import ServicesSection from "@/components/ServicesSection";
import CoursesSection from "@/components/CoursesSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SEO, { organizationSchema, websiteSchema } from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background grid-background">
      <SEO
        title="Hackethos4U - Professional Cybersecurity Training & VAPT Services in India"
        description="Master ethical hacking, VAPT, bug bounty, and cybersecurity with Hackethos4U. Professional penetration testing services including WPAT, mobile security, API testing, and OWASP compliance. Expert-led courses in Hyderabad, India."
        keywords="cybersecurity training, ethical hacking course, VAPT training, penetration testing, bug bounty, OWASP testing, mobile security, API security, web application security, cybersecurity courses India, ethical hacking Hyderabad, VAPT services, security testing"
        canonical="https://hackethos4u.com/"
        structuredData={[organizationSchema, websiteSchema]}
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <HeroSlider />
        <ServicesSection />
        <CoursesSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
