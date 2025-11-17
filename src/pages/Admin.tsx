import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/contexts/DataContext";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Star, Eye, EyeOff } from "lucide-react";
import type { Course, Service, Review, Banner, ClientLogo } from "@/lib/store";

const Admin = () => {
  const {
    courses,
    addCourse,
    updateCourses,
    deleteCourse,
    services,
    addService,
    updateServices,
    deleteService,
    reviews,
    addReview,
    updateReviews,
    deleteReview,
    banners,
    addBanner,
    updateBanners,
    deleteBanner,
    clients,
    addClient,
    updateClients,
    deleteClient,
  } = useData();

  const { toast } = useToast();

  // Form states
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  // Course Form
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    slug: "",
    category: "live" as "live" | "recording",
    sessionType: "both" as "one-to-one" | "group" | "both",
    oneToOne: "",
    groupMin: "",
    groupMax: "",
    duration: "",
    level: "Intermediate" as "Beginner" | "Intermediate" | "Advanced",
    icon: "Shield",
    curriculum: "",
    recordingsCount: "",
    notes: "",
    playStoreLink: "",
    demoVideoUrl: "",
    isActive: true,
    demoAvailable: false,
  });

  // Service Form
  const [serviceForm, setServiceForm] = useState({
    title: "",
    description: "",
    slug: "",
    icon: "Shield",
    features: "",
    details: "",
    isActive: true,
  });

  // Review Form
  const [reviewForm, setReviewForm] = useState({
    name: "",
    role: "",
    rating: 5 as 1 | 2 | 3 | 4 | 5,
    comment: "",
    isActive: true,
  });

  // Banner Form
  const [bannerForm, setBannerForm] = useState({
    title: "",
    subtitle: "",
    image: "",
    countdownDate: "",
    ctaText: "",
    ctaLink: "",
    isActive: true,
  });

  // Client Logo Form
  const [clientForm, setClientForm] = useState({
    name: "",
    logo: "",
  });

  const [editingClient, setEditingClient] = useState<ClientLogo | null>(null);

  // ============ COURSE CRUD ============
  const handleSaveCourse = () => {
    if (!courseForm.title || !courseForm.slug) {
      toast({ title: "Error", description: "Title and slug are required", variant: "destructive" });
      return;
    }

    const newCourse: Course = {
      id: editingCourse?.id || Date.now().toString(),
      title: courseForm.title,
      description: courseForm.description,
      slug: courseForm.slug,
      category: courseForm.category,
      sessionType: courseForm.category === "live" ? courseForm.sessionType : undefined,
      pricing: {
        oneToOne: courseForm.oneToOne ? parseInt(courseForm.oneToOne) : undefined,
        groupMin: courseForm.groupMin ? parseInt(courseForm.groupMin) : undefined,
        groupMax: courseForm.groupMax ? parseInt(courseForm.groupMax) : undefined,
      },
      duration: courseForm.duration,
      level: courseForm.level,
      gradient: "from-primary via-accent to-primary",
      icon: courseForm.icon,
      curriculum: courseForm.curriculum ? courseForm.curriculum.split("\n").filter(Boolean) : [],
      recordingsCount: courseForm.recordingsCount ? parseInt(courseForm.recordingsCount) : undefined,
      notes: courseForm.notes || undefined,
      playStoreLink: courseForm.playStoreLink || undefined,
      demoVideoUrl: courseForm.demoVideoUrl || undefined,
      isActive: courseForm.isActive,
      demoAvailable: courseForm.demoAvailable,
    };

    if (editingCourse) {
      const updated = courses.map((c) => (c.id === editingCourse.id ? newCourse : c));
      updateCourses(updated);
      toast({ title: "Success", description: "Course updated successfully" });
    } else {
      addCourse(newCourse);
      toast({ title: "Success", description: "Course added successfully" });
    }

    resetCourseForm();
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description,
      slug: course.slug,
      category: course.category,
      sessionType: course.sessionType || "both",
      oneToOne: course.pricing.oneToOne?.toString() || "",
      groupMin: course.pricing.groupMin?.toString() || "",
      groupMax: course.pricing.groupMax?.toString() || "",
      duration: course.duration,
      level: course.level,
      icon: course.icon,
      curriculum: course.curriculum?.join("\n") || "",
      recordingsCount: course.recordingsCount?.toString() || "",
      notes: course.notes || "",
      playStoreLink: course.playStoreLink || "",
      demoVideoUrl: course.demoVideoUrl || "",
      isActive: course.isActive,
      demoAvailable: course.demoAvailable || false,
    });
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      deleteCourse(id);
      toast({ title: "Success", description: "Course deleted successfully" });
    }
  };

  const resetCourseForm = () => {
    setEditingCourse(null);
    setCourseForm({
      title: "",
      description: "",
      slug: "",
      category: "live",
      sessionType: "both",
      oneToOne: "",
      groupMin: "",
      groupMax: "",
      duration: "",
      level: "Intermediate",
      icon: "Shield",
      curriculum: "",
      recordingsCount: "",
      notes: "",
      playStoreLink: "",
      demoVideoUrl: "",
      isActive: true,
      demoAvailable: false,
    });
  };

  // ============ SERVICE CRUD ============
  const handleSaveService = () => {
    if (!serviceForm.title || !serviceForm.slug) {
      toast({ title: "Error", description: "Title and slug are required", variant: "destructive" });
      return;
    }

    const newService: Service = {
      id: editingService?.id || Date.now().toString(),
      title: serviceForm.title,
      description: serviceForm.description,
      slug: serviceForm.slug,
      icon: serviceForm.icon,
      gradient: "from-primary via-accent to-primary",
      features: serviceForm.features.split("\n").filter(Boolean),
      details: serviceForm.details || undefined,
      isActive: serviceForm.isActive,
    };

    if (editingService) {
      const updated = services.map((s) => (s.id === editingService.id ? newService : s));
      updateServices(updated);
      toast({ title: "Success", description: "Service updated successfully" });
    } else {
      addService(newService);
      toast({ title: "Success", description: "Service added successfully" });
    }

    resetServiceForm();
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setServiceForm({
      title: service.title,
      description: service.description,
      slug: service.slug,
      icon: service.icon,
      features: service.features.join("\n"),
      details: service.details || "",
      isActive: service.isActive,
    });
  };

  const handleDeleteService = (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      deleteService(id);
      toast({ title: "Success", description: "Service deleted successfully" });
    }
  };

  const resetServiceForm = () => {
    setEditingService(null);
    setServiceForm({
      title: "",
      description: "",
      slug: "",
      icon: "Shield",
      features: "",
      details: "",
      isActive: true,
    });
  };

  // ============ REVIEW CRUD ============
  const handleSaveReview = () => {
    if (!reviewForm.name || !reviewForm.comment) {
      toast({ title: "Error", description: "Name and comment are required", variant: "destructive" });
      return;
    }

    const newReview: Review = {
      id: editingReview?.id || Date.now().toString(),
      name: reviewForm.name,
      role: reviewForm.role,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      date: editingReview?.date || new Date().toISOString(),
      isActive: reviewForm.isActive,
    };

    if (editingReview) {
      const updated = reviews.map((r) => (r.id === editingReview.id ? newReview : r));
      updateReviews(updated);
      toast({ title: "Success", description: "Review updated successfully" });
    } else {
      addReview(newReview);
      toast({ title: "Success", description: "Review added successfully" });
    }

    resetReviewForm();
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setReviewForm({
      name: review.name,
      role: review.role,
      rating: review.rating,
      comment: review.comment,
      isActive: review.isActive,
    });
  };

  const handleDeleteReview = (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      deleteReview(id);
      toast({ title: "Success", description: "Review deleted successfully" });
    }
  };

  const resetReviewForm = () => {
    setEditingReview(null);
    setReviewForm({
      name: "",
      role: "",
      rating: 5,
      comment: "",
      isActive: true,
    });
  };

  // ============ BANNER CRUD ============
  const handleSaveBanner = () => {
    if (!bannerForm.title) {
      toast({ title: "Error", description: "Title is required", variant: "destructive" });
      return;
    }

    const newBanner: Banner = {
      id: editingBanner?.id || Date.now().toString(),
      title: bannerForm.title,
      subtitle: bannerForm.subtitle,
      image: bannerForm.image,
      countdown: bannerForm.countdownDate ? { endDate: bannerForm.countdownDate } : undefined,
      ctaText: bannerForm.ctaText || undefined,
      ctaLink: bannerForm.ctaLink || undefined,
      isActive: bannerForm.isActive,
    };

    if (editingBanner) {
      const updated = banners.map((b) => (b.id === editingBanner.id ? newBanner : b));
      updateBanners(updated);
      toast({ title: "Success", description: "Banner updated successfully" });
    } else {
      addBanner(newBanner);
      toast({ title: "Success", description: "Banner added successfully" });
    }

    resetBannerForm();
  };

  const handleEditBanner = (banner: Banner) => {
    setEditingBanner(banner);
    setBannerForm({
      title: banner.title,
      subtitle: banner.subtitle,
      image: banner.image,
      countdownDate: banner.countdown?.endDate || "",
      ctaText: banner.ctaText || "",
      ctaLink: banner.ctaLink || "",
      isActive: banner.isActive,
    });
  };

  const handleDeleteBanner = (id: string) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      deleteBanner(id);
      toast({ title: "Success", description: "Banner deleted successfully" });
    }
  };

  const resetBannerForm = () => {
    setEditingBanner(null);
    setBannerForm({
      title: "",
      subtitle: "",
      image: "",
      countdownDate: "",
      ctaText: "",
      ctaLink: "",
      isActive: true,
    });
  };

  // ============ FILE UPLOAD HELPER ============
  const handleFileUpload = (file: File, callback: (base64: string) => void) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({ title: "Error", description: "Please select an image file", variant: "destructive" });
      return;
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      toast({ title: "Error", description: "Image size must be less than 2MB", variant: "destructive" });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // ============ CLIENT CRUD ============
  const handleSaveClient = () => {
    if (!clientForm.name || !clientForm.logo) {
      toast({ title: "Error", description: "Name and logo are required", variant: "destructive" });
      return;
    }

    const newClient: ClientLogo = {
      id: editingClient?.id || Date.now().toString(),
      name: clientForm.name,
      logo: clientForm.logo,
    };

    if (editingClient) {
      const updated = clients.map((c) => (c.id === editingClient.id ? newClient : c));
      updateClients(updated);
      toast({ title: "Success", description: "Client updated successfully" });
    } else {
      addClient(newClient);
      toast({ title: "Success", description: "Client added successfully" });
    }

    resetClientForm();
  };

  const handleEditClient = (client: ClientLogo) => {
    setEditingClient(client);
    setClientForm({
      name: client.name,
      logo: client.logo,
    });
  };

  const handleDeleteClient = (id: string) => {
    if (confirm("Are you sure you want to delete this client?")) {
      deleteClient(id);
      toast({ title: "Success", description: "Client deleted successfully" });
    }
  };

  const resetClientForm = () => {
    setEditingClient(null);
    setClientForm({
      name: "",
      logo: "",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-16 md:pt-20">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Content Management System</h1>

            <Tabs defaultValue="courses" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="banners">Banners</TabsTrigger>
                <TabsTrigger value="clients">Clients</TabsTrigger>
              </TabsList>

              {/* ============ COURSES TAB ============ */}
              <TabsContent value="courses" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Manage Courses</h2>
                  <Button onClick={() => resetCourseForm()} className="rounded-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Course
                  </Button>
                </div>

                {/* Course List */}
                <div className="grid grid-cols-1 gap-4">
                  {courses.map((course) => (
                    <Card key={course.id} className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold">{course.title}</h3>
                            <Badge variant={course.isActive ? "default" : "secondary"}>
                              {course.isActive ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                              {course.isActive ? "Active" : "Inactive"}
                            </Badge>
                            <Badge>{course.category}</Badge>
                            <Badge variant="outline">{course.level}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-4">{course.description}</p>
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <span>Duration: {course.duration}</span>
                            {course.pricing.oneToOne && <span>1-on-1: ₹{course.pricing.oneToOne.toLocaleString()}</span>}
                            {course.pricing.groupMin && <span>Group: ₹{course.pricing.groupMin.toLocaleString()} - ₹{course.pricing.groupMax?.toLocaleString()}</span>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="rounded-full" onClick={() => handleEditCourse(course)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-full text-destructive" onClick={() => handleDeleteCourse(course.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Course Form */}
                <Card className="p-6 mt-6">
                  <h3 className="text-xl font-bold mb-4">{editingCourse ? "Edit Course" : "Add New Course"}</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Course Title *</label>
                        <Input value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} placeholder="Ethical Hacking" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Slug *</label>
                        <Input value={courseForm.slug} onChange={(e) => setCourseForm({ ...courseForm, slug: e.target.value })} placeholder="ethical-hacking" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea value={courseForm.description} onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })} rows={3} />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <select className="w-full px-4 py-2 rounded-lg border bg-background" value={courseForm.category} onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value as "live" | "recording" })}>
                          <option value="live">Live</option>
                          <option value="recording">Recording</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Level</label>
                        <select className="w-full px-4 py-2 rounded-lg border bg-background" value={courseForm.level} onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value as "Beginner" | "Intermediate" | "Advanced" })}>
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Duration</label>
                        <Input value={courseForm.duration} onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })} placeholder="6 months" />
                      </div>
                    </div>

                    {courseForm.category === "live" && (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Session Type</label>
                          <select className="w-full px-4 py-2 rounded-lg border bg-background" value={courseForm.sessionType} onChange={(e) => setCourseForm({ ...courseForm, sessionType: e.target.value as "one-to-one" | "group" | "both" })}>
                            <option value="one-to-one">One-to-One</option>
                            <option value="group">Group</option>
                            <option value="both">Both</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">One-to-One Price</label>
                            <Input type="number" value={courseForm.oneToOne} onChange={(e) => setCourseForm({ ...courseForm, oneToOne: e.target.value })} placeholder="40000" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Group Min Price</label>
                            <Input type="number" value={courseForm.groupMin} onChange={(e) => setCourseForm({ ...courseForm, groupMin: e.target.value })} placeholder="15000" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Group Max Price</label>
                            <Input type="number" value={courseForm.groupMax} onChange={(e) => setCourseForm({ ...courseForm, groupMax: e.target.value })} placeholder="20000" />
                          </div>
                        </div>
                      </>
                    )}

                    {courseForm.category === "recording" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Recordings Count</label>
                          <Input type="number" value={courseForm.recordingsCount} onChange={(e) => setCourseForm({ ...courseForm, recordingsCount: e.target.value })} placeholder="150" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Play Store Link</label>
                          <Input value={courseForm.playStoreLink} onChange={(e) => setCourseForm({ ...courseForm, playStoreLink: e.target.value })} placeholder="https://play.google.com/..." />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Curriculum (one per line)</label>
                      <Textarea value={courseForm.curriculum} onChange={(e) => setCourseForm({ ...courseForm, curriculum: e.target.value })} rows={5} placeholder="Introduction to Hacking&#10;Network Security&#10;Web Security" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Notes</label>
                      <Textarea value={courseForm.notes} onChange={(e) => setCourseForm({ ...courseForm, notes: e.target.value })} rows={3} />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Demo Video URL (YouTube)</label>
                      <Input value={courseForm.demoVideoUrl} onChange={(e) => setCourseForm({ ...courseForm, demoVideoUrl: e.target.value })} placeholder="https://www.youtube.com/watch?v=..." />
                      <p className="text-xs text-muted-foreground">Enter a YouTube video URL to display as a demo video on the course page</p>
                    </div>

                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" checked={courseForm.isActive} onChange={(e) => setCourseForm({ ...courseForm, isActive: e.target.checked })} />
                        <span className="text-sm font-medium">Active</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" checked={courseForm.demoAvailable} onChange={(e) => setCourseForm({ ...courseForm, demoAvailable: e.target.checked })} />
                        <span className="text-sm font-medium">Demo Available</span>
                      </label>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleSaveCourse} className="rounded-full">
                        {editingCourse ? "Update Course" : "Save Course"}
                      </Button>
                      {editingCourse && (
                        <Button onClick={resetCourseForm} variant="outline" className="rounded-full">
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* ============ SERVICES TAB ============ */}
              <TabsContent value="services" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Manage Services</h2>
                  <Button onClick={() => resetServiceForm()} className="rounded-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service
                  </Button>
                </div>

                {/* Service List */}
                <div className="grid grid-cols-1 gap-4">
                  {services.map((service) => (
                    <Card key={service.id} className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold">{service.title}</h3>
                            <Badge variant={service.isActive ? "default" : "secondary"}>
                              {service.isActive ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                              {service.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{service.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {service.features.map((feature, idx) => (
                              <Badge key={idx} variant="outline">{feature}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="rounded-full" onClick={() => handleEditService(service)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-full text-destructive" onClick={() => handleDeleteService(service.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Service Form */}
                <Card className="p-6 mt-6">
                  <h3 className="text-xl font-bold mb-4">{editingService ? "Edit Service" : "Add New Service"}</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Service Title *</label>
                        <Input value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })} placeholder="WPAT Testing" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Slug *</label>
                        <Input value={serviceForm.slug} onChange={(e) => setServiceForm({ ...serviceForm, slug: e.target.value })} placeholder="wpat-testing" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} rows={3} />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Features (one per line)</label>
                      <Textarea value={serviceForm.features} onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })} rows={4} placeholder="Web Application Testing&#10;Mobile App Testing&#10;OWASP Top 10" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Details</label>
                      <Textarea value={serviceForm.details} onChange={(e) => setServiceForm({ ...serviceForm, details: e.target.value })} rows={3} />
                    </div>

                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={serviceForm.isActive} onChange={(e) => setServiceForm({ ...serviceForm, isActive: e.target.checked })} />
                      <span className="text-sm font-medium">Active</span>
                    </label>

                    <div className="flex gap-2">
                      <Button onClick={handleSaveService} className="rounded-full">
                        {editingService ? "Update Service" : "Save Service"}
                      </Button>
                      {editingService && (
                        <Button onClick={resetServiceForm} variant="outline" className="rounded-full">
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* ============ REVIEWS TAB ============ */}
              <TabsContent value="reviews" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Manage Reviews</h2>
                  <Button onClick={() => resetReviewForm()} className="rounded-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Review
                  </Button>
                </div>

                {/* Review List */}
                <div className="grid grid-cols-1 gap-4">
                  {reviews.map((review) => (
                    <Card key={review.id} className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold">{review.name}</h3>
                            <Badge variant={review.isActive ? "default" : "secondary"}>
                              {review.isActive ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                              {review.isActive ? "Active" : "Inactive"}
                            </Badge>
                            <div className="flex gap-0.5">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{review.role}</p>
                          <p className="text-muted-foreground italic">"{review.comment}"</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="rounded-full" onClick={() => handleEditReview(review)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-full text-destructive" onClick={() => handleDeleteReview(review.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Review Form */}
                <Card className="p-6 mt-6">
                  <h3 className="text-xl font-bold mb-4">{editingReview ? "Edit Review" : "Add New Review"}</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Name *</label>
                        <Input value={reviewForm.name} onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })} placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Role</label>
                        <Input value={reviewForm.role} onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })} placeholder="Security Analyst" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Rating</label>
                      <select className="w-full px-4 py-2 rounded-lg border bg-background" value={reviewForm.rating} onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 })}>
                        <option value={5}>5 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={2}>2 Stars</option>
                        <option value={1}>1 Star</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Comment *</label>
                      <Textarea value={reviewForm.comment} onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })} rows={4} placeholder="Share your experience..." />
                    </div>

                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={reviewForm.isActive} onChange={(e) => setReviewForm({ ...reviewForm, isActive: e.target.checked })} />
                      <span className="text-sm font-medium">Active</span>
                    </label>

                    <div className="flex gap-2">
                      <Button onClick={handleSaveReview} className="rounded-full">
                        {editingReview ? "Update Review" : "Save Review"}
                      </Button>
                      {editingReview && (
                        <Button onClick={resetReviewForm} variant="outline" className="rounded-full">
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* ============ BANNERS TAB ============ */}
              <TabsContent value="banners" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Manage Banners</h2>
                  <Button onClick={() => resetBannerForm()} className="rounded-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Banner
                  </Button>
                </div>

                {/* Banner List */}
                <div className="grid grid-cols-1 gap-4">
                  {banners.map((banner) => (
                    <Card key={banner.id} className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold">{banner.title}</h3>
                            <Badge variant={banner.isActive ? "default" : "secondary"}>
                              {banner.isActive ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                              {banner.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-2">{banner.subtitle}</p>
                          {banner.ctaText && <Badge variant="outline">{banner.ctaText} → {banner.ctaLink}</Badge>}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="rounded-full" onClick={() => handleEditBanner(banner)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-full text-destructive" onClick={() => handleDeleteBanner(banner.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Banner Form */}
                <Card className="p-6 mt-6">
                  <h3 className="text-xl font-bold mb-4">{editingBanner ? "Edit Banner" : "Add New Banner"}</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Title *</label>
                        <Input value={bannerForm.title} onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })} placeholder="Ethical Hacking Masterclass" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Subtitle</label>
                        <Input value={bannerForm.subtitle} onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })} placeholder="6-Month Training Program" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Banner Image</label>
                      <div className="space-y-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(file, (base64) => {
                                setBannerForm({ ...bannerForm, image: base64 });
                              });
                            }
                          }}
                          className="cursor-pointer"
                        />
                        <Input
                          value={bannerForm.image}
                          onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.value })}
                          placeholder="Or enter image URL"
                        />
                        {bannerForm.image && (
                          <div className="mt-2 p-2 border rounded-lg">
                            <img
                              src={bannerForm.image}
                              alt="Preview"
                              className="max-h-32 object-contain mx-auto"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">CTA Text</label>
                        <Input value={bannerForm.ctaText} onChange={(e) => setBannerForm({ ...bannerForm, ctaText: e.target.value })} placeholder="Enroll Now" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">CTA Link</label>
                        <Input value={bannerForm.ctaLink} onChange={(e) => setBannerForm({ ...bannerForm, ctaLink: e.target.value })} placeholder="/courses/ethical-hacking" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Countdown End Date (ISO format)</label>
                      <Input value={bannerForm.countdownDate} onChange={(e) => setBannerForm({ ...bannerForm, countdownDate: e.target.value })} placeholder="2025-12-31T23:59:59Z" />
                    </div>

                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={bannerForm.isActive} onChange={(e) => setBannerForm({ ...bannerForm, isActive: e.target.checked })} />
                      <span className="text-sm font-medium">Active</span>
                    </label>

                    <div className="flex gap-2">
                      <Button onClick={handleSaveBanner} className="rounded-full">
                        {editingBanner ? "Update Banner" : "Save Banner"}
                      </Button>
                      {editingBanner && (
                        <Button onClick={resetBannerForm} variant="outline" className="rounded-full">
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* ============ CLIENTS TAB ============ */}
              <TabsContent value="clients" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Manage Client Logos</h2>
                  <Button onClick={() => resetClientForm()} className="rounded-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Client
                  </Button>
                </div>

                {/* Client List */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {clients.map((client) => (
                    <Card key={client.id} className="p-4 text-center">
                      <div className="aspect-square bg-secondary/30 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                        {client.logo ? (
                          <img
                            src={client.logo}
                            alt={client.name}
                            className="w-full h-full object-contain p-2"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <span className="text-muted-foreground text-xs">{client.name}</span>
                        )}
                      </div>
                      <p className="text-sm font-medium truncate mb-2">{client.name}</p>
                      <div className="flex gap-2 justify-center">
                        <Button variant="outline" size="sm" className="rounded-full flex-1" onClick={() => handleEditClient(client)}>
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full text-destructive" onClick={() => handleDeleteClient(client.id)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Client Form */}
                <Card className="p-6 mt-6">
                  <h3 className="text-xl font-bold mb-4">{editingClient ? "Edit Client" : "Add New Client"}</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Client Name *</label>
                      <Input
                        value={clientForm.name}
                        onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                        placeholder="Company Name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Client Logo *</label>
                      <div className="space-y-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(file, (base64) => {
                                setClientForm({ ...clientForm, logo: base64 });
                              });
                            }
                          }}
                          className="cursor-pointer"
                        />
                        <Input
                          value={clientForm.logo}
                          onChange={(e) => setClientForm({ ...clientForm, logo: e.target.value })}
                          placeholder="Or enter logo URL"
                        />
                        {clientForm.logo && (
                          <div className="mt-2 p-4 border rounded-lg bg-secondary/10">
                            <img
                              src={clientForm.logo}
                              alt="Preview"
                              className="max-h-24 object-contain mx-auto"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleSaveClient} className="rounded-full">
                        {editingClient ? "Update Client" : "Save Client"}
                      </Button>
                      {editingClient && (
                        <Button onClick={resetClientForm} variant="outline" className="rounded-full">
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
