import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, Users, Download, PlayCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ethicalHackingImg from "@/assets/course-ethical-hacking.jpg";
import vaptImg from "@/assets/course-vapt.jpg";
import bugBountyImg from "@/assets/course-bug-bounty.jpg";

const courseData: Record<string, any> = {
  "ethical-hacking": {
    title: "Ethical Hacking Masterclass",
    subtitle: "6-Month Comprehensive Training Program",
    description: "Master the art of ethical hacking with our comprehensive 6-month program. Learn penetration testing, network security, web application security, and more.",
    duration: "6 months",
    students: 1250,
    image: ethicalHackingImg,
    groupPrice: "₹15,000 - ₹20,000",
    oneToOnePrice: "₹40,000",
    modules: [
      "Introduction to Cybersecurity",
      "Linux Fundamentals",
      "Networking Essentials",
      "Web Application Security",
      "Network Penetration Testing",
      "Wireless Security",
      "Social Engineering",
      "Malware Analysis",
      "Report Writing",
      "Capstone Project",
    ],
    features: [
      "Live interactive sessions",
      "Hands-on labs and exercises",
      "Recorded sessions access",
      "Study materials and notes",
      "Industry expert instructors",
      "Certificate of completion",
    ],
  },
  vapt: {
    title: "VAPT Professional",
    subtitle: "4-Month Advanced Training",
    description: "Advanced vulnerability assessment and penetration testing techniques for aspiring security professionals.",
    duration: "4 months",
    students: 890,
    image: vaptImg,
    groupPrice: "₹15,000 - ₹18,000",
    oneToOnePrice: "₹35,000",
    modules: [
      "VAPT Fundamentals",
      "Vulnerability Assessment Tools",
      "Manual Testing Techniques",
      "Web Application Testing",
      "Mobile App Security",
      "API Security Testing",
      "Network Infrastructure Testing",
      "Reporting and Documentation",
    ],
    features: [
      "Practical VAPT scenarios",
      "Real-world case studies",
      "Recorded lectures",
      "Testing lab access",
      "Interview preparation",
      "Professional certification",
    ],
  },
  "bug-bounty": {
    title: "Bug Bounty Bootcamp",
    subtitle: "3-Month Intensive Program",
    description: "Learn to find vulnerabilities and earn through bug bounty programs. Perfect for those who want to make a career in ethical hacking.",
    duration: "3 months",
    students: 650,
    image: bugBountyImg,
    groupPrice: "₹12,000 - ₹15,000",
    oneToOnePrice: "₹30,000",
    modules: [
      "Bug Bounty Basics",
      "Reconnaissance Techniques",
      "Common Vulnerabilities",
      "Advanced Finding Techniques",
      "Report Writing for Bounties",
      "Platform Navigation",
      "Building Your Reputation",
      "Automation and Tools",
    ],
    features: [
      "Live bug hunting sessions",
      "Platform account setup help",
      "Report writing templates",
      "Community support",
      "Success case studies",
      "Mentorship sessions",
    ],
  },
};

const CoursePage = () => {
  const { slug } = useParams();
  const course = slug ? courseData[slug] : null;

  if (!course) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground">The course you're looking for doesn't exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
                <p className="text-xl mb-6 opacity-90">{course.subtitle}</p>
                <p className="text-lg mb-8 opacity-80">{course.description}</p>
                
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{course.students} students</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    Enroll Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Brochure
                  </Button>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden shadow-card-hover">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Course Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-3xl p-8 shadow-card">
                <h3 className="text-2xl font-bold mb-2">Group Classes</h3>
                <p className="text-4xl font-bold text-primary mb-6">{course.groupPrice}</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Interactive group sessions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Peer learning opportunities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>All course materials</span>
                  </li>
                </ul>
              </div>

              <div className="bg-primary text-primary-foreground rounded-3xl p-8 shadow-card-hover">
                <h3 className="text-2xl font-bold mb-2">1-to-1 Classes</h3>
                <p className="text-4xl font-bold mb-6">{course.oneToOnePrice}</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Personalized attention</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Flexible scheduling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Customized curriculum</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Course Curriculum</h2>
            <div className="bg-card rounded-3xl p-8 shadow-card">
              <div className="space-y-3">
                {course.modules.map((module: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-secondary/50 transition-colors"
                  >
                    <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="font-medium">{module}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">What You'll Get</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {course.features.map((feature: string, index: number) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-6 shadow-card flex items-start gap-3"
                >
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Course Preview</h2>
            <div className="relative bg-card rounded-3xl overflow-hidden shadow-card aspect-video">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                <Button size="lg" className="rounded-full">
                  <PlayCircle className="w-6 h-6 mr-2" />
                  Watch Introduction
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-card rounded-3xl p-8 shadow-card">
            <h2 className="text-3xl font-bold mb-6 text-center">Enroll Now</h2>
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
                <Input type="email" placeholder="john.doe@example.com" className="rounded-2xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input type="tel" placeholder="+91 XXXXX XXXXX" className="rounded-2xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Preferred Class Type</label>
                <select className="w-full px-4 py-2 rounded-2xl border border-input bg-background">
                  <option>Group Classes</option>
                  <option>1-to-1 Classes</option>
                </select>
              </div>
              <Button className="w-full rounded-full" size="lg">
                Submit Enrollment
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CoursePage;
