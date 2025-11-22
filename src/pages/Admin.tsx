import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import PasswordChangeDialog from "@/components/PasswordChangeDialog";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useToast } from "@/hooks/use-toast";
import {
  Plus, Edit, Trash2, Star, Eye, EyeOff, LogOut, User,
  BookOpen, Briefcase, MessageSquare, Image, Users, Mail,
  CheckCircle, UserPlus, ThumbsUp, ThumbsDown, Menu, X, LayoutDashboard
} from "lucide-react";
import type { Course, Service, Review, Banner, ClientLogo, Contact } from "@/lib/store";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SEO from "@/components/SEO";

const Admin = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const {
    courses, addCourse, updateCourse, deleteCourse,
    services, addService, updateService, deleteService,
    reviews, addReview, updateReview, deleteReview,
    banners, addBanner, updateBanner, deleteBanner,
    clients, addClient, updateClient, deleteClient,
    contacts, updateContact, deleteContact,
  } = useData();

  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("courses");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Confirm Dialog State
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  }>({
    open: false,
    title: '',
    description: '',
    onConfirm: () => {},
  });

  // Refs for scrolling to form sections
  const courseFormRef = useRef<HTMLDivElement>(null);
  const serviceFormRef = useRef<HTMLDivElement>(null);
  const reviewFormRef = useRef<HTMLDivElement>(null);
  const bannerFormRef = useRef<HTMLDivElement>(null);
  const clientFormRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin-access');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Scroll to form section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Form states
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  // Course Form
  const [courseForm, setCourseForm] = useState({
    title: "", description: "", slug: "",
    category: "live" as "live" | "recording",
    sessionType: "both" as "one-to-one" | "group" | "both",
    oneToOne: "", groupMin: "", groupMax: "",
    duration: "", level: "Intermediate" as "Beginner" | "Intermediate" | "Advanced",
    icon: "Shield", curriculum: "", recordingsCount: "",
    notes: "", playStoreLink: "", demoVideoUrl: "",
    isActive: true, demoAvailable: false,
  });

  // Service Form
  const [serviceForm, setServiceForm] = useState({
    title: "", description: "", slug: "", icon: "Shield",
    features: "", details: "", isActive: true,
  });

  // Review Form
  const [reviewForm, setReviewForm] = useState({
    name: "", role: "", rating: 5 as 1 | 2 | 3 | 4 | 5,
    comment: "", date: new Date().toISOString().split('T')[0],
    avatar: "", isActive: true,
  });

  // Banner Form
  const [bannerForm, setBannerForm] = useState({
    title: "", subtitle: "", image: "", ctaText: "",
    ctaLink: "", countdownEndDate: "", isActive: true,
  });

  // Client Form
  const [clientForm, setClientForm] = useState({
    name: "", logo: "", website: "", isActive: true,
  });

  // Sidebar navigation items
  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "services", label: "Services", icon: Briefcase },
    { id: "reviews", label: "Reviews", icon: MessageSquare },
    { id: "banners", label: "Banners", icon: Image },
    { id: "clients", label: "Clients", icon: Users },
    { id: "contacts", label: "Contacts", icon: Mail },
  ];

  // Course Handlers
  const handleSaveCourse = async () => {
    try {
      const courseData: any = {
        title: courseForm.title,
        slug: courseForm.slug,
        description: courseForm.description,
        category: courseForm.category,
        level: courseForm.level,
        duration: courseForm.duration,
        icon: courseForm.icon,
        curriculum: courseForm.curriculum.split('\n').filter(Boolean),
        notes: courseForm.notes.split('\n').filter(Boolean),
        isActive: courseForm.isActive,
        demoAvailable: courseForm.demoAvailable,
        demoVideoUrl: courseForm.demoVideoUrl || undefined,
      };

      if (courseForm.category === 'live') {
        courseData.sessionType = courseForm.sessionType;
        courseData.pricing = {
          oneToOne: courseForm.oneToOne ? parseInt(courseForm.oneToOne) : undefined,
          groupMin: courseForm.groupMin ? parseInt(courseForm.groupMin) : undefined,
          groupMax: courseForm.groupMax ? parseInt(courseForm.groupMax) : undefined,
        };
      } else {
        courseData.recordingsCount = courseForm.recordingsCount ? parseInt(courseForm.recordingsCount) : undefined;
        courseData.playStoreLink = courseForm.playStoreLink || undefined;
      }

      if (editingCourse) {
        await updateCourse(editingCourse.id, courseData);
        setEditingCourse(null);
      } else {
        await addCourse(courseData);
      }

      setCourseForm({
        title: "", description: "", slug: "", category: "live", sessionType: "both",
        oneToOne: "", groupMin: "", groupMax: "", duration: "", level: "Intermediate",
        icon: "Shield", curriculum: "", recordingsCount: "", notes: "", playStoreLink: "",
        demoVideoUrl: "", isActive: true, demoAvailable: false,
      });
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description,
      slug: course.slug,
      category: course.category,
      sessionType: course.sessionType || "both",
      oneToOne: course.pricing?.oneToOne?.toString() || "",
      groupMin: course.pricing?.groupMin?.toString() || "",
      groupMax: course.pricing?.groupMax?.toString() || "",
      duration: course.duration,
      level: course.level,
      icon: course.icon,
      curriculum: Array.isArray(course.curriculum) ? course.curriculum.join('\n') : (course.curriculum || ""),
      recordingsCount: course.recordingsCount?.toString() || "",
      notes: Array.isArray(course.notes) ? course.notes.join('\n') : (course.notes || ""),
      playStoreLink: course.playStoreLink || "",
      demoVideoUrl: course.demoVideoUrl || "",
      isActive: course.isActive,
      demoAvailable: course.demoAvailable || false,
    });
    // Scroll to form after setting the data
    scrollToSection(courseFormRef);
  };

  const handleDeleteCourse = async (id: string) => {
    setConfirmDialog({
      open: true,
      title: 'Delete Course',
      description: 'Are you sure you want to delete this course? This action cannot be undone.',
      onConfirm: () => deleteCourse(id),
    });
  };

  // Service Handlers
  const handleSaveService = async () => {
    // Validate required fields
    if (!serviceForm.title.trim()) {
      toast({ title: "Error", description: "Please enter a service title", variant: "destructive" });
      return;
    }
    if (!serviceForm.slug.trim()) {
      toast({ title: "Error", description: "Please enter a slug", variant: "destructive" });
      return;
    }

    try {
      const serviceData: any = {
        title: serviceForm.title,
        slug: serviceForm.slug,
        description: serviceForm.description,
        icon: serviceForm.icon,
        features: serviceForm.features.split('\n').filter(Boolean),
        details: serviceForm.details.split('\n').filter(Boolean),
        isActive: serviceForm.isActive,
      };

      if (editingService) {
        await updateService(editingService.id, serviceData);
        setEditingService(null);
        toast({ title: "Success", description: "Service updated successfully!" });
      } else {
        await addService(serviceData);
        toast({ title: "Success", description: "Service added successfully!" });
      }

      setServiceForm({
        title: "", description: "", slug: "", icon: "Shield",
        features: "", details: "", isActive: true,
      });
    } catch (error) {
      console.error("Error saving service:", error);
      toast({ title: "Error", description: "Failed to save service", variant: "destructive" });
    }
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setServiceForm({
      title: service.title,
      description: service.description,
      slug: service.slug,
      icon: service.icon,
      features: Array.isArray(service.features) ? service.features.join('\n') : (service.features || ""),
      details: Array.isArray(service.details) ? service.details.join('\n') : (service.details || ""),
      isActive: service.isActive,
    });
    // Scroll to form after setting the data
    scrollToSection(serviceFormRef);
  };

  const handleDeleteService = async (id: string) => {
    setConfirmDialog({
      open: true,
      title: 'Delete Service',
      description: 'Are you sure you want to delete this service? This action cannot be undone.',
      onConfirm: () => deleteService(id),
    });
  };

  // Review Handlers
  const handleSaveReview = async () => {
    // Validate required fields
    if (!reviewForm.name.trim()) {
      toast({ title: "Error", description: "Please enter a name", variant: "destructive" });
      return;
    }
    if (!reviewForm.role.trim()) {
      toast({ title: "Error", description: "Please enter a role", variant: "destructive" });
      return;
    }
    if (!reviewForm.comment.trim()) {
      toast({ title: "Error", description: "Please enter a comment", variant: "destructive" });
      return;
    }

    try {
      const reviewData: any = {
        name: reviewForm.name,
        role: reviewForm.role,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        date: reviewForm.date ? new Date(reviewForm.date).toISOString() : new Date().toISOString(), // Convert yyyy-MM-dd to ISO
        avatar: reviewForm.avatar,
        isActive: reviewForm.isActive,
      };

      if (editingReview) {
        await updateReview(editingReview.id, reviewData);
        setEditingReview(null);
        toast({ title: "Success", description: "Review updated successfully!" });
      } else {
        await addReview(reviewData);
        toast({ title: "Success", description: "Review added successfully!" });
      }

      setReviewForm({
        name: "", role: "", rating: 5, comment: "",
        date: new Date().toISOString().split('T')[0],
        avatar: "", isActive: true,
      });
    } catch (error) {
      console.error("Error saving review:", error);
      toast({ title: "Error", description: "Failed to save review", variant: "destructive" });
    }
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setReviewForm({
      name: review.name,
      role: review.role,
      rating: review.rating,
      comment: review.comment,
      date: review.date ? review.date.split('T')[0] : new Date().toISOString().split('T')[0], // Convert ISO to yyyy-MM-dd
      avatar: review.avatar || "",
      isActive: review.isActive,
    });
    // Scroll to form after setting the data
    scrollToSection(reviewFormRef);
  };

  const handleDeleteReview = async (id: string) => {
    setConfirmDialog({
      open: true,
      title: 'Delete Review',
      description: 'Are you sure you want to delete this review? This action cannot be undone.',
      onConfirm: () => deleteReview(id),
    });
  };

  // Banner Handlers
  const handleSaveBanner = async () => {
    // Validate required fields
    if (!bannerForm.title.trim()) {
      toast({ title: "Error", description: "Please enter a banner title", variant: "destructive" });
      return;
    }
    if (!bannerForm.image.trim()) {
      toast({ title: "Error", description: "Please enter an image URL", variant: "destructive" });
      return;
    }

    try {
      const bannerData: any = {
        title: bannerForm.title,
        subtitle: bannerForm.subtitle,
        image: bannerForm.image,
        ctaText: bannerForm.ctaText,
        ctaLink: bannerForm.ctaLink,
        isActive: bannerForm.isActive,
      };

      if (bannerForm.countdownEndDate) {
        bannerData.countdown = {
          endDate: new Date(bannerForm.countdownEndDate).toISOString(),
        };
      }

      if (editingBanner) {
        await updateBanner(editingBanner.id, bannerData);
        setEditingBanner(null);
        toast({ title: "Success", description: "Banner updated successfully!" });
      } else {
        await addBanner(bannerData);
        toast({ title: "Success", description: "Banner added successfully!" });
      }

      setBannerForm({
        title: "", subtitle: "", image: "", ctaText: "",
        ctaLink: "", countdownEndDate: "", isActive: true,
      });
    } catch (error) {
      console.error("Error saving banner:", error);
      toast({ title: "Error", description: "Failed to save banner", variant: "destructive" });
    }
  };

  const handleEditBanner = (banner: Banner) => {
    setEditingBanner(banner);
    setBannerForm({
      title: banner.title,
      subtitle: banner.subtitle,
      image: banner.image,
      ctaText: banner.ctaText || "",
      ctaLink: banner.ctaLink || "",
      countdownEndDate: banner.countdown?.endDate ? new Date(banner.countdown.endDate).toISOString().split('T')[0] : "",
      isActive: banner.isActive,
    });
    // Scroll to form after setting the data
    scrollToSection(bannerFormRef);
  };

  const handleDeleteBanner = async (id: string) => {
    setConfirmDialog({
      open: true,
      title: 'Delete Banner',
      description: 'Are you sure you want to delete this banner? This action cannot be undone.',
      onConfirm: () => deleteBanner(id),
    });
  };

  // Client Handlers
  const handleSaveClient = async () => {
    try {
      const clientData: any = {
        name: clientForm.name,
        logo: clientForm.logo,
        website: clientForm.website,
        isActive: clientForm.isActive,
      };

      await addClient(clientData);
      setClientForm({ name: "", logo: "", website: "", isActive: true });
    } catch (error) {
      console.error("Error saving client:", error);
    }
  };

  const handleDeleteClient = async (id: string) => {
    setConfirmDialog({
      open: true,
      title: 'Delete Client',
      description: 'Are you sure you want to delete this client? This action cannot be undone.',
      onConfirm: () => deleteClient(id),
    });
  };

  // Contact Handlers
  const handleUpdateContactStatus = async (id: string, status: Contact['status']) => {
    await updateContact(id, { status });
  };

  const handleDeleteContact = async (id: string) => {
    setConfirmDialog({
      open: true,
      title: 'Delete Contact',
      description: 'Are you sure you want to delete this contact? This action cannot be undone.',
      onConfirm: () => deleteContact(id),
    });
  };

  const handleConvertToReview = async (contact: Contact, rating: number) => {
    try {
      await addReview({
        name: contact.name,
        role: "Customer",
        rating: rating as 1 | 2 | 3 | 4 | 5,
        comment: contact.message,
        date: contact.date,
        avatar: "",
        isActive: true,
      });
      await updateContact(contact.id, { status: 'converted' });
      toast({ title: "Success", description: "Contact converted to review successfully!" });
    } catch (error) {
      console.error("Error converting to review:", error);
    }
  };

  return (
    <>
      <SEO
        title="Admin Panel - Hackethos4U"
        description="Admin panel for managing Hackethos4U website content"
        noindex={true}
      />
      <div className="min-h-screen bg-background lg:flex">
        {/* Sidebar - Fixed on all screen sizes */}
      <aside className={`fixed top-0 left-0 h-screen bg-card border-r border-white/10 z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} w-64 flex flex-col`}>
          {/* Logo */}
          <div className="p-6 border-b border-white/10 flex-shrink-0">
            <h2 className="text-xl font-bold text-white">Admin Panel</h2>
            <p className="text-xs text-muted-foreground mt-1">Content Management</p>
          </div>

          {/* Navigation - Scrollable */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-primary text-black font-semibold'
                        : 'text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* User Section - Fixed at Bottom */}
          <div className="border-t border-white/10 bg-card/50 backdrop-blur-sm flex-shrink-0">
            {/* User Info */}
            <div className="px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground font-medium">Admin</p>
                <p className="text-xs text-white truncate">{currentUser?.email}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-4 pb-4 space-y-2">
              <PasswordChangeDialog />
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="w-full border-white/10 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-white/10 z-30 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {navigationItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h1>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Courses</p>
                    <h3 className="text-3xl font-bold text-white mt-1">{courses.length}</h3>
                  </div>
                  <BookOpen className="w-12 h-12 text-blue-500" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Services</p>
                    <h3 className="text-3xl font-bold text-white mt-1">{services.length}</h3>
                  </div>
                  <Briefcase className="w-12 h-12 text-purple-500" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Reviews</p>
                    <h3 className="text-3xl font-bold text-white mt-1">{reviews.length}</h3>
                  </div>
                  <MessageSquare className="w-12 h-12 text-green-500" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Banners</p>
                    <h3 className="text-3xl font-bold text-white mt-1">{banners.length}</h3>
                  </div>
                  <Image className="w-12 h-12 text-orange-500" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Clients</p>
                    <h3 className="text-3xl font-bold text-white mt-1">{clients.length}</h3>
                  </div>
                  <Users className="w-12 h-12 text-cyan-500" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-yellow-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">New Contacts</p>
                    <h3 className="text-3xl font-bold text-white mt-1">
                      {contacts.filter(c => c.status === 'new').length}
                    </h3>
                  </div>
                  <Mail className="w-12 h-12 text-yellow-500" />
                </div>
              </Card>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              {/* Course List */}
              <Card className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Manage Courses</h2>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-black hover:text-black" onClick={() => scrollToSection(courseFormRef)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Course
                  </Button>
                </div>

                <div className="space-y-4">
                  {courses.map((course) => (
                    <Card key={course.id} className="p-4 sm:p-6 bg-white/5 border-white/10">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-base sm:text-lg font-semibold text-white flex-1">{course.title}</h3>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditCourse(course)}
                              className="border-white/10 hover:bg-white/5 text-white hover:text-white px-3 py-2"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteCourse(course.id)}
                              className="border-red-500/20 hover:bg-red-500/10 text-red-500 px-3 py-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant={course.isActive ? "default" : "secondary"} className="text-xs">
                            {course.isActive ? (
                              <><Eye className="w-3 h-3 mr-1" /> Active</>
                            ) : (
                              <><EyeOff className="w-3 h-3 mr-1" /> Inactive</>
                            )}
                          </Badge>
                          <Badge variant="outline" className="text-xs">{course.category}</Badge>
                          <Badge variant="outline" className="text-xs">{course.level}</Badge>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-3">{course.description}</p>

                        <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                          <span className="font-medium">Duration: {course.duration}</span>
                          {course.pricing && (
                            <div className="space-y-1">
                              <span className="block">1-on-1: ₹{course.pricing.oneToOne?.toLocaleString()}</span>
                              <span className="block">Group: ₹{course.pricing.groupMin?.toLocaleString()} - ₹{course.pricing.groupMax?.toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Course Form */}
              <Card className="p-4 sm:p-6" ref={courseFormRef}>
                <h3 className="text-lg font-bold text-white mb-6">
                  {editingCourse ? 'Edit Course' : 'Add New Course'}
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">Course Title *</label>
                      <Input
                        value={courseForm.title}
                        onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                        placeholder="Ethical Hacking"
                        className="bg-white/5 border-white/10 text-white h-12 text-base"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">Slug *</label>
                      <Input
                        value={courseForm.slug}
                        onChange={(e) => setCourseForm({ ...courseForm, slug: e.target.value })}
                        placeholder="ethical-hacking"
                        className="bg-white/5 border-white/10 text-white h-12 text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Description</label>
                    <Textarea
                      value={courseForm.description}
                      onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">Category</label>
                      <select
                        value={courseForm.category}
                        onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value as "live" | "recording" })}
                        className="w-full px-4 py-3 rounded-lg border bg-white/5 border-white/10 text-white text-base h-12"
                      >
                        <option value="live" className="bg-gray-900 text-white">Live</option>
                        <option value="recording" className="bg-gray-900 text-white">Recording</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">Level</label>
                      <select
                        value={courseForm.level}
                        onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value as any })}
                        className="w-full px-4 py-3 rounded-lg border bg-white/5 border-white/10 text-white text-base h-12"
                      >
                        <option value="Beginner" className="bg-gray-900 text-white">Beginner</option>
                        <option value="Intermediate" className="bg-gray-900 text-white">Intermediate</option>
                        <option value="Advanced" className="bg-gray-900 text-white">Advanced</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">Duration</label>
                      <Input
                        value={courseForm.duration}
                        onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                        placeholder="6 months"
                        className="bg-white/5 border-white/10 text-white h-12 text-base"
                      />
                    </div>
                  </div>

                  {courseForm.category === 'live' && (
                    <>
                      <div>
                        <label className="text-sm font-medium text-white mb-2 block">Session Type</label>
                        <select
                          value={courseForm.sessionType}
                          onChange={(e) => setCourseForm({ ...courseForm, sessionType: e.target.value as any })}
                          className="w-full px-4 py-3 rounded-lg border bg-white/5 border-white/10 text-white text-base h-12"
                        >
                          <option value="one-to-one" className="bg-gray-900 text-white">One-to-One</option>
                          <option value="group" className="bg-gray-900 text-white">Group</option>
                          <option value="both" className="bg-gray-900 text-white">Both</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium text-white mb-2 block">One-to-One Price</label>
                          <Input
                            type="number"
                            value={courseForm.oneToOne}
                            onChange={(e) => setCourseForm({ ...courseForm, oneToOne: e.target.value })}
                            placeholder="40000"
                            className="bg-white/5 border-white/10 text-white h-12 text-base"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-white mb-2 block">Group Min Price</label>
                          <Input
                            type="number"
                            value={courseForm.groupMin}
                            onChange={(e) => setCourseForm({ ...courseForm, groupMin: e.target.value })}
                            placeholder="15000"
                            className="bg-white/5 border-white/10 text-white h-12 text-base"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-white mb-2 block">Group Max Price</label>
                          <Input
                            type="number"
                            value={courseForm.groupMax}
                            onChange={(e) => setCourseForm({ ...courseForm, groupMax: e.target.value })}
                            placeholder="20000"
                            className="bg-white/5 border-white/10 text-white h-12 text-base"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {courseForm.category === 'recording' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-white mb-2 block">Recordings Count</label>
                        <Input
                          type="number"
                          value={courseForm.recordingsCount}
                          onChange={(e) => setCourseForm({ ...courseForm, recordingsCount: e.target.value })}
                          placeholder="150"
                          className="bg-white/5 border-white/10 text-white h-12 text-base"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-white mb-2 block">Play Store Link</label>
                        <Input
                          value={courseForm.playStoreLink}
                          onChange={(e) => setCourseForm({ ...courseForm, playStoreLink: e.target.value })}
                          placeholder="https://play.google.com/store/..."
                          className="bg-white/5 border-white/10 text-white h-12 text-base"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Curriculum (one per line)</label>
                    <Textarea
                      value={courseForm.curriculum}
                      onChange={(e) => setCourseForm({ ...courseForm, curriculum: e.target.value })}
                      placeholder="Introduction to Hacking&#10;Network Security&#10;Web Security"
                      className="bg-white/5 border-white/10 text-white"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Notes</label>
                    <Textarea
                      value={courseForm.notes}
                      onChange={(e) => setCourseForm({ ...courseForm, notes: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Demo Video URL (YouTube)</label>
                    <Input
                      value={courseForm.demoVideoUrl}
                      onChange={(e) => setCourseForm({ ...courseForm, demoVideoUrl: e.target.value })}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="bg-white/5 border-white/10 text-white"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter a YouTube video URL to display as a demo video on the course page
                    </p>
                  </div>

                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={courseForm.isActive}
                        onChange={(e) => setCourseForm({ ...courseForm, isActive: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-white">Active</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={courseForm.demoAvailable}
                        onChange={(e) => setCourseForm({ ...courseForm, demoAvailable: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-white">Demo Available</span>
                    </label>
                  </div>

                  <Button onClick={handleSaveCourse} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-black">
                    {editingCourse ? 'Update Course' : 'Save Course'}
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              {/* Service List */}
              <Card className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Manage Services</h2>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-black hover:text-black" onClick={() => scrollToSection(serviceFormRef)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service
                  </Button>
                </div>

                <div className="space-y-4">
                  {services.map((service) => (
                    <Card key={service.id} className="p-4 sm:p-6 bg-white/5 border-white/10">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-base sm:text-lg font-semibold text-white flex-1">{service.title}</h3>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditService(service)}
                              className="border-white/10 hover:bg-white/5 text-white hover:text-white px-3 py-2"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteService(service.id)}
                              className="border-red-500/20 hover:bg-red-500/10 text-red-500 px-3 py-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <Badge variant={service.isActive ? "default" : "secondary"} className="text-xs w-fit">
                          {service.isActive ? (
                            <><Eye className="w-3 h-3 mr-1" /> Active</>
                          ) : (
                            <><EyeOff className="w-3 h-3 mr-1" /> Inactive</>
                          )}
                        </Badge>

                        <p className="text-sm text-muted-foreground line-clamp-3">{service.description}</p>
                        {service.features && service.features.length > 0 && (
                          <p className="text-xs text-muted-foreground font-medium">{service.features.length} features</p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Service Form */}
              <Card className="p-4 sm:p-6" ref={serviceFormRef}>
                <h3 className="text-lg font-bold text-white mb-6">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">Service Title *</label>
                      <Input
                        value={serviceForm.title}
                        onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                        placeholder="WPAT Testing"
                        className="bg-white/5 border-white/10 text-white h-12 text-base"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">Slug *</label>
                      <Input
                        value={serviceForm.slug}
                        onChange={(e) => setServiceForm({ ...serviceForm, slug: e.target.value })}
                        placeholder="wpat-testing"
                        className="bg-white/5 border-white/10 text-white h-12 text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Description</label>
                    <Textarea
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Icon Name</label>
                    <Input
                      value={serviceForm.icon}
                      onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                      placeholder="Shield"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Features (one per line)</label>
                    <Textarea
                      value={serviceForm.features}
                      onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
                      placeholder="Comprehensive security testing&#10;Detailed reports&#10;Expert consultation"
                      className="bg-white/5 border-white/10 text-white"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Details (one per line)</label>
                    <Textarea
                      value={serviceForm.details}
                      onChange={(e) => setServiceForm({ ...serviceForm, details: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                      rows={4}
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={serviceForm.isActive}
                      onChange={(e) => setServiceForm({ ...serviceForm, isActive: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-white">Active</span>
                  </label>

                  <Button onClick={handleSaveService} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-black">
                    {editingService ? 'Update Service' : 'Save Service'}
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Review List */}
              <Card className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Manage Reviews</h2>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-black hover:text-black" onClick={() => scrollToSection(reviewFormRef)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Review
                  </Button>
                </div>

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id} className="p-4 sm:p-6 bg-white/5 border-white/10">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="text-base sm:text-lg font-semibold text-white mb-1">{review.name}</h3>
                            <p className="text-sm text-muted-foreground">{review.role}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditReview(review)}
                              className="border-white/10 hover:bg-white/5 text-white hover:text-white px-3 py-2"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteReview(review.id)}
                              className="border-red-500/20 hover:bg-red-500/10 text-red-500 px-3 py-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-500'}`}
                              />
                            ))}
                          </div>
                          <Badge variant={review.isActive ? "default" : "secondary"} className="text-xs">
                            {review.isActive ? (
                              <><Eye className="w-3 h-3 mr-1" /> Active</>
                            ) : (
                              <><EyeOff className="w-3 h-3 mr-1" /> Inactive</>
                            )}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-3">{review.comment}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Review Form */}
              <Card className="p-4 sm:p-6" ref={reviewFormRef}>
                <h3 className="text-lg font-bold text-white mb-6">
                  {editingReview ? 'Edit Review' : 'Add New Review'}
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">Name *</label>
                      <Input
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                        placeholder="John Doe"
                        className="bg-white/5 border-white/10 text-white h-12 text-base"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">Role *</label>
                      <Input
                        value={reviewForm.role}
                        onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                        placeholder="Security Engineer"
                        className="bg-white/5 border-white/10 text-white h-12 text-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">Rating *</label>
                      <select
                        value={reviewForm.rating}
                        onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) as any })}
                        className="w-full px-4 py-3 rounded-lg border bg-white/5 border-white/10 text-white text-base h-12"
                      >
                        <option value={5} className="bg-gray-900 text-white">5 Stars - Excellent</option>
                        <option value={4} className="bg-gray-900 text-white">4 Stars - Very Good</option>
                        <option value={3} className="bg-gray-900 text-white">3 Stars - Good</option>
                        <option value={2} className="bg-gray-900 text-white">2 Stars - Fair</option>
                        <option value={1} className="bg-gray-900 text-white">1 Star - Poor</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">Date</label>
                      <Input
                        type="date"
                        value={reviewForm.date}
                        onChange={(e) => setReviewForm({ ...reviewForm, date: e.target.value })}
                        className="bg-white/5 border-white/10 text-white h-12 text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Comment *</label>
                    <Textarea
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Avatar URL</label>
                    <Input
                      value={reviewForm.avatar}
                      onChange={(e) => setReviewForm({ ...reviewForm, avatar: e.target.value })}
                      placeholder="https://..."
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={reviewForm.isActive}
                      onChange={(e) => setReviewForm({ ...reviewForm, isActive: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-white">Active</span>
                  </label>

                  <Button onClick={handleSaveReview} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-black">
                    {editingReview ? 'Update Review' : 'Save Review'}
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Banners Tab */}
          {activeTab === 'banners' && (
            <div className="space-y-6">
              {/* Banner List */}
              <Card className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Manage Banners</h2>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-black hover:text-black" onClick={() => scrollToSection(bannerFormRef)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Banner
                  </Button>
                </div>

                <div className="space-y-4">
                  {banners.map((banner) => (
                    <Card key={banner.id} className="p-4 sm:p-6 bg-white/5 border-white/10">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-base sm:text-lg font-semibold text-white flex-1">{banner.title}</h3>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditBanner(banner)}
                              className="border-white/10 hover:bg-white/5 text-white hover:text-white px-3 py-2"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteBanner(banner.id)}
                              className="border-red-500/20 hover:bg-red-500/10 text-red-500 px-3 py-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <Badge variant={banner.isActive ? "default" : "secondary"} className="text-xs w-fit">
                          {banner.isActive ? (
                            <><Eye className="w-3 h-3 mr-1" /> Active</>
                          ) : (
                            <><EyeOff className="w-3 h-3 mr-1" /> Inactive</>
                          )}
                        </Badge>

                        <p className="text-sm text-muted-foreground line-clamp-2">{banner.subtitle}</p>
                        {banner.countdown && (
                          <p className="text-xs text-muted-foreground font-medium">
                            Countdown ends: {new Date(banner.countdown.endDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Banner Form */}
              <Card className="p-4 sm:p-6" ref={bannerFormRef}>
                <h3 className="text-lg font-bold text-white mb-6">
                  {editingBanner ? 'Edit Banner' : 'Add New Banner'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Title *</label>
                    <Input
                      value={bannerForm.title}
                      onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                      placeholder="Banner Title"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Subtitle</label>
                    <Input
                      value={bannerForm.subtitle}
                      onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                      placeholder="Banner Subtitle"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Image URL *</label>
                    <Input
                      value={bannerForm.image}
                      onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.value })}
                      placeholder="https://..."
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">CTA Text</label>
                      <Input
                        value={bannerForm.ctaText}
                        onChange={(e) => setBannerForm({ ...bannerForm, ctaText: e.target.value })}
                        placeholder="Learn More"
                        className="bg-white/5 border-white/10 text-white h-12 text-base"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">CTA Link</label>
                      <Input
                        value={bannerForm.ctaLink}
                        onChange={(e) => setBannerForm({ ...bannerForm, ctaLink: e.target.value })}
                        placeholder="/courses"
                        className="bg-white/5 border-white/10 text-white h-12 text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Countdown End Date</label>
                    <Input
                      type="date"
                      value={bannerForm.countdownEndDate}
                      onChange={(e) => setBannerForm({ ...bannerForm, countdownEndDate: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bannerForm.isActive}
                      onChange={(e) => setBannerForm({ ...bannerForm, isActive: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-white">Active</span>
                  </label>

                  <Button onClick={handleSaveBanner} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-black">
                    {editingBanner ? 'Update Banner' : 'Save Banner'}
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Clients Tab */}
          {activeTab === 'clients' && (
            <div className="space-y-6">
              {/* Client List */}
              <Card className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Manage Clients</h2>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-black hover:text-black" onClick={() => scrollToSection(clientFormRef)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Client
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {clients.map((client) => (
                    <Card key={client.id} className="p-4 bg-white/5 border-white/10">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-full aspect-video bg-white/10 rounded-lg mb-3 flex items-center justify-center">
                          {client.logo ? (
                            <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain" />
                          ) : (
                            <Users className="w-12 h-12 text-muted-foreground" />
                          )}
                        </div>
                        <h3 className="text-sm font-semibold text-white mb-2">{client.name}</h3>
                        <Badge variant={client.isActive ? "default" : "secondary"} className="mb-3">
                          {client.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteClient(client.id)}
                          className="w-full border-red-500/20 hover:bg-red-500/10 text-red-500"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Client Form */}
              <Card className="p-4 sm:p-6" ref={clientFormRef}>
                <h3 className="text-lg font-bold text-white mb-6">Add New Client</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Client Name *</label>
                    <Input
                      value={clientForm.name}
                      onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                      placeholder="Company Name"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Logo URL *</label>
                    <Input
                      value={clientForm.logo}
                      onChange={(e) => setClientForm({ ...clientForm, logo: e.target.value })}
                      placeholder="https://..."
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">Website</label>
                    <Input
                      value={clientForm.website}
                      onChange={(e) => setClientForm({ ...clientForm, website: e.target.value })}
                      placeholder="https://..."
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={clientForm.isActive}
                      onChange={(e) => setClientForm({ ...clientForm, isActive: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-white">Active</span>
                  </label>

                  <Button onClick={handleSaveClient} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-black">
                    Save Client
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl font-bold text-white mb-6">Manage Contacts</h2>
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <Card key={contact.id} className="p-4 bg-white/5 border-white/10">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-white">{contact.name}</h3>
                            <Badge variant={
                              contact.status === 'new' ? 'default' :
                              contact.status === 'read' ? 'secondary' :
                              contact.status === 'replied' ? 'outline' :
                              contact.status === 'converted' ? 'default' : 'default'
                            }>
                              {contact.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{contact.email}</p>
                          {contact.phone && <p className="text-sm text-muted-foreground mb-2">{contact.phone}</p>}
                          <p className="text-sm text-white mb-2">{contact.message}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(contact.date).toLocaleDateString()} • Source: {contact.source}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateContactStatus(contact.id, 'read')}
                          className="border-white/10 hover:bg-white/5 text-white hover:text-white"
                          disabled={contact.status !== 'new'}
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Mark as Read
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateContactStatus(contact.id, 'replied')}
                          className="border-white/10 hover:bg-white/5 text-white hover:text-white"
                          disabled={contact.status === 'new'}
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Mark as Replied
                        </Button>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/5 text-white hover:text-white">
                              <UserPlus className="w-3 h-3 mr-1" />
                              Convert to Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-card border-white/10 sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle className="text-white text-base sm:text-lg">Convert to Review</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                              <p className="text-sm text-muted-foreground">
                                Convert this contact message into a customer review. Select a rating:
                              </p>
                              <div className="grid grid-cols-5 gap-2">
                                {[5, 4, 3, 2, 1].map((rating) => (
                                  <Button
                                    key={rating}
                                    size="sm"
                                    onClick={() => handleConvertToReview(contact, rating)}
                                    className="bg-primary hover:bg-primary/90 text-black flex flex-col items-center justify-center h-16 sm:h-auto sm:flex-row px-2 text-xs sm:text-sm"
                                  >
                                    <span className="text-lg sm:text-base">{rating}</span>
                                    <span className="text-base sm:text-lg">⭐</span>
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteContact(contact.id)}
                          className="border-red-500/20 hover:bg-red-500/10 text-red-500 hover:text-red-500"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          )}
        </main>
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
        title={confirmDialog.title}
        description={confirmDialog.description}
        onConfirm={confirmDialog.onConfirm}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
    </>
  );
};

export default Admin;
