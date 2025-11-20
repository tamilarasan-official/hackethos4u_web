import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Banner,
  Service,
  Course,
  ClientLogo,
  Certificate,
  Review,
  Contact,
} from '@/lib/store';
import {
  coursesService,
  servicesService,
  certificatesService,
  reviewsService,
  bannersService,
  clientsService,
  contactsService,
} from '@/lib/firestore';
import { toast } from 'sonner';

interface DataContextType {
  // Loading states
  loading: boolean;

  // Banners
  banners: Banner[];
  updateBanner: (id: string, data: Partial<Banner>) => Promise<void>;
  addBanner: (banner: Omit<Banner, 'id'>) => Promise<void>;
  deleteBanner: (id: string) => Promise<void>;

  // Services
  services: Service[];
  updateService: (id: string, data: Partial<Service>) => Promise<void>;
  addService: (service: Omit<Service, 'id'>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;

  // Courses
  courses: Course[];
  updateCourse: (id: string, data: Partial<Course>) => Promise<void>;
  addCourse: (course: Omit<Course, 'id'>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;

  // Clients
  clients: ClientLogo[];
  updateClient: (id: string, data: Partial<ClientLogo>) => Promise<void>;
  addClient: (client: Omit<ClientLogo, 'id'>) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;

  // Certificates
  certificates: Certificate[];
  updateCertificate: (id: string, data: Partial<Certificate>) => Promise<void>;
  addCertificate: (certificate: Omit<Certificate, 'id'>) => Promise<void>;
  deleteCertificate: (id: string) => Promise<void>;

  // Reviews
  reviews: Review[];
  updateReview: (id: string, data: Partial<Review>) => Promise<void>;
  addReview: (review: Omit<Review, 'id'>) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;

  // Contacts
  contacts: Contact[];
  updateContact: (id: string, data: Partial<Contact>) => Promise<void>;
  addContact: (contact: Omit<Contact, 'id'>) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [clients, setClients] = useState<ClientLogo[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  // Set up real-time listeners for all collections
  useEffect(() => {
    const unsubscribers: Array<() => void> = [];

    // Banners listener
    const unsubBanners = bannersService.subscribe((data) => {
      setBanners(data);
    });
    unsubscribers.push(unsubBanners);

    // Services listener
    const unsubServices = servicesService.subscribe((data) => {
      setServices(data);
    });
    unsubscribers.push(unsubServices);

    // Courses listener
    const unsubCourses = coursesService.subscribe((data) => {
      setCourses(data);
    });
    unsubscribers.push(unsubCourses);

    // Clients listener
    const unsubClients = clientsService.subscribe((data) => {
      setClients(data);
    });
    unsubscribers.push(unsubClients);

    // Certificates listener
    const unsubCertificates = certificatesService.subscribe((data) => {
      setCertificates(data);
    });
    unsubscribers.push(unsubCertificates);

    // Reviews listener
    const unsubReviews = reviewsService.subscribe((data) => {
      setReviews(data);
    });
    unsubscribers.push(unsubReviews);

    // Contacts listener
    const unsubContacts = contactsService.subscribe((data) => {
      setContacts(data);
    });
    unsubscribers.push(unsubContacts);

    // Set loading to false after first data load
    setLoading(false);

    // Cleanup: unsubscribe from all listeners
    return () => {
      unsubscribers.forEach((unsub) => unsub());
    };
  }, []);

  // Banner operations
  const addBanner = async (banner: Omit<Banner, 'id'>) => {
    try {
      await bannersService.create(banner);
      toast.success('Banner added successfully!');
    } catch (error) {
      console.error('Error adding banner:', error);
      toast.error('Failed to add banner');
      throw error;
    }
  };

  const updateBanner = async (id: string, data: Partial<Banner>) => {
    try {
      await bannersService.update(id, data);
      toast.success('Banner updated successfully!');
    } catch (error) {
      console.error('Error updating banner:', error);
      toast.error('Failed to update banner');
      throw error;
    }
  };

  const deleteBanner = async (id: string) => {
    try {
      await bannersService.delete(id);
      toast.success('Banner deleted successfully!');
    } catch (error) {
      console.error('Error deleting banner:', error);
      toast.error('Failed to delete banner');
      throw error;
    }
  };

  // Service operations
  const addService = async (service: Omit<Service, 'id'>) => {
    try {
      await servicesService.create(service);
      toast.success('Service added successfully!');
    } catch (error) {
      console.error('Error adding service:', error);
      toast.error('Failed to add service');
      throw error;
    }
  };

  const updateService = async (id: string, data: Partial<Service>) => {
    try {
      await servicesService.update(id, data);
      toast.success('Service updated successfully!');
    } catch (error) {
      console.error('Error updating service:', error);
      toast.error('Failed to update service');
      throw error;
    }
  };

  const deleteService = async (id: string) => {
    try {
      await servicesService.delete(id);
      toast.success('Service deleted successfully!');
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service');
      throw error;
    }
  };

  // Course operations
  const addCourse = async (course: Omit<Course, 'id'>) => {
    try {
      await coursesService.create(course);
      toast.success('Course added successfully!');
    } catch (error) {
      console.error('Error adding course:', error);
      toast.error('Failed to add course');
      throw error;
    }
  };

  const updateCourse = async (id: string, data: Partial<Course>) => {
    try {
      await coursesService.update(id, data);
      toast.success('Course updated successfully!');
    } catch (error) {
      console.error('Error updating course:', error);
      toast.error('Failed to update course');
      throw error;
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      await coursesService.delete(id);
      toast.success('Course deleted successfully!');
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course');
      throw error;
    }
  };

  // Client operations
  const addClient = async (client: Omit<ClientLogo, 'id'>) => {
    try {
      await clientsService.create(client);
      toast.success('Client added successfully!');
    } catch (error) {
      console.error('Error adding client:', error);
      toast.error('Failed to add client');
      throw error;
    }
  };

  const updateClient = async (id: string, data: Partial<ClientLogo>) => {
    try {
      await clientsService.update(id, data);
      toast.success('Client updated successfully!');
    } catch (error) {
      console.error('Error updating client:', error);
      toast.error('Failed to update client');
      throw error;
    }
  };

  const deleteClient = async (id: string) => {
    try {
      await clientsService.delete(id);
      toast.success('Client deleted successfully!');
    } catch (error) {
      console.error('Error deleting client:', error);
      toast.error('Failed to delete client');
      throw error;
    }
  };

  // Certificate operations
  const addCertificate = async (certificate: Omit<Certificate, 'id'>) => {
    try {
      await certificatesService.create(certificate);
      toast.success('Certificate added successfully!');
    } catch (error) {
      console.error('Error adding certificate:', error);
      toast.error('Failed to add certificate');
      throw error;
    }
  };

  const updateCertificate = async (id: string, data: Partial<Certificate>) => {
    try {
      await certificatesService.update(id, data);
      toast.success('Certificate updated successfully!');
    } catch (error) {
      console.error('Error updating certificate:', error);
      toast.error('Failed to update certificate');
      throw error;
    }
  };

  const deleteCertificate = async (id: string) => {
    try {
      await certificatesService.delete(id);
      toast.success('Certificate deleted successfully!');
    } catch (error) {
      console.error('Error deleting certificate:', error);
      toast.error('Failed to delete certificate');
      throw error;
    }
  };

  // Review operations
  const addReview = async (review: Omit<Review, 'id'>) => {
    try {
      await reviewsService.create(review);
      toast.success('Review added successfully!');
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error('Failed to add review');
      throw error;
    }
  };

  const updateReview = async (id: string, data: Partial<Review>) => {
    try {
      await reviewsService.update(id, data);
      toast.success('Review updated successfully!');
    } catch (error) {
      console.error('Error updating review:', error);
      toast.error('Failed to update review');
      throw error;
    }
  };

  const deleteReview = async (id: string) => {
    try {
      await reviewsService.delete(id);
      toast.success('Review deleted successfully!');
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
      throw error;
    }
  };

  // Contact operations
  const addContact = async (contact: Omit<Contact, 'id'>) => {
    try {
      await contactsService.create(contact);
      toast.success('Contact form submitted successfully!');
    } catch (error) {
      console.error('Error adding contact:', error);
      toast.error('Failed to submit contact form');
      throw error;
    }
  };

  const updateContact = async (id: string, data: Partial<Contact>) => {
    try {
      await contactsService.update(id, data);
      toast.success('Contact updated successfully!');
    } catch (error) {
      console.error('Error updating contact:', error);
      toast.error('Failed to update contact');
      throw error;
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await contactsService.delete(id);
      toast.success('Contact deleted successfully!');
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact');
      throw error;
    }
  };

  const value: DataContextType = {
    loading,

    banners,
    updateBanner,
    addBanner,
    deleteBanner,

    services,
    updateService,
    addService,
    deleteService,

    courses,
    updateCourse,
    addCourse,
    deleteCourse,

    clients,
    updateClient,
    addClient,
    deleteClient,

    certificates,
    updateCertificate,
    addCertificate,
    deleteCertificate,

    reviews,
    updateReview,
    addReview,
    deleteReview,

    contacts,
    updateContact,
    addContact,
    deleteContact,
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
