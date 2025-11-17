import Header from "@/components/Header";
import Footer from "@/components/Footer";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { TechBackground, GridBackground, FlowingLinesBackground, ParticleBackground } from "@/components/backgrounds";

const Courses = () => {
  const { courses } = useData();

  const recordingCourses = courses.filter((c) => c.isActive && c.category === 'recording');
  const liveCourses = courses.filter((c) => c.isActive && c.category === 'live');

  const getIconComponent = (iconName: string) => {
    const Icon = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
    return Icon ? <Icon className="w-8 h-8" /> : <Icons.Shield className="w-8 h-8" />;
  };

  const formatPrice = (course: { category: string; pricing: { oneToOne?: number; groupMin?: number; groupMax?: number }; sessionType?: string }) => {
    if (course.category === 'recording') {
      return 'Download from Play Store';
    }

    if (course.sessionType === 'both') {
      return (
        <div className="space-y-1">
          <div className="text-sm opacity-90">₹{course.pricing.oneToOne?.toLocaleString()} - One-to-One</div>
          <div className="text-sm opacity-90">
            ₹{course.pricing.groupMin?.toLocaleString()} - ₹{course.pricing.groupMax?.toLocaleString()} - Group
          </div>
        </div>
      );
    }

    return 'Contact for pricing';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-16 md:pt-20">
      {/* Hero Section with Professional Grid */}
      <section className="relative hero-grid py-24 md:py-32 overflow-hidden">
        <FlowingLinesBackground variant="circuit" direction="ltr" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Icons.GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-semibold tracking-wide">
                EXPERT-LED TRAINING PROGRAMS
              </span>
            </div>
            <h1 className="mb-6">
              Master <span className="text-primary">Cybersecurity</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Transform your career with hands-on training in ethical hacking, penetration testing, and security analysis from industry professionals
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary rounded-lg p-2.5 border border-primary/20">
                  <Icons.Award className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Industry Recognized</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary rounded-lg p-2.5 border border-primary/20">
                  <Icons.Video className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Live & Recorded</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary rounded-lg p-2.5 border border-primary/20">
                  <Icons.Users className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">3000+ Students</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="rounded-full px-8 bg-primary text-black hover:bg-primary/90 font-semibold shadow-lg">
                  Enroll Now
                  <Icons.ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/course-selection">
                <Button size="lg" variant="outline" className="rounded-full px-8 border-white/20 hover:border-primary/50 hover:bg-white/5 hover:text-white">
                  View Formats
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recording Sessions */}
      {recordingCourses.length > 0 && (
        <section className="relative py-16 md:py-20">
          <FlowingLinesBackground variant="wave" direction="rtl" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-primary to-accent text-white rounded-xl p-2">
                  <Icons.PlayCircle className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Recording Sessions</h2>
              </div>
              <p className="text-muted-foreground text-lg">
                Access pre-recorded comprehensive courses on your schedule. Download our app from Play Store.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {recordingCourses.map((course) => (
                <div
                  key={course.id}
                  className="group card-sleek p-6 relative overflow-hidden hover:border-white/20 transition-all duration-300"
                >
                  {/* Badges */}
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <Badge variant="outline" className="border-white/20 text-white/70 bg-white/5">
                      {course.level}
                    </Badge>
                    <Badge variant="outline" className="border-white/10 text-white/60 bg-white/5">
                      Recording
                    </Badge>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 text-white relative z-10">{course.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-2.5 mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                        <Icons.Clock className="w-3.5 h-3.5 text-white/60" />
                      </div>
                      <span>{course.duration}</span>
                    </div>
                    {course.recordingsCount && (
                      <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                          <Icons.Video className="w-3.5 h-3.5 text-white/60" />
                        </div>
                        <span>{course.recordingsCount} Video Lessons</span>
                      </div>
                    )}
                  </div>

                  {/* Play Store Link */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Icons.Smartphone className="w-3.5 h-3.5" />
                      <span>Available on Play Store</span>
                    </div>
                    <a
                      href={course.playStoreLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="rounded-full w-full bg-primary text-black hover:bg-primary/90 font-semibold group/btn">
                        Download App
                        <Icons.Download className="w-4 h-4 ml-2 group-hover/btn:translate-y-0.5 transition-transform" />
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Live Sessions */}
      {liveCourses.length > 0 && (
        <section className="relative py-16 md:py-20 bg-secondary/30">
          <FlowingLinesBackground variant="circuit" direction="ltr" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-accent to-primary text-white rounded-xl p-2">
                  <Icons.Video className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Live Sessions</h2>
              </div>
              <p className="text-muted-foreground text-lg">
                Interactive live classes with expert instructors. Choose between one-to-one mentorship or group learning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {liveCourses.map((course) => (
                <div
                  key={course.id}
                  className="group card-sleek p-6 relative overflow-hidden hover:border-white/20 transition-all duration-300"
                >
                  {/* Badges */}
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <Badge variant="outline" className="border-white/20 text-white/70 bg-white/5">
                      {course.level}
                    </Badge>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="border-white/10 text-white/60 bg-white/5">
                        Live
                      </Badge>
                      {course.demoAvailable && (
                        <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10">
                          Demo
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 text-white relative z-10">{course.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-2.5 mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                        <Icons.Clock className="w-3.5 h-3.5 text-white/60" />
                      </div>
                      <span>{course.duration}</span>
                    </div>
                    {course.sessionType && (
                      <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                          <Icons.Users className="w-3.5 h-3.5 text-white/60" />
                        </div>
                        <span>{course.sessionType === 'both' ? 'One-to-One & Group' : course.sessionType}</span>
                      </div>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="mb-6">
                    <p className="text-xs text-muted-foreground mb-2">Pricing</p>
                    <div className="text-sm font-bold text-white/90">
                      {formatPrice(course)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Link to={`/courses/${course.slug}`}>
                      <Button className="rounded-full w-full bg-primary text-black hover:bg-primary/90 font-semibold group/btn">
                        View Details
                        <Icons.ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="relative py-16 md:py-24">
        <FlowingLinesBackground variant="wave" direction="rtl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Learn With Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="border-l-2 border-primary pl-6">
                <h3 className="font-bold mb-2 text-lg text-primary">Live Interactive Sessions</h3>
                <p className="text-sm text-muted-foreground">Real-time learning with expert Q&A</p>
              </div>

              <div className="border-l-2 border-primary pl-6">
                <h3 className="font-bold mb-2 text-lg text-primary">Comprehensive Materials</h3>
                <p className="text-sm text-muted-foreground">Notes, recordings & resources</p>
              </div>

              <div className="border-l-2 border-primary pl-6">
                <h3 className="font-bold mb-2 text-lg text-primary">Industry Certifications</h3>
                <p className="text-sm text-muted-foreground">Recognized certificates on completion</p>
              </div>

              <div className="border-l-2 border-primary pl-6">
                <h3 className="font-bold mb-2 text-lg text-primary">Career Support</h3>
                <p className="text-sm text-muted-foreground">Job assistance & mentorship</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-20 bg-secondary/30">
        <FlowingLinesBackground variant="circuit" direction="ltr" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-orange-600 rounded-3xl p-8 md:p-12 text-primary-foreground text-center shadow-card-hover">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Your Cybersecurity Journey Today
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of students who have transformed their careers with our expert-led courses
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold border-2 border-transparent hover:border-white/20"
                >
                  Enroll Now
                  <Icons.ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/course-selection">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-2 border-primary-foreground bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover:text-primary hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
                >
                  Choose Learning Format
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>

      <Footer />
    </div>
  );
};

export default Courses;
