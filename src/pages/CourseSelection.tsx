import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Video, Download, Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlowingLinesBackground } from "@/components/backgrounds";

const CourseSelection = () => {
  return (
    <div className="min-h-screen bg-background grid-background">
      <Header />

      <div className="pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative hero-grid py-20 md:py-28 overflow-hidden">
        <FlowingLinesBackground variant="circuit" direction="ltr" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-semibold">
                Course Formats
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Choose Your <span className="text-primary">Learning Format</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Select the format that best fits your learning style and schedule
            </p>
          </div>
        </div>
      </section>

      {/* Selection Cards */}
      <section className="relative py-16 md:py-24">
        <FlowingLinesBackground variant="wave" direction="rtl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Live Courses */}
            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-card hover:shadow-card-hover transition-smooth border-2 border-primary/20 hover:border-primary">
              <div className="text-center">
                <div className="bg-primary/10 text-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Video className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Live Sessions</h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  Interactive classes with real-time instructor support, Q&A sessions, and hands-on labs
                </p>
                
                <div className="space-y-4 mb-8 text-left">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary rounded-full p-2">
                      <Monitor className="w-4 h-4" />
                    </div>
                    <span>Live instructor-led sessions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary rounded-full p-2">
                      <Video className="w-4 h-4" />
                    </div>
                    <span>Interactive Q&A and doubt clearing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary rounded-full p-2">
                      <Monitor className="w-4 h-4" />
                    </div>
                    <span>Hands-on practical labs</span>
                  </div>
                </div>

                <Link to="/courses">
                  <Button size="lg" className="w-full rounded-full">
                    Explore Live Courses
                  </Button>
                </Link>
              </div>
            </div>

            {/* Recorded Courses */}
            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-card hover:shadow-card-hover transition-smooth border-2 border-border/50 hover:border-primary/50">
              <div className="text-center">
                <div className="bg-primary/10 text-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Download className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Recorded Courses</h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  Learn at your own pace with pre-recorded video lessons and downloadable resources
                </p>
                
                <div className="space-y-4 mb-8 text-left">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary rounded-full p-2">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <span>Access via mobile app</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary rounded-full p-2">
                      <Video className="w-4 h-4" />
                    </div>
                    <span>High-quality video lessons</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary rounded-full p-2">
                      <Download className="w-4 h-4" />
                    </div>
                    <span>Downloadable resources</span>
                  </div>
                </div>

                <a 
                  href="https://play.google.com/store" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="outline" className="w-full rounded-full">
                    Download App
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Compare Learning Formats
            </h2>
            <div className="bg-card rounded-3xl p-8 shadow-card overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4">Feature</th>
                    <th className="text-center py-4 px-4">Live Sessions</th>
                    <th className="text-center py-4 px-4">Recorded</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4 px-4">Instructor Support</td>
                    <td className="text-center py-4 px-4">✅</td>
                    <td className="text-center py-4 px-4">❌</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Learn at Your Pace</td>
                    <td className="text-center py-4 px-4">❌</td>
                    <td className="text-center py-4 px-4">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Hands-on Labs</td>
                    <td className="text-center py-4 px-4">✅</td>
                    <td className="text-center py-4 px-4">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Certificate</td>
                    <td className="text-center py-4 px-4">✅</td>
                    <td className="text-center py-4 px-4">✅</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">Mobile App Access</td>
                    <td className="text-center py-4 px-4">❌</td>
                    <td className="text-center py-4 px-4">✅</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      </div>

      <Footer />
    </div>
  );
};

export default CourseSelection;
