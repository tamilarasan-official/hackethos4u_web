import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import Footer from "@/components/Footer";
import SEO, {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
  professionalServiceSchema
} from "@/components/SEO";

// Lazy load below-the-fold sections to reduce initial bundle size
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const CoursesSection = lazy(() => import("@/components/CoursesSection"));
const ReviewsSection = lazy(() => import("@/components/ReviewsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

// Minimal loading placeholder for sections
const SectionLoader = () => (
  <div className="py-20 flex justify-center">
    <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

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
        {/* Above-the-fold: Load immediately */}
        <HeroSlider />

        {/* Below-the-fold: Lazy load for better initial performance */}
        <Suspense fallback={<SectionLoader />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <CoursesSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ReviewsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
