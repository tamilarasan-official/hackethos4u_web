// Centralized data store for the application
// This connects admin panel to front-end data

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  countdown?: {
    endDate: string; // ISO date string
  };
  ctaText?: string;
  ctaLink?: string;
  isActive: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  slug: string;
  icon: string; // Icon name from lucide-react
  gradient: string;
  features: string[];
  details?: string; // Full description for detail page
  isActive: boolean;
}

export interface ClientLogo {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: 'recording' | 'live';
  sessionType?: 'one-to-one' | 'group' | 'both'; // for live courses
  pricing: {
    oneToOne?: number;
    groupMin?: number;
    groupMax?: number;
  };
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  gradient: string;
  icon: string;
  curriculum?: string[];
  recordingsCount?: number;
  notes?: string;
  playStoreLink?: string; // for recording courses
  demoVideoUrl?: string; // YouTube demo video URL
  isActive: boolean;
  demoAvailable?: boolean;
}

export interface Certificate {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  date: string; // ISO date string
  image?: string; // Optional avatar URL
  isActive: boolean;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  source: 'home' | 'services' | 'contact'; // which page the contact came from
  serviceInterested?: string; // for service page contacts
  status: 'new' | 'read' | 'replied' | 'converted'; // track status
  date: string; // ISO date string
}

// Storage keys
const STORAGE_KEYS = {
  BANNERS: 'orange-hub-banners',
  SERVICES: 'orange-hub-services',
  COURSES: 'orange-hub-courses',
  CLIENTS: 'orange-hub-clients',
  CERTIFICATES: 'orange-hub-certificates',
  REVIEWS: 'orange-hub-reviews',
};

// Helper function to get data from localStorage with fallback to defaults
function getStoredData<T>(key: string, defaultData: T): T {
  if (typeof window === 'undefined') return defaultData;

  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultData;
  } catch (error) {
    console.error(`Error loading ${key}:`, error);
    return defaultData;
  }
}

// Helper function to save data to localStorage
function saveData<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
}

