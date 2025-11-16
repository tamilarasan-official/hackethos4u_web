import { useState } from "react";
import { Clock, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ethicalHackingImg from "@/assets/course-ethical-hacking.jpg";
import vaptImg from "@/assets/course-vapt.jpg";
import bugBountyImg from "@/assets/course-bug-bounty.jpg";

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  students: number;
  image: string;
  category: string;
  progress?: number;
  slug: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: "Ethical Hacking Masterclass",
    description: "Complete 6-month program covering penetration testing, network security, and more.",
    duration: "6 months",
    students: 1250,
    image: ethicalHackingImg,
    category: "Cybersecurity",
    progress: 68,
    slug: "ethical-hacking",
  },
  {
    id: 2,
    title: "VAPT Professional",
    description: "Advanced vulnerability assessment and penetration testing techniques.",
    duration: "4 months",
    students: 890,
    image: vaptImg,
    category: "Cybersecurity",
    progress: 45,
    slug: "vapt",
  },
  {
    id: 3,
    title: "Bug Bounty Bootcamp",
    description: "Learn to find vulnerabilities and earn through bug bounty programs.",
    duration: "3 months",
    students: 650,
    image: bugBountyImg,
    category: "Cybersecurity",
    progress: 82,
    slug: "bug-bounty",
  },
  {
    id: 4,
    title: "AR/VR Security",
    description: "Security testing for augmented and virtual reality applications.",
    duration: "2 months",
    students: 320,
    image: ethicalHackingImg,
    category: "AR VR",
    slug: "ar-vr-security",
  },
];

const CoursesSection = () => {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Cybersecurity", "AR VR"];

  const filteredCourses =
    activeTab === "All"
      ? courses
      : courses.filter((course) => course.category === activeTab);

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Courses</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Industry-leading cybersecurity training programs
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-medium transition-smooth ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-foreground hover:bg-primary/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-smooth hover:scale-105"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                {course.progress && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-primary">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-1.5">
                      <div
                        className="bg-primary rounded-full h-1.5 transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <Link to={`/courses/${course.slug}`}>
                  <Button className="w-full rounded-full">View Course</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
