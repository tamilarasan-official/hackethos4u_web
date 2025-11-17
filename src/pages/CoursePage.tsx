import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useData } from "@/contexts/DataContext";
import { FlowingLinesBackground } from "@/components/backgrounds";

const CoursePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { courses } = useData();

  const course = courses.find((c) => c.slug === slug && c.isActive);

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-secondary/20 to-background">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <Icons.AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
            <p className="text-muted-foreground mb-8">The course you're looking for doesn't exist or is no longer available.</p>
            <Link to="/courses">
              <Button className="rounded-full shadow-lg">
                <Icons.ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getIconComponent = (iconName: string, size: string = "w-12 h-12") => {
    const Icon = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
    return Icon ? <Icon className={size} /> : <Icons.Shield className={size} />;
  };

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="min-h-screen bg-background grid-background">
      <Header />

      <div className="pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative hero-grid py-20 md:py-24 overflow-hidden">
        <FlowingLinesBackground variant="circuit" direction="ltr" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <div className="text-primary">
                  {getIconComponent(course.icon, "w-5 h-5")}
                </div>
                <span className="text-primary text-sm font-semibold tracking-wide uppercase">
                  {course.category === 'recording' ? 'Pre-Recorded Course' : 'Live Training Program'}
                </span>
              </div>

              {/* Course Title - Improved styling */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {course.title}
              </h1>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <Badge variant="outline" className="border-white/20 text-white/90 bg-white/5 text-sm">
                  {course.level}
                </Badge>
                <Badge variant="outline" className="border-white/20 text-white/90 bg-white/5 text-sm">
                  {course.duration}
                </Badge>
                {course.demoAvailable && (
                  <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10 text-sm">
                    Demo Available
                  </Badge>
                )}
              </div>

              {/* Description */}
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                {course.description}
              </p>

              {/* Key Info Stats */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 text-primary rounded-lg p-2 border border-primary/20">
                    <Icons.Clock className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">{course.duration}</span>
                </div>
                {course.recordingsCount && (
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 text-primary rounded-lg p-2 border border-primary/20">
                      <Icons.Video className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">{course.recordingsCount} Lessons</span>
                  </div>
                )}
                {course.sessionType && (
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 text-primary rounded-lg p-2 border border-primary/20">
                      <Icons.Users className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium capitalize">{course.sessionType === 'both' ? 'One-to-One & Group' : course.sessionType}</span>
                  </div>
                )}
              </div>

              {/* Pricing */}
              {course.category === 'recording' ? (
                <div className="inline-block bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-md border border-primary/20 rounded-2xl px-8 py-4 mb-8">
                  <div className="flex items-center gap-2">
                    <Icons.Smartphone className="w-5 h-5 text-primary" />
                    <p className="text-lg font-bold">Available on Google Play Store</p>
                  </div>
                </div>
              ) : (
                <div className="inline-block bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-md border border-primary/20 rounded-2xl px-8 py-5 mb-8">
                  <p className="text-xs text-primary font-semibold mb-3 uppercase tracking-wide">Course Pricing</p>
                  <div className="space-y-2">
                    {course.pricing.oneToOne && (
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl md:text-3xl font-bold text-primary">₹{course.pricing.oneToOne.toLocaleString()}</p>
                        <span className="text-sm font-medium text-muted-foreground">One-to-One</span>
                      </div>
                    )}
                    {course.pricing.groupMin && course.pricing.groupMax && (
                      <div className="flex items-baseline gap-2">
                        <p className="text-xl md:text-2xl font-bold">
                          ₹{course.pricing.groupMin.toLocaleString()} - ₹{course.pricing.groupMax.toLocaleString()}
                        </p>
                        <span className="text-sm font-medium text-muted-foreground">Group</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {course.category === 'recording' && course.playStoreLink ? (
                  <a href={course.playStoreLink} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="rounded-full px-8 bg-primary text-black hover:bg-primary/90 font-semibold shadow-lg">
                      <Icons.Download className="w-5 h-5 mr-2" />
                      Download App
                    </Button>
                  </a>
                ) : (
                  <Link to="/contact">
                    <Button size="lg" className="rounded-full px-8 bg-primary text-black hover:bg-primary/90 font-semibold shadow-lg">
                      <Icons.Send className="w-5 h-5 mr-2" />
                      Enroll Now
                    </Button>
                  </Link>
                )}
                <Link to="/courses">
                  <Button size="lg" variant="outline" className="rounded-full px-8 border-white/20 hover:border-primary/50 hover:bg-white/5 hover:text-white">
                    <Icons.ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Courses
                  </Button>
                </Link>
              </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      {course.demoVideoUrl && getYouTubeVideoId(course.demoVideoUrl) && (
        <section className="relative py-16 md:py-20 bg-secondary/30">
          <FlowingLinesBackground variant="wave" direction="rtl" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <Icons.Play className="w-4 h-4 text-primary" />
                  <span className="text-primary text-sm font-semibold tracking-wide">
                    PREVIEW
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Course Demo Video</h2>
                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                  Watch a preview of what you'll learn in this course
                </p>
              </div>

              {/* Video Container */}
              <div className="card-sleek overflow-hidden">
                <div className="relative pb-[56.25%] bg-black">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(course.demoVideoUrl)}`}
                    title="Course Demo Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="relative py-16 md:py-20">
        <FlowingLinesBackground variant="circuit" direction="ltr" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Area */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="curriculum" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                  </TabsList>

                  <TabsContent value="curriculum">
                    <Card className="p-8 border border-white/10">
                      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Icons.BookOpen className="w-6 h-6 text-white/70" />
                        Course Curriculum
                      </h2>
                      {course.curriculum && course.curriculum.length > 0 ? (
                        <div className="space-y-4">
                          {course.curriculum.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors group"
                            >
                              <div className="bg-white/10 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-sm group-hover:scale-110 transition-transform border border-white/20">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-1">{item}</h3>
                                <p className="text-sm text-muted-foreground">
                                  Comprehensive coverage with hands-on practice
                                </p>
                              </div>
                              <Icons.CheckCircle className="w-5 h-5 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Curriculum details coming soon...</p>
                      )}
                    </Card>
                  </TabsContent>

                  <TabsContent value="details">
                    <Card className="p-8 border border-white/10">
                      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Icons.Info className="w-6 h-6 text-white/70" />
                        Course Details
                      </h2>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <Icons.Target className="w-5 h-5 text-white/70" />
                            What You'll Learn
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {course.curriculum?.slice(0, 4).map((item, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <Icons.Check className="w-5 h-5 text-white/60 flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">{item}</span>
                              </div>
                            )) || (
                              <p className="text-muted-foreground">Comprehensive training in cybersecurity</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <Icons.GraduationCap className="w-5 h-5 text-white/70" />
                            Prerequisites
                          </h3>
                          <p className="text-muted-foreground">
                            {course.level === 'Beginner' && 'No prior experience required. Basic computer knowledge is helpful.'}
                            {course.level === 'Intermediate' && 'Basic understanding of computer networks and security concepts recommended.'}
                            {course.level === 'Advanced' && 'Prior experience in cybersecurity or related field required.'}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <Icons.Award className="w-5 h-5 text-white/70" />
                            Certification
                          </h3>
                          <p className="text-muted-foreground">
                            Upon successful completion, you'll receive an industry-recognized certificate that can be shared on LinkedIn and added to your resume.
                          </p>
                        </div>

                        {course.category === 'live' && (
                          <div>
                            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                              <Icons.Users className="w-5 h-5 text-white/70" />
                              Session Format
                            </h3>
                            <div className="space-y-2 text-muted-foreground">
                              {course.sessionType === 'both' && (
                                <>
                                  <p><strong>One-to-One:</strong> Personalized mentorship with dedicated attention (₹{course.pricing.oneToOne?.toLocaleString()})</p>
                                  <p><strong>Group Sessions:</strong> Collaborative learning with peers (₹{course.pricing.groupMin?.toLocaleString()} - ₹{course.pricing.groupMax?.toLocaleString()})</p>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent value="notes">
                    <Card className="p-8 border border-white/10">
                      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Icons.FileText className="w-6 h-6 text-white/70" />
                        Course Notes & Materials
                      </h2>
                      {course.notes ? (
                        <div className="space-y-6">
                          <div className="bg-secondary/50 rounded-xl p-6 border border-white/10">
                            <p className="text-foreground leading-relaxed text-lg">{course.notes}</p>
                          </div>

                          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <Icons.BookOpen className="w-5 h-5 text-white/70" />
                              Study Materials Included
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg border border-white/10">
                                <Icons.FileText className="w-5 h-5 text-white/60 mt-0.5" />
                                <div>
                                  <p className="font-medium text-sm">Comprehensive PDF Notes</p>
                                  <p className="text-xs text-muted-foreground">Detailed course materials</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg border border-white/10">
                                <Icons.Code className="w-5 h-5 text-white/60 mt-0.5" />
                                <div>
                                  <p className="font-medium text-sm">Hands-on Lab Exercises</p>
                                  <p className="text-xs text-muted-foreground">Practice environments</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg border border-white/10">
                                <Icons.Video className="w-5 h-5 text-white/60 mt-0.5" />
                                <div>
                                  <p className="font-medium text-sm">Session Replays</p>
                                  <p className="text-xs text-muted-foreground">Review anytime</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg border border-white/10">
                                <Icons.ExternalLink className="w-5 h-5 text-white/60 mt-0.5" />
                                <div>
                                  <p className="font-medium text-sm">Additional Resources</p>
                                  <p className="text-xs text-muted-foreground">Curated reading materials</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Icons.BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                          <p className="text-muted-foreground">Study materials and notes will be provided upon enrollment.</p>
                        </div>
                      )}
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="p-6 sticky top-24 border border-white/10">
                  <h3 className="font-bold text-xl mb-6">Enroll Now</h3>

                  {course.category === 'recording' ? (
                    <div className="space-y-4">
                      <div className="bg-secondary/30 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Icons.Smartphone className="w-8 h-8 text-white/70" />
                          <div>
                            <p className="font-semibold">Download Our App</p>
                            <p className="text-xs text-muted-foreground">Available on Play Store</p>
                          </div>
                        </div>
                      </div>
                      <a
                        href={course.playStoreLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="lg" className="rounded-full w-full shadow-lg bg-gradient-to-r from-primary to-accent">
                          <Icons.Download className="w-5 h-5 mr-2" />
                          Download from Play Store
                        </Button>
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-secondary/30 rounded-xl p-4 space-y-3">
                        {course.pricing.oneToOne && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">One-to-One</p>
                            <p className="text-2xl font-bold text-white/90">₹{course.pricing.oneToOne.toLocaleString()}</p>
                          </div>
                        )}
                        {course.pricing.groupMin && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Group Session</p>
                            <p className="text-xl font-bold text-white/80">
                              ₹{course.pricing.groupMin.toLocaleString()} - ₹{course.pricing.groupMax?.toLocaleString()}
                            </p>
                          </div>
                        )}
                      </div>

                      <Link to="/contact">
                        <Button size="lg" className="rounded-full w-full shadow-lg bg-primary text-black hover:bg-primary/90 font-semibold">
                          <Icons.Send className="w-5 h-5 mr-2" />
                          Enroll Now
                        </Button>
                      </Link>
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-border space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Icons.Clock className="w-5 h-5 text-white/60" />
                      <span className="text-muted-foreground">{course.duration} duration</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Icons.Award className="w-5 h-5 text-white/60" />
                      <span className="text-muted-foreground">Certificate included</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Icons.Headphones className="w-5 h-5 text-white/60" />
                      <span className="text-muted-foreground">24/7 support</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>

      <Footer />
    </div>
  );
};

export default CoursePage;