// Default data
const defaultBanners: Banner[] = [
  {
    id: '1',
    title: 'Ethical Hacking Masterclass',
    subtitle: '6-Month Comprehensive Training Program',
    image: '/placeholder.svg',
    countdown: {
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    ctaText: 'Register Now',
    ctaLink: '/courses/ethical-hacking',
    isActive: true,
  },
  {
    id: '2',
    title: 'VAPT Professional Course',
    subtitle: 'Hands-on Penetration Testing Training',
    image: '/placeholder.svg',
    countdown: {
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    ctaText: 'Enroll Now',
    ctaLink: '/courses/vapt',
    isActive: true,
  },
  {
    id: '3',
    title: 'Bug Bounty Bootcamp',
    subtitle: 'Earn While You Learn',
    image: '/placeholder.svg',
    ctaText: 'Learn More',
    ctaLink: '/courses/bug-bounty',
    isActive: true,
  },
];

const defaultServices: Service[] = [
  {
    id: '1',
    title: 'WPAT Testing',
    description: 'Comprehensive web and mobile application penetration testing to identify vulnerabilities before attackers do.',
    slug: 'wpat-testing',
    icon: 'Shield',
    gradient: 'from-primary via-accent to-primary',
    features: ['Web Application Testing', 'Mobile App Testing', 'OWASP Top 10', 'Detailed Reports'],
    details: 'Our WPAT (Web Penetration and Application Testing) service provides comprehensive security assessment for your web and mobile applications. We identify vulnerabilities, assess risks, and provide actionable recommendations.',
    isActive: true,
  },
  {
    id: '2',
    title: 'Mobile API Testing',
    description: 'In-depth security analysis for mobile applications and APIs with reverse engineering and runtime testing.',
    slug: 'mobile-api-testing',
    icon: 'Smartphone',
    gradient: 'from-primary via-accent to-primary',
    features: ['iOS & Android Testing', 'API Security', 'Runtime Analysis', 'Code Review'],
    details: 'Mobile API Testing includes comprehensive security analysis of your mobile applications and backend APIs, ensuring secure communication and data protection.',
    isActive: true,
  },
  {
    id: '3',
    title: 'OWASP Top 10 Testing',
    description: 'Complete assessment based on OWASP\'s most critical web application security risks and vulnerabilities.',
    slug: 'owasp-testing',
    icon: 'Lock',
    gradient: 'from-primary via-accent to-primary',
    features: ['Injection Testing', 'XSS Detection', 'Access Control', 'Security Misconfiguration'],
    details: 'Comprehensive testing based on OWASP Top 10 security risks, ensuring your application is protected against the most common and critical vulnerabilities.',
    isActive: true,
  },
];

const defaultClients: ClientLogo[] = [
  { id: '1', name: 'Client 1', logo: '/placeholder.svg' },
  { id: '2', name: 'Client 2', logo: '/placeholder.svg' },
  { id: '3', name: 'Client 3', logo: '/placeholder.svg' },
  { id: '4', name: 'Client 4', logo: '/placeholder.svg' },
];

const defaultCourses: Course[] = [
  {
    id: '1',
    title: 'Ethical Hacking (Recording)',
    description: 'Complete ethical hacking course with pre-recorded sessions. Download our app from Play Store to access.',
    slug: 'ethical-hacking-recording',
    category: 'recording',
    pricing: {},
    duration: '6 months',
    level: 'Intermediate',
    gradient: 'from-primary via-accent to-primary',
    icon: 'Shield',
    playStoreLink: 'https://play.google.com/store',
    isActive: true,
    curriculum: ['Introduction to Ethical Hacking', 'Network Security', 'Web Application Security', 'Mobile Security', 'Advanced Penetration Testing'],
    recordingsCount: 150,
    notes: 'Comprehensive study materials included',
  },
  {
    id: '2',
    title: 'Ethical Hacking (Live)',
    description: 'Live interactive sessions with expert instructors. Choose between one-to-one or group sessions.',
    slug: 'ethical-hacking-live',
    category: 'live',
    sessionType: 'both',
    pricing: {
      oneToOne: 40000,
      groupMin: 15000,
      groupMax: 20000,
    },
    duration: '6 months',
    level: 'Intermediate',
    gradient: 'from-primary via-accent to-primary',
    icon: 'Video',
    isActive: true,
    demoAvailable: true,
    demoVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    curriculum: ['Fundamentals of Hacking', 'Reconnaissance & Scanning', 'Exploitation Techniques', 'Post-Exploitation', 'Reporting & Documentation'],
    notes: 'Live Q&A sessions included',
  },
  {
    id: '3',
    title: 'VAPT (Live)',
    description: 'Vulnerability Assessment and Penetration Testing course with hands-on practice.',
    slug: 'vapt-live',
    category: 'live',
    sessionType: 'both',
    pricing: {
      oneToOne: 40000,
      groupMin: 15000,
      groupMax: 20000,
    },
    duration: '4 months',
    level: 'Advanced',
    gradient: 'from-primary via-accent to-primary',
    icon: 'Shield',
    isActive: true,
    demoAvailable: true,
    demoVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    curriculum: ['VAPT Methodology', 'Vulnerability Assessment', 'Penetration Testing', 'Report Writing', 'Remediation'],
    notes: 'Real-world scenarios and labs',
  },
  {
    id: '4',
    title: 'Bug Bounty (Live)',
    description: 'Learn to find vulnerabilities and earn through bug bounty programs with hands-on training.',
    slug: 'bug-bounty-live',
    category: 'live',
    sessionType: 'both',
    pricing: {
      oneToOne: 40000,
      groupMin: 15000,
      groupMax: 20000,
    },
    duration: '3 months',
    level: 'Intermediate',
    gradient: 'from-primary via-accent to-primary',
    icon: 'TrendingUp',
    isActive: true,
    demoAvailable: true,
    demoVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    curriculum: ['Bug Bounty Platforms', 'Vulnerability Research', 'Report Writing', 'Communication Skills', 'Building Reputation'],
    notes: 'Platform access and mentorship included',
  },
];

const defaultCertificates: Certificate[] = [
  { id: '1', name: 'CEH Certified', description: 'Certified Ethical Hacker', image: '/placeholder.svg' },
  { id: '2', name: 'OSCP', description: 'Offensive Security Certified Professional', image: '/placeholder.svg' },
];

const defaultReviews: Review[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    role: 'Security Analyst',
    rating: 5,
    comment: 'The ethical hacking course was incredibly comprehensive. The hands-on labs and real-world scenarios helped me land my dream job in cybersecurity.',
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true,
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'Penetration Tester',
    rating: 5,
    comment: 'Best VAPT training I\'ve taken. The instructors are industry experts and the course material is always up-to-date with latest techniques.',
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true,
  },
  {
    id: '3',
    name: 'Amit Patel',
    role: 'Bug Bounty Hunter',
    rating: 5,
    comment: 'The bug bounty bootcamp transformed my approach to vulnerability hunting. I earned my first bounty within 2 months of completing the course!',
    date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true,
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    role: 'Security Consultant',
    rating: 5,
    comment: 'Professional training with excellent support. The practical approach and real-world projects made all the difference in understanding concepts.',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true,
  },
];

// Data access functions
export const bannerStore = {
  get: () => getStoredData(STORAGE_KEYS.BANNERS, defaultBanners),
  save: (banners: Banner[]) => saveData(STORAGE_KEYS.BANNERS, banners),
  getActive: () => bannerStore.get().filter(b => b.isActive),
};

export const serviceStore = {
  get: () => getStoredData(STORAGE_KEYS.SERVICES, defaultServices),
  save: (services: Service[]) => saveData(STORAGE_KEYS.SERVICES, services),
  getActive: () => serviceStore.get().filter(s => s.isActive),
  getBySlug: (slug: string) => serviceStore.get().find(s => s.slug === slug),
};

export const courseStore = {
  get: () => getStoredData(STORAGE_KEYS.COURSES, defaultCourses),
  save: (courses: Course[]) => saveData(STORAGE_KEYS.COURSES, courses),
  getActive: () => courseStore.get().filter(c => c.isActive),
  getBySlug: (slug: string) => courseStore.get().find(c => c.slug === slug),
  getByCategory: (category: 'recording' | 'live') => courseStore.getActive().filter(c => c.category === category),
};

export const clientStore = {
  get: () => getStoredData(STORAGE_KEYS.CLIENTS, defaultClients),
  save: (clients: ClientLogo[]) => saveData(STORAGE_KEYS.CLIENTS, clients),
};

export const certificateStore = {
  get: () => getStoredData(STORAGE_KEYS.CERTIFICATES, defaultCertificates),
  save: (certificates: Certificate[]) => saveData(STORAGE_KEYS.CERTIFICATES, certificates),
};

export const reviewStore = {
  get: () => getStoredData(STORAGE_KEYS.REVIEWS, defaultReviews),
  save: (reviews: Review[]) => saveData(STORAGE_KEYS.REVIEWS, reviews),
  getActive: () => reviewStore.get().filter(r => r.isActive),
};
