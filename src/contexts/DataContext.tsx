import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Banner,
  Service,
  Course,
  ClientLogo,
  Certificate,
  Review,
  bannerStore,
  serviceStore,
  courseStore,
  clientStore,
  certificateStore,
  reviewStore,
} from '@/lib/store';

interface DataContextType {
  // Banners
  banners: Banner[];
  updateBanners: (banners: Banner[]) => void;
  addBanner: (banner: Banner) => void;
  deleteBanner: (id: string) => void;

  // Services
  services: Service[];
  updateServices: (services: Service[]) => void;
  addService: (service: Service) => void;
  deleteService: (id: string) => void;

  // Courses
  courses: Course[];
  updateCourses: (courses: Course[]) => void;
  addCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;

  // Clients
  clients: ClientLogo[];
  updateClients: (clients: ClientLogo[]) => void;
  addClient: (client: ClientLogo) => void;
  deleteClient: (id: string) => void;

  // Certificates
  certificates: Certificate[];
  updateCertificates: (certificates: Certificate[]) => void;
  addCertificate: (certificate: Certificate) => void;
  deleteCertificate: (id: string) => void;

  // Reviews
  reviews: Review[];
  updateReviews: (reviews: Review[]) => void;
  addReview: (review: Review) => void;
  deleteReview: (id: string) => void;

  // Utility
  refreshAll: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [clients, setClients] = useState<ClientLogo[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Load initial data
  useEffect(() => {
    refreshAll();
  }, []);

  const refreshAll = () => {
    setBanners(bannerStore.get());
    setServices(serviceStore.get());
    setCourses(courseStore.get());
    setClients(clientStore.get());
    setCertificates(certificateStore.get());
    setReviews(reviewStore.get());
  };

  // Banner operations
  const updateBanners = (newBanners: Banner[]) => {
    bannerStore.save(newBanners);
    setBanners(newBanners);
  };

  const addBanner = (banner: Banner) => {
    const newBanners = [...banners, banner];
    updateBanners(newBanners);
  };

  const deleteBanner = (id: string) => {
    const newBanners = banners.filter(b => b.id !== id);
    updateBanners(newBanners);
  };

  // Service operations
  const updateServices = (newServices: Service[]) => {
    serviceStore.save(newServices);
    setServices(newServices);
  };

  const addService = (service: Service) => {
    const newServices = [...services, service];
    updateServices(newServices);
  };

  const deleteService = (id: string) => {
    const newServices = services.filter(s => s.id !== id);
    updateServices(newServices);
  };

  // Course operations
  const updateCourses = (newCourses: Course[]) => {
    courseStore.save(newCourses);
    setCourses(newCourses);
  };

  const addCourse = (course: Course) => {
    const newCourses = [...courses, course];
    updateCourses(newCourses);
  };

  const deleteCourse = (id: string) => {
    const newCourses = courses.filter(c => c.id !== id);
    updateCourses(newCourses);
  };

  // Client operations
  const updateClients = (newClients: ClientLogo[]) => {
    clientStore.save(newClients);
    setClients(newClients);
  };

  const addClient = (client: ClientLogo) => {
    const newClients = [...clients, client];
    updateClients(newClients);
  };

  const deleteClient = (id: string) => {
    const newClients = clients.filter(c => c.id !== id);
    updateClients(newClients);
  };

  // Certificate operations
  const updateCertificates = (newCertificates: Certificate[]) => {
    certificateStore.save(newCertificates);
    setCertificates(newCertificates);
  };

  const addCertificate = (certificate: Certificate) => {
    const newCertificates = [...certificates, certificate];
    updateCertificates(newCertificates);
  };

  const deleteCertificate = (id: string) => {
    const newCertificates = certificates.filter(c => c.id !== id);
    updateCertificates(newCertificates);
  };

  // Review operations
  const updateReviews = (newReviews: Review[]) => {
    reviewStore.save(newReviews);
    setReviews(newReviews);
  };

  const addReview = (review: Review) => {
    const newReviews = [...reviews, review];
    updateReviews(newReviews);
  };

  const deleteReview = (id: string) => {
    const newReviews = reviews.filter(r => r.id !== id);
    updateReviews(newReviews);
  };

  const value: DataContextType = {
    banners,
    updateBanners,
    addBanner,
    deleteBanner,

    services,
    updateServices,
    addService,
    deleteService,

    courses,
    updateCourses,
    addCourse,
    deleteCourse,

    clients,
    updateClients,
    addClient,
    deleteClient,

    certificates,
    updateCertificates,
    addCertificate,
    deleteCertificate,

    reviews,
    updateReviews,
    addReview,
    deleteReview,

    refreshAll,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
