import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Video, Download, Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const CourseSelection = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-secondary/20 to-background py-20 md:py-28 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Choose Your Learning Format
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Select the format that best fits your learning style and schedule
            </p>
          </div>
        </div>
      </section>

      {/* Selection Cards */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
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

      <Footer />
    </div>
  );
};

export default CourseSelection;
