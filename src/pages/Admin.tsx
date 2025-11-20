import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import PasswordChangeDialog from "@/components/PasswordChangeDialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Star, Eye, EyeOff, LogOut, User, Mail, CheckCircle, MessageSquare, UserPlus, ThumbsUp, ThumbsDown } from "lucide-react";
import type { Course, Service, Review, Banner, ClientLogo, Contact } from "@/lib/store";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Admin = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const {
    courses,
    addCourse,
    updateCourse,
    deleteCourse,
    services,
    addService,
    updateService,
    deleteService,
    reviews,
    addReview,
    updateReview,
    deleteReview,
    banners,
    addBanner,
    updateBanner,
    deleteBanner,
    clients,
    addClient,
    updateClient,
    deleteClient,
    contacts,
    updateContact,
    deleteContact,
  } = useData();

  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
    hasCountdown: false,
  });

  // Client Logo Form
  const [clientForm, setClientForm] = useState({
    name: "",
    logo: "",
  });

  const [editingClient, setEditingClient] = useState<ClientLogo | null>(null);

  // Convert to Review Dialog State
  const [convertingContact, setConvertingContact] = useState<Contact | null>(null);
  const [convertDialogOpen, setConvertDialogOpen] = useState(false);
  const [convertReviewForm, setConvertReviewForm] = useState({
    name: "",
    role: "",
    rating: 5 as 1 | 2 | 3 | 4 | 5,
    comment: "",
  });

  // ============ COURSE CRUD ============
  const handleSaveCourse = async () => {
    if (!courseForm.title || !courseForm.slug) {
      toast({ title: "Error", description: "Title and slug are required", variant: "destructive" });
      return;
    }

    const courseData: any = {
      title: courseForm.title,
      description: courseForm.description,
      slug: courseForm.slug,
      category: courseForm.category,
      duration: courseForm.duration,
      level: courseForm.level,
      gradient: "from-primary via-accent to-primary",
      icon: courseForm.icon,
      curriculum: courseForm.curriculum ? courseForm.curriculum.split("\n").filter(Boolean) : [],
      isActive: courseForm.isActive,
      demoAvailable: courseForm.demoAvailable,
    };

    // Add pricing for live courses
    if (courseForm.category === "live") {
      if (courseForm.sessionType) courseData.sessionType = courseForm.sessionType;
      const pricing: any = {};
      if (courseForm.oneToOne) pricing.oneToOne = parseInt(courseForm.oneToOne);
      if (courseForm.groupMin) pricing.groupMin = parseInt(courseForm.groupMin);
      if (courseForm.groupMax) pricing.groupMax = parseInt(courseForm.groupMax);
      if (Object.keys(pricing).length > 0) courseData.pricing = pricing;
    }

    // Add recording course fields
    if (courseForm.category === "recording") {
      if (courseForm.recordingsCount) courseData.recordingsCount = parseInt(courseForm.recordingsCount);
      if (courseForm.playStoreLink) courseData.playStoreLink = courseForm.playStoreLink;
    }

    // Add optional fields only if they have values
    if (courseForm.notes) courseData.notes = courseForm.notes;
    if (courseForm.demoVideoUrl) courseData.demoVideoUrl = courseForm.demoVideoUrl;

    try {
      if (editingCourse) {
        await updateCourse(editingCourse.id, courseData);
      } else {
        await addCourse(courseData);
      }
      resetCourseForm();
    } catch (error) {
      console.error('Error saving course:', error);
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
      curriculum: course.curriculum?.join("\n") || "",
      recordingsCount: course.recordingsCount?.toString() || "",
      notes: course.notes || "",
      playStoreLink: course.playStoreLink || "",
      demoVideoUrl: course.demoVideoUrl || "",
      isActive: course.isActive,
      demoAvailable: course.demoAvailable || false,
    });
  };

  const handleDeleteCourse = async (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(id);
      } catch (error) {
        console.error('Error deleting course:', error);
      }
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
  const handleSaveService = async () => {
    if (!serviceForm.title || !serviceForm.slug) {
      toast({ title: "Error", description: "Title and slug are required", variant: "destructive" });
      return;
    }

    const serviceData = {
      title: serviceForm.title,
      description: serviceForm.description,
      slug: serviceForm.slug,
      icon: serviceForm.icon,
      gradient: "from-primary via-accent to-primary",
      features: serviceForm.features.split("\n").filter(Boolean),
      details: serviceForm.details || undefined,
      isActive: serviceForm.isActive,
    };

    try {
      if (editingService) {
        await updateService(editingService.id, serviceData);
      } else {
        await addService(serviceData);
      }
      resetServiceForm();
    } catch (error) {
      console.error('Error saving service:', error);
    }
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

  const handleDeleteService = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService(id);
      } catch (error) {
        console.error('Error deleting service:', error);
      }
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
  const handleSaveReview = async () => {
    if (!reviewForm.name || !reviewForm.comment) {
      toast({ title: "Error", description: "Name and comment are required", variant: "destructive" });
      return;
    }

    const reviewData = {
      name: reviewForm.name,
      role: reviewForm.role,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      date: editingReview?.date || new Date().toISOString(),
      isActive: reviewForm.isActive,
    };

    try {
      if (editingReview) {
        await updateReview(editingReview.id, reviewData);
      } else {
        await addReview(reviewData);
      }
      resetReviewForm();
    } catch (error) {
      console.error('Error saving review:', error);
    }
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

  const handleDeleteReview = async (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteReview(id);
      } catch (error) {
        console.error('Error deleting review:', error);
      }
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

  const handleApproveReview = async (id: string) => {
    try {
      await updateReview(id, { isActive: true });
    } catch (error) {
      console.error('Error approving review:', error);
    }
  };

  const handleRejectReview = async (id: string) => {
    if (confirm("Are you sure you want to reject this review? It will be marked as inactive.")) {
      try {
        await updateReview(id, { isActive: false });
      } catch (error) {
        console.error('Error rejecting review:', error);
      }
    }
  };

  // ============ BANNER CRUD ============
  const handleSaveBanner = async () => {
    if (!bannerForm.title) {
      toast({ title: "Error", description: "Title is required", variant: "destructive" });
      return;
    }

    const bannerData: any = {
      title: bannerForm.title,
      subtitle: bannerForm.subtitle,
      image: bannerForm.image,
      isActive: bannerForm.isActive,
      order: editingBanner?.order || banners.length + 1,
    };

    // Add optional fields only if they have values (NO undefined)
    if (bannerForm.hasCountdown && bannerForm.countdownDate) {
      bannerData.countdown = { endDate: bannerForm.countdownDate };
    }
    if (bannerForm.ctaText) bannerData.ctaText = bannerForm.ctaText;
    if (bannerForm.ctaLink) bannerData.ctaLink = bannerForm.ctaLink;

    try {
      if (editingBanner) {
        await updateBanner(editingBanner.id, bannerData);
      } else {
        await addBanner(bannerData);
      }
      resetBannerForm();
    } catch (error) {
      console.error('Error saving banner:', error);
    }
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
      hasCountdown: !!banner.countdown?.endDate,
    });
  };

  const handleDeleteBanner = async (id: string) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      try {
        await deleteBanner(id);
      } catch (error) {
        console.error('Error deleting banner:', error);
      }
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
      hasCountdown: false,
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
  const handleSaveClient = async () => {
    if (!clientForm.name || !clientForm.logo) {
      toast({ title: "Error", description: "Name and logo are required", variant: "destructive" });
      return;
    }

    const clientData = {
      name: clientForm.name,
      logo: clientForm.logo,
    };

    try {
      if (editingClient) {
        await updateClient(editingClient.id, clientData);
      } else {
        await addClient(clientData);
      }
      resetClientForm();
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  const handleEditClient = (client: ClientLogo) => {
    setEditingClient(client);
    setClientForm({
      name: client.name,
      logo: client.logo,
    });
  };

  const handleDeleteClient = async (id: string) => {
    if (confirm("Are you sure you want to delete this client?")) {
      try {
        await deleteClient(id);
      } catch (error) {
        console.error('Error deleting client:', error);
      }
    }
  };

  const resetClientForm = () => {
    setEditingClient(null);
    setClientForm({
      name: "",
      logo: "",
    });
  };

  // ============ CONTACT CRUD ============
  const handleMarkAsRead = async (id: string) => {
    try {
      await updateContact(id, { status: 'read' });
    } catch (error) {
      console.error('Error marking contact as read:', error);
    }
  };

  const handleMarkAsReplied = async (id: string) => {
    try {
      await updateContact(id, { status: 'replied' });
    } catch (error) {
      console.error('Error marking contact as replied:', error);
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      try {
        await deleteContact(id);
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const handleOpenConvertDialog = (contact: Contact) => {
    setConvertingContact(contact);
    setConvertReviewForm({
      name: contact.name,
      role: "",
      rating: 5,
      comment: contact.message,
    });
    setConvertDialogOpen(true);
  };

  const handleConvertToReview = async () => {
    if (!convertingContact || !convertReviewForm.name || !convertReviewForm.comment) {
      toast({ title: "Error", description: "Name and comment are required", variant: "destructive" });
      return;
    }

    try {
      // Create the review
      await addReview({
        name: convertReviewForm.name,
        role: convertReviewForm.role,
        rating: convertReviewForm.rating,
        comment: convertReviewForm.comment,
        date: new Date().toISOString(),
        isActive: true,
      });

      // Mark contact as converted
      await updateContact(convertingContact.id, { status: 'converted' });

      // Close dialog and reset
      setConvertDialogOpen(false);
      setConvertingContact(null);
      setConvertReviewForm({
        name: "",
        role: "",
        rating: 5,
        comment: "",
      });

      toast({ title: "Success", description: "Contact converted to review successfully!" });
    } catch (error) {
      console.error('Error converting contact to review:', error);
      toast({ title: "Error", description: "Failed to convert contact to review", variant: "destructive" });
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'new': return 'default';
      case 'read': return 'secondary';
      case 'replied': return 'outline';
      case 'converted': return 'default';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'text-blue-500';
      case 'read': return 'text-yellow-500';
      case 'replied': return 'text-green-500';
      case 'converted': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header Bar */}
      <div className="fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-b border-white/10 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                Logged in as: <span className="text-white font-medium">{currentUser?.email}</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <PasswordChangeDialog />
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-white/10 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-20">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Content Management System</h1>

            <Tabs defaultValue="courses" className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-8">
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="banners">Banners</TabsTrigger>
                <TabsTrigger value="clients">Clients</TabsTrigger>
                <TabsTrigger value="contacts">Contacts</TabsTrigger>
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
                            {course.pricing?.oneToOne && <span>1-on-1: ₹{course.pricing.oneToOne.toLocaleString()}</span>}
                            {course.pricing?.groupMin && <span>Group: ₹{course.pricing.groupMin.toLocaleString()} - ₹{course.pricing.groupMax?.toLocaleString()}</span>}
                            {course.recordingsCount && <span>Recordings: {course.recordingsCount}</span>}
                            {course.playStoreLink && <span>📱 Play Store Available</span>}
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
                        <Input value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} placeholder="Ethical Hacking" className="bg-white/5 border-white/10 text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Slug *</label>
                        <Input value={courseForm.slug} onChange={(e) => setCourseForm({ ...courseForm, slug: e.target.value })} placeholder="ethical-hacking" className="bg-white/5 border-white/10 text-white" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea value={courseForm.description} onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })} rows={3} className="bg-white/5 border-white/10 text-white" />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <select className="w-full px-4 py-2 rounded-lg border bg-white/5 border-white/10 text-white" value={courseForm.category} onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value as "live" | "recording" })}>
                          <option value="live" className="bg-gray-900 text-white">Live</option>
                          <option value="recording" className="bg-gray-900 text-white">Recording</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Level</label>
                        <select className="w-full px-4 py-2 rounded-lg border bg-white/5 border-white/10 text-white" value={courseForm.level} onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value as "Beginner" | "Intermediate" | "Advanced" })}>
                          <option value="Beginner" className="bg-gray-900 text-white">Beginner</option>
                          <option value="Intermediate" className="bg-gray-900 text-white">Intermediate</option>
                          <option value="Advanced" className="bg-gray-900 text-white">Advanced</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Duration</label>
                        <Input value={courseForm.duration} onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })} placeholder="6 months" className="bg-white/5 border-white/10 text-white" />
                      </div>
                    </div>

                    {courseForm.category === "live" && (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Session Type</label>
                          <select className="w-full px-4 py-2 rounded-lg border bg-white/5 border-white/10 text-white" value={courseForm.sessionType} onChange={(e) => setCourseForm({ ...courseForm, sessionType: e.target.value as "one-to-one" | "group" | "both" })}>
                            <option value="one-to-one" className="bg-gray-900 text-white">One-to-One</option>
                            <option value="group" className="bg-gray-900 text-white">Group</option>
                            <option value="both" className="bg-gray-900 text-white">Both</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">One-to-One Price</label>
                            <Input type="number" value={courseForm.oneToOne} onChange={(e) => setCourseForm({ ...courseForm, oneToOne: e.target.value })} placeholder="40000" className="bg-white/5 border-white/10 text-white" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Group Min Price</label>
                            <Input type="number" value={courseForm.groupMin} onChange={(e) => setCourseForm({ ...courseForm, groupMin: e.target.value })} placeholder="15000" className="bg-white/5 border-white/10 text-white" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Group Max Price</label>
                            <Input type="number" value={courseForm.groupMax} onChange={(e) => setCourseForm({ ...courseForm, groupMax: e.target.value })} placeholder="20000" className="bg-white/5 border-white/10 text-white" />
                          </div>
                        </div>
                      </>
                    )}

                    {courseForm.category === "recording" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Recordings Count</label>
                          <Input type="number" value={courseForm.recordingsCount} onChange={(e) => setCourseForm({ ...courseForm, recordingsCount: e.target.value })} placeholder="150" className="bg-white/5 border-white/10 text-white" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Play Store Link</label>
                          <Input value={courseForm.playStoreLink} onChange={(e) => setCourseForm({ ...courseForm, playStoreLink: e.target.value })} placeholder="https://play.google.com/..." className="bg-white/5 border-white/10 text-white" />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Curriculum (one per line)</label>
                      <Textarea value={courseForm.curriculum} onChange={(e) => setCourseForm({ ...courseForm, curriculum: e.target.value })} rows={5} placeholder="Introduction to Hacking&#10;Network Security&#10;Web Security" className="bg-white/5 border-white/10 text-white" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Notes</label>
                      <Textarea value={courseForm.notes} onChange={(e) => setCourseForm({ ...courseForm, notes: e.target.value })} rows={3} className="bg-white/5 border-white/10 text-white" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Demo Video URL (YouTube)</label>
                      <Input value={courseForm.demoVideoUrl} onChange={(e) => setCourseForm({ ...courseForm, demoVideoUrl: e.target.value })} placeholder="https://www.youtube.com/watch?v=..." className="bg-white/5 border-white/10 text-white" />
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
                        <Input value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })} placeholder="WPAT Testing" className="bg-white/5 border-white/10 text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Slug *</label>
                        <Input value={serviceForm.slug} onChange={(e) => setServiceForm({ ...serviceForm, slug: e.target.value })} placeholder="wpat-testing" className="bg-white/5 border-white/10 text-white" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} rows={3} className="bg-white/5 border-white/10 text-white" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Features (one per line)</label>
                      <Textarea value={serviceForm.features} onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })} rows={4} placeholder="Web Application Testing&#10;Mobile App Testing&#10;OWASP Top 10" className="bg-white/5 border-white/10 text-white" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Details</label>
                      <Textarea value={serviceForm.details} onChange={(e) => setServiceForm({ ...serviceForm, details: e.target.value })} rows={3} className="bg-white/5 border-white/10 text-white" />
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
                  <div className="flex gap-2 items-center">
                    <Badge variant="outline">Total: {reviews.length}</Badge>
                    <Badge>Active: {reviews.filter(r => r.isActive).length}</Badge>
                    <Badge variant="secondary">Pending: {reviews.filter(r => !r.isActive).length}</Badge>
                    <Button onClick={() => resetReviewForm()} className="rounded-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Review
                    </Button>
                  </div>
                </div>

                {/* Review List */}
                <div className="grid grid-cols-1 gap-4">
                  {[...reviews]
                    .sort((a, b) => {
                      // Show pending reviews first
                      if (!a.isActive && b.isActive) return -1;
                      if (a.isActive && !b.isActive) return 1;
                      return new Date(b.date).getTime() - new Date(a.date).getTime();
                    })
                    .map((review) => (
                    <Card key={review.id} className="p-6">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold">{review.name}</h3>
                            <Badge variant={review.isActive ? "default" : "secondary"}>
                              {review.isActive ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                              {review.isActive ? "Active" : "Pending Approval"}
                            </Badge>
                            <div className="flex gap-0.5">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{review.role || "No role specified"}</p>
                          <p className="text-muted-foreground italic">"{review.comment}"</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          {!review.isActive && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full bg-green-500/10 hover:bg-green-500/20 text-green-500 border-green-500/20"
                              onClick={() => handleApproveReview(review.id)}
                            >
                              <ThumbsUp className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                          )}
                          {!review.isActive && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-500/20"
                              onClick={() => handleRejectReview(review.id)}
                            >
                              <ThumbsDown className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          )}
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
                        <Input value={reviewForm.name} onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })} placeholder="John Doe" className="bg-white/5 border-white/10 text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Role</label>
                        <Input value={reviewForm.role} onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })} placeholder="Security Analyst" className="bg-white/5 border-white/10 text-white" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Rating</label>
                      <select className="w-full px-4 py-2 rounded-lg border bg-white/5 border-white/10 text-white" value={reviewForm.rating} onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 })}>
                        <option value={5} className="bg-gray-900 text-white">5 Stars</option>
                        <option value={4} className="bg-gray-900 text-white">4 Stars</option>
                        <option value={3} className="bg-gray-900 text-white">3 Stars</option>
                        <option value={2} className="bg-gray-900 text-white">2 Stars</option>
                        <option value={1} className="bg-gray-900 text-white">1 Star</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Comment *</label>
                      <Textarea value={reviewForm.comment} onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })} rows={4} placeholder="Share your experience..." className="bg-white/5 border-white/10 text-white" />
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
                        <Input value={bannerForm.title} onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })} placeholder="Ethical Hacking Masterclass" className="bg-white/5 border-white/10 text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Subtitle</label>
                        <Input value={bannerForm.subtitle} onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })} placeholder="6-Month Training Program" className="bg-white/5 border-white/10 text-white" />
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
                          className="cursor-pointer bg-white/5 border-white/10 text-white"
                        />
                        <Input
                          value={bannerForm.image}
                          onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.value })}
                          placeholder="Or enter image URL"
                          className="bg-white/5 border-white/10 text-white"
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
                        <Input value={bannerForm.ctaText} onChange={(e) => setBannerForm({ ...bannerForm, ctaText: e.target.value })} placeholder="Enroll Now" className="bg-white/5 border-white/10 text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">CTA Link</label>
                        <Input value={bannerForm.ctaLink} onChange={(e) => setBannerForm({ ...bannerForm, ctaLink: e.target.value })} placeholder="/courses/ethical-hacking" className="bg-white/5 border-white/10 text-white" />
                      </div>
                    </div>

                    <div className="space-y-4 p-4 border rounded-lg bg-secondary/20">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" checked={bannerForm.hasCountdown} onChange={(e) => setBannerForm({ ...bannerForm, hasCountdown: e.target.checked })} className="rounded" />
                        <span className="text-sm font-medium">Enable Countdown Timer</span>
                      </label>

                      {bannerForm.hasCountdown && (
                        <div className="space-y-2 pl-6">
                          <label className="text-sm font-medium">Countdown End Date & Time</label>
                          <Input
                            type="datetime-local"
                            value={bannerForm.countdownDate ? new Date(bannerForm.countdownDate).toISOString().slice(0, 16) : ""}
                            onChange={(e) => {
                              const isoDate = e.target.value ? new Date(e.target.value).toISOString() : "";
                              setBannerForm({ ...bannerForm, countdownDate: isoDate });
                            }}
                            className="rounded-lg bg-white/5 border-white/10 text-white"
                          />
                          <p className="text-xs text-muted-foreground">Select when the countdown should end</p>
                        </div>
                      )}
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
                        className="bg-white/5 border-white/10 text-white"
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
                          className="cursor-pointer bg-white/5 border-white/10 text-white"
                        />
                        <Input
                          value={clientForm.logo}
                          onChange={(e) => setClientForm({ ...clientForm, logo: e.target.value })}
                          placeholder="Or enter logo URL"
                          className="bg-white/5 border-white/10 text-white"
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

              {/* ============ CONTACTS TAB ============ */}
              <TabsContent value="contacts" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Manage Contact Submissions</h2>
                  <div className="flex gap-2">
                    <Badge variant="outline">Total: {contacts.length}</Badge>
                    <Badge>New: {contacts.filter(c => c.status === 'new').length}</Badge>
                  </div>
                </div>

                {/* Contact List */}
                <div className="grid grid-cols-1 gap-4">
                  {contacts.length === 0 ? (
                    <Card className="p-8 text-center">
                      <Mail className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No contact submissions yet</p>
                    </Card>
                  ) : (
                    [...contacts]
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((contact) => (
                        <Card key={contact.id} className="p-6">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <h3 className="text-lg font-bold">{contact.name}</h3>
                                <Badge variant={getStatusBadgeVariant(contact.status)} className={getStatusColor(contact.status)}>
                                  {contact.status.toUpperCase()}
                                </Badge>
                                <Badge variant="outline">{contact.source}</Badge>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(contact.date).toLocaleDateString()} {new Date(contact.date).toLocaleTimeString()}
                                </span>
                              </div>

                              <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm">
                                  <Mail className="w-4 h-4 text-muted-foreground" />
                                  <a href={`mailto:${contact.email}`} className="text-primary hover:underline">{contact.email}</a>
                                </div>
                                {contact.phone && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <span className="text-muted-foreground">📞</span>
                                    <span>{contact.phone}</span>
                                  </div>
                                )}
                                {contact.serviceInterested && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <span className="text-muted-foreground">🎯</span>
                                    <span>Interested in: <strong>{contact.serviceInterested}</strong></span>
                                  </div>
                                )}
                              </div>

                              <div className="bg-secondary/20 p-4 rounded-lg">
                                <p className="text-sm text-muted-foreground mb-1">Message:</p>
                                <p className="text-sm">{contact.message}</p>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              {contact.status !== 'converted' && (
                                <>
                                  {contact.status === 'new' && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="rounded-full"
                                      onClick={() => handleMarkAsRead(contact.id)}
                                    >
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Mark as Read
                                    </Button>
                                  )}
                                  {(contact.status === 'read' || contact.status === 'new') && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="rounded-full"
                                      onClick={() => handleMarkAsReplied(contact.id)}
                                    >
                                      <MessageSquare className="w-4 h-4 mr-2" />
                                      Mark as Replied
                                    </Button>
                                  )}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-full bg-primary/10 hover:bg-primary/20"
                                    onClick={() => handleOpenConvertDialog(contact)}
                                  >
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Convert to Review
                                  </Button>
                                </>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full text-destructive"
                                onClick={() => handleDeleteContact(contact.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* Convert to Review Dialog */}
            <Dialog open={convertDialogOpen} onOpenChange={setConvertDialogOpen}>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Convert Contact to Review</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name *</label>
                    <Input
                      value={convertReviewForm.name}
                      onChange={(e) => setConvertReviewForm({ ...convertReviewForm, name: e.target.value })}
                      placeholder="Customer name"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role/Title</label>
                    <Input
                      value={convertReviewForm.role}
                      onChange={(e) => setConvertReviewForm({ ...convertReviewForm, role: e.target.value })}
                      placeholder="e.g., Security Analyst, Pentester"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Rating</label>
                    <select
                      className="w-full px-4 py-2 rounded-lg border bg-white/5 border-white/10 text-white"
                      value={convertReviewForm.rating}
                      onChange={(e) => setConvertReviewForm({ ...convertReviewForm, rating: parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 })}
                    >
                      <option value={5} className="bg-gray-900 text-white">5 Stars - Excellent</option>
                      <option value={4} className="bg-gray-900 text-white">4 Stars - Very Good</option>
                      <option value={3} className="bg-gray-900 text-white">3 Stars - Good</option>
                      <option value={2} className="bg-gray-900 text-white">2 Stars - Fair</option>
                      <option value={1} className="bg-gray-900 text-white">1 Star - Poor</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Review Comment *</label>
                    <Textarea
                      value={convertReviewForm.comment}
                      onChange={(e) => setConvertReviewForm({ ...convertReviewForm, comment: e.target.value })}
                      rows={5}
                      placeholder="Review text..."
                      className="bg-white/5 border-white/10 text-white"
                    />
                    <p className="text-xs text-muted-foreground">
                      This is pre-filled with the contact message. You can edit it to make it more suitable as a review.
                    </p>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleConvertToReview} className="rounded-full flex-1">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Create Review
                    </Button>
                    <Button
                      onClick={() => {
                        setConvertDialogOpen(false);
                        setConvertingContact(null);
                      }}
                      variant="outline"
                      className="rounded-full"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default Admin;
