import { useState, useMemo } from "react";
import { Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FlowingLinesBackground } from "@/components/backgrounds";
import { useData } from "@/contexts/DataContext";

const CoursesSection = () => {
  const { courses } = useData();
  const [activeTab, setActiveTab] = useState("All");

  // Get active courses
  const activeCourses = useMemo(() => courses.filter(c => c.isActive), [courses]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(activeCourses.map(c => c.category));
    return ["All", ...Array.from(cats)];
  }, [activeCourses]);

  // Filter courses by category
  const filteredCourses = useMemo(() =>
    activeTab === "All"
      ? activeCourses
      : activeCourses.filter((course) => course.category === activeTab),
    [activeTab, activeCourses]
  );

  // Duplicate courses for infinite scroll if more than 3
  const shouldAutoScroll = filteredCourses.length > 3;
  const displayCourses = shouldAutoScroll
    ? [...filteredCourses, ...filteredCourses]
    : filteredCourses;

  if (activeCourses.length === 0) {
    return null;
  }

  return (
    <section className={`relative py-20 md:py-28 bg-secondary/30 ${shouldAutoScroll ? 'overflow-hidden' : ''}`}>
      <FlowingLinesBackground variant="circuit" direction="ltr" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold tracking-wide">
              EXPERT TRAINING PROGRAMS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Courses</h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Industry-leading cybersecurity training programs designed by security professionals
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-medium transition-smooth capitalize ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-foreground hover:bg-primary/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Course Cards - Grid or Auto-scroll */}
        {shouldAutoScroll ? (
          <div className="relative">
            <div className="flex gap-6 animate-scroll">
              {displayCourses.map((course, index) => (
                <div
                  key={`${course.id}-${index}`}
                  className="group relative flex-shrink-0 w-[360px]"
                >
                  <div className="card-sleek p-8 h-full flex flex-col relative overflow-hidden">
                    {/* Top gradient accent bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold mb-3 text-white">
                        {course.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                        {course.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-6 mb-8 pb-6 border-b border-white/10">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20">
                            <Clock className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <span className="text-muted-foreground">{course.duration}</span>
                        </div>
                      </div>

                      {/* Button */}
                      <Link to={`/courses/${course.slug}`}>
                        <Button
                          className="w-full rounded-full bg-white/5 text-white border border-white/10 hover:bg-primary hover:text-black hover:border-primary font-semibold transition-all duration-300 group/btn"
                        >
                          View Course
                          <TrendingUp className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {displayCourses.map((course) => (
              <div
                key={course.id}
                className="group relative"
              >
                <div className="card-sleek p-8 h-full flex flex-col relative overflow-hidden">
                  {/* Top gradient accent bar */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-3 text-white">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-6 mb-8 pb-6 border-b border-white/10">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20">
                          <Clock className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-muted-foreground">{course.duration}</span>
                      </div>
                    </div>

                    {/* Button */}
                    <Link to={`/courses/${course.slug}`}>
                      <Button
                        className="w-full rounded-full bg-white/5 text-white border border-white/10 hover:bg-primary hover:text-black hover:border-primary font-semibold transition-all duration-300 group/btn"
                      >
                        View Course
                        <TrendingUp className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
