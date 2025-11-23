import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import ServicesSection from "@/components/ServicesSection";
import CoursesSection from "@/components/CoursesSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SEO, {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
  professionalServiceSchema
} from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background grid-background">
      <SEO
        title="Hackethos4U - Professional Cybersecurity Training & VAPT Services in India"
        description="Master ethical hacking, VAPT, bug bounty, and cybersecurity with Hackethos4U. Professional penetration testing services including WPAT, mobile security, API testing, and OWASP compliance. Expert-led courses in Hyderabad, India. ⭐ 4.8/5 rating from 127+ students. 🎯 Hands-on training with industry experts."
        keywords="cybersecurity training India, ethical hacking course Hyderabad, VAPT training online, penetration testing certification, bug bounty hunter course, OWASP top 10 testing, mobile application security testing, API security testing, web application penetration testing, cybersecurity bootcamp, CEH training, OSCP preparation, security auditing services, vulnerability assessment, cyber security expert course, hacking training institute Hyderabad"
        canonical="https://hackethos4u.com/"
        structuredData={[organizationSchema, websiteSchema, localBusinessSchema, professionalServiceSchema]}
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
