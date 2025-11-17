import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, Users, TrendingUp, ArrowRight, Award, Video, BookOpen, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  students: number;
  category: string;
  level: string;
  price: string;
  gradient: string;
  icon: React.ReactNode;
  slug: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: "Ethical Hacking Masterclass",
    description: "Complete 6-month program covering penetration testing, network security, and advanced hacking techniques.",
    duration: "6 months",
    students: 1250,
    category: "Cybersecurity",
    level: "Intermediate",
    price: "₹15,000 - ₹40,000",
    gradient: "from-orange-500 to-red-500",
    icon: <Shield className="w-8 h-8" />,
    slug: "ethical-hacking",
  },
  {
    id: 2,
    title: "VAPT Professional",
    description: "Advanced vulnerability assessment and penetration testing techniques for security professionals.",
    duration: "4 months",
    students: 890,
    category: "Cybersecurity",
    level: "Advanced",
    price: "₹15,000 - ₹35,000",
    gradient: "from-orange-600 to-pink-500",
    icon: <Shield className="w-8 h-8" />,
    slug: "vapt",
  },
  {
    id: 3,
    title: "Bug Bounty Bootcamp",
    description: "Learn to find vulnerabilities and earn through bug bounty programs with hands-on training.",
    duration: "3 months",
    students: 650,
    category: "Cybersecurity",
    level: "Intermediate",
    price: "₹12,000 - ₹30,000",
    gradient: "from-orange-500 to-yellow-500",
    icon: <TrendingUp className="w-8 h-8" />,
    slug: "bug-bounty",
  },
  {
    id: 4,
    title: "AR/VR Security",
    description: "Security testing for augmented and virtual reality applications in the metaverse.",
    duration: "2 months",
    students: 320,
    category: "AR VR",
    level: "Beginner",
    price: "₹10,000 - ₹25,000",
    gradient: "from-purple-500 to-pink-500",
    icon: <Video className="w-8 h-8" />,
    slug: "ar-vr-security",
  },
  {
    id: 5,
    title: "Web Security Fundamentals",
    description: "Learn the basics of web application security, OWASP Top 10, and secure coding practices.",
    duration: "2 months",
    students: 980,
    category: "Cybersecurity",
    level: "Beginner",
    price: "₹8,000 - ₹20,000",
    gradient: "from-blue-500 to-cyan-500",
    icon: <BookOpen className="w-8 h-8" />,
    slug: "web-security",
  },
  {
    id: 6,
    title: "Advanced Network Security",
    description: "Deep dive into network protocols, firewalls, IDS/IPS, and infrastructure security.",
    duration: "3 months",
    students: 540,
    category: "Cybersecurity",
    level: "Advanced",
    price: "₹18,000 - ₹42,000",
    gradient: "from-green-500 to-emerald-600",
    icon: <Shield className="w-8 h-8" />,
    slug: "network-security",
  },
];

const Courses = () => {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Cybersecurity", "AR VR"];

  const filteredCourses =
    activeTab === "All"
      ? courses
      : courses.filter((course) => course.category === activeTab);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-secondary/20 to-background py-20 md:py-28 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Learn Cybersecurity from Industry Experts
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Transform your career with hands-on training in ethical hacking, penetration testing, and security analysis
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span>Industry Recognized Certificates</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-primary" />
                <span>Live & Recorded Sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span>3000+ Students Trained</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 bg-secondary/30 sticky top-[73px] z-40 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full font-medium transition-smooth ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-md scale-105"
                    : "bg-card text-foreground hover:bg-primary/10 hover:scale-105"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-smooth hover:scale-105"
              >
                {/* Gradient Header */}
                <div className={`relative h-48 bg-gradient-to-br ${course.gradient} p-6 flex flex-col justify-between`}>
                  <div className="flex justify-between items-start">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium">
                      {course.level}
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 text-white">
                      {course.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{course.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Starting from</p>
                      <p className="text-lg font-bold text-primary">{course.price}</p>
                    </div>
                    <Link to="/contact">
                      <Button className="rounded-full group-hover:scale-105 transition-smooth">
                        Enroll Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Learn With Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card rounded-2xl p-6 text-center shadow-card">
                <div className="bg-primary/10 text-primary rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Video className="w-7 h-7" />
                </div>
                <h3 className="font-semibold mb-2">Live Sessions</h3>
                <p className="text-sm text-muted-foreground">Interactive classes with Q&A</p>
              </div>
              <div className="bg-card rounded-2xl p-6 text-center shadow-card">
                <div className="bg-primary/10 text-primary rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h3 className="font-semibold mb-2">Study Materials</h3>
                <p className="text-sm text-muted-foreground">Comprehensive notes & resources</p>
              </div>
              <div className="bg-card rounded-2xl p-6 text-center shadow-card">
                <div className="bg-primary/10 text-primary rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-7 h-7" />
                </div>
                <h3 className="font-semibold mb-2">Certifications</h3>
                <p className="text-sm text-muted-foreground">Industry-recognized certificates</p>
              </div>
              <div className="bg-card rounded-2xl p-6 text-center shadow-card">
                <div className="bg-primary/10 text-primary rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="font-semibold mb-2">Career Support</h3>
                <p className="text-sm text-muted-foreground">Job assistance & mentorship</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-card rounded-3xl p-8 md:p-12 text-center shadow-card-hover">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Your Cybersecurity Journey Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of students who have transformed their careers with our expert-led courses
            </p>
            <Link to="/course-selection">
              <Button size="lg" className="rounded-full">
                Choose Learning Format
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;
