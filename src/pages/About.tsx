import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Award, Users, TrendingUp, Target, Heart, Lightbulb, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Securing Digital Futures Since 2018
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              We're passionate about making cybersecurity education accessible and empowering the next generation of security professionals
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">3000+</h3>
              <p className="text-muted-foreground">Students Trained</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-600 to-pink-500 text-white rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</h3>
              <p className="text-muted-foreground">Security Audits</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">95%</h3>
              <p className="text-muted-foreground">Placement Rate</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-red-500 to-orange-600 text-white rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">6+</h3>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
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
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card rounded-3xl p-8 shadow-card text-center">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Excellence</h3>
                <p className="text-muted-foreground">
                  We maintain the highest standards in everything we do, from course content to student support
                </p>
              </div>
              <div className="bg-card rounded-3xl p-8 shadow-card text-center">
                <div className="bg-gradient-to-br from-orange-600 to-pink-500 text-white rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Integrity</h3>
                <p className="text-muted-foreground">
                  We teach ethical hacking with a strong emphasis on responsible disclosure and legal boundaries
                </p>
              </div>
              <div className="bg-card rounded-3xl p-8 shadow-card text-center">
                <div className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We constantly update our curriculum to reflect the latest threats and security trends
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Expert Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Rahul Sharma",
                  role: "Founder & Lead Instructor",
                  cert: "CEH, OSCP, CISSP",
                  gradient: "from-orange-500 to-red-500",
                },
                {
                  name: "Priya Mehta",
                  role: "Head of Curriculum",
                  cert: "GWAPT, GXPN",
                  gradient: "from-orange-600 to-pink-500",
                },
                {
                  name: "Arjun Patel",
                  role: "Senior Security Consultant",
                  cert: "OSWE, OSEP",
                  gradient: "from-orange-500 to-yellow-500",
                },
              ].map((member, index) => (
                <div key={index} className="bg-card rounded-3xl overflow-hidden shadow-card group hover:shadow-card-hover transition-smooth">
                  <div className={`h-48 bg-gradient-to-br ${member.gradient} flex items-center justify-center`}>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full w-24 h-24 flex items-center justify-center">
                      <Users className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{member.role}</p>
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium">
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
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
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
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-orange-600 rounded-3xl p-8 md:p-12 text-primary-foreground text-center shadow-card-hover">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Growing Community
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Be part of a network of security professionals and learners passionate about cybersecurity
            </p>
            <Button size="lg" className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Get Started Today
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
