import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Award, Users, TrendingUp, Target, Heart, Lightbulb, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TechBackground, GridBackground, FlowingLinesBackground, ParticleBackground } from "@/components/backgrounds";
import SEO, { organizationSchema } from "@/components/SEO";

const About = () => {
  return (
    <div className="min-h-screen bg-background grid-background">
      <SEO
        title="About Hackethos4U - Leading Cybersecurity Training & VAPT Services"
        description="Hackethos4U is a premier cybersecurity training institute and VAPT service provider in Hyderabad, India. Since 2018, we've been empowering security professionals with expert-led ethical hacking courses and professional penetration testing services."
        keywords="about hackethos4u, cybersecurity training institute, VAPT company India, ethical hacking institute Hyderabad, security training experts, penetration testing company, cybersecurity education"
        canonical="https://hackethos4u.com/about"
        structuredData={organizationSchema}
      />
      <Header />

      <div className="pt-16 md:pt-20">
      {/* Hero Section with Professional Grid */}
      <section className="relative hero-grid py-24 md:py-32 overflow-hidden">
        <FlowingLinesBackground variant="circuit" direction="ltr" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-semibold tracking-wide">
                ABOUT US
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Securing <span className="text-primary">Digital Futures</span> Since 2018
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We're passionate about making cybersecurity education accessible and empowering the next generation of security professionals
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 md:py-24">
        <FlowingLinesBackground variant="wave" direction="rtl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center group">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 mb-4 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                <Users className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">3000+</h3>
              <p className="text-muted-foreground">Students Trained</p>
            </div>
            <div className="text-center group">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 mb-4 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                <Award className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</h3>
              <p className="text-muted-foreground">Security Audits</p>
            </div>
            <div className="text-center group">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 mb-4 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                <TrendingUp className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">95%</h3>
              <p className="text-muted-foreground">Placement Rate</p>
            </div>
            <div className="text-center group">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 mb-4 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                <Shield className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">6+</h3>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative py-16 md:py-24 bg-secondary/30">
        <FlowingLinesBackground variant="circuit" direction="ltr" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Story</h2>
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-card">
              <p className="text-lg text-muted-foreground mb-6">
                Founded in 2018 by a team of passionate cybersecurity professionals, Hackethos4U was born from a simple mission: to bridge the gap between traditional education and real-world security challenges.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                We noticed that many aspiring security professionals lacked practical, hands-on experience. Traditional courses focused too much on theory without giving students the chance to actually hack, test, and defend systems in realistic scenarios.
              </p>
              <p className="text-lg text-muted-foreground">
                Today, we're proud to have trained over 3,000 students and helped hundreds of organizations strengthen their security posture. Our students have gone on to work at leading tech companies, start their own security firms, and become recognized bug bounty hunters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-16 md:py-24">
        <FlowingLinesBackground variant="wave" direction="rtl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group card-sleek p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 mb-4 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                  <Target className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">Excellence</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We maintain the highest standards in everything we do, from course content to student support
                </p>
              </div>
              <div className="group card-sleek p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 mb-4 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                  <Heart className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">Integrity</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We teach ethical hacking with a strong emphasis on responsible disclosure and legal boundaries
                </p>
              </div>
              <div className="group card-sleek p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 mb-4 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                  <Lightbulb className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">Innovation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We constantly update our curriculum to reflect the latest threats and security trends
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-16 md:py-24 bg-secondary/30">
        <FlowingLinesBackground variant="circuit" direction="ltr" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Expert Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Rahul Sharma",
                  role: "Founder & Lead Instructor",
                  cert: "CEH, OSCP, CISSP",
                },
                {
                  name: "Priya Mehta",
                  role: "Head of Curriculum",
                  cert: "GWAPT, GXPN",
                },
                {
                  name: "Arjun Patel",
                  role: "Senior Security Consultant",
                  cert: "OSWE, OSEP",
                },
              ].map((member, index) => (
                <div key={index} className="group card-sleek overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                  <div className="h-48 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="bg-primary/10 backdrop-blur-sm rounded-full w-24 h-24 flex items-center justify-center border border-primary/20 relative z-10 group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-12 h-12 text-primary" />
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors duration-300">{member.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{member.role}</p>
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-3 py-1.5 text-xs font-medium border border-primary/20">
                      <Award className="w-3 h-3" />
                      {member.cert}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="relative py-16 md:py-24">
        <FlowingLinesBackground variant="wave" direction="rtl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Certifications & Accreditations</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {["CEH Certified", "OSCP Trained", "ISO 27001", "OWASP Member"].map((cert, index) => (
                <div key={index} className="bg-card rounded-2xl p-6 shadow-card text-center hover:scale-105 transition-smooth">
                  <div className="bg-primary/10 text-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <p className="font-semibold text-sm">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-24 bg-secondary/30">
        <FlowingLinesBackground variant="circuit" direction="ltr" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary via-accent to-primary rounded-3xl p-8 md:p-12 text-black text-center shadow-2xl relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join Our Growing Community
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Be part of a network of security professionals and learners passionate about cybersecurity
              </p>
              <Button size="lg" className="rounded-full bg-black text-white hover:bg-black/90 shadow-xl font-semibold">
                Get Started Today
              </Button>
            </div>
          </div>
        </div>
      </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
