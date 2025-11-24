import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from './firebase';

// Collection names
export const COLLECTIONS = {
  COURSES: 'courses',
  SERVICES: 'services',
  CERTIFICATES: 'certificates',
  REVIEWS: 'reviews',
  BANNERS: 'banners',
  CLIENTS: 'clients',
  CONTACTS: 'contacts',
};

// Helper function to remove undefined values from objects (Firestore doesn't support undefined)
const removeUndefinedFields = (obj: any): any => {
  const cleaned: any = {};
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value !== undefined) {
      if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Timestamp)) {
        // Recursively clean nested objects
        cleaned[key] = removeUndefinedFields(value);
      } else {
        cleaned[key] = value;
      }
    }
  });
  return cleaned;
};

// Generic CRUD operations
export const firestoreService = {
  // Get all documents from a collection
  async getAll<T>(collectionName: string, constraints: QueryConstraint[] = []): Promise<T[]> {
    try {
      const collectionRef = collection(db, collectionName);
      const q = constraints.length > 0 ? query(collectionRef, ...constraints) : collectionRef;
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];
    } catch (error) {
      console.error(`Error getting ${collectionName}:`, error);
      throw error;
    }
  },

  // Get single document by ID
  async getById<T>(collectionName: string, id: string): Promise<T | null> {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T;
      }
      return null;
    } catch (error) {
      console.error(`Error getting document ${id} from ${collectionName}:`, error);
      throw error;
    }
  },

  // Get document by field value
  async getByField<T>(
    collectionName: string,
    fieldName: string,
    value: any
  ): Promise<T | null> {
    try {
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, where(fieldName, '==', value));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() } as T;
      }
      return null;
    } catch (error) {
      console.error(`Error getting ${collectionName} by ${fieldName}:`, error);
      throw error;
    }
  },

  // Create new document
  async create<T>(collectionName: string, data: Omit<T, 'id'>): Promise<string> {
    try {
      const collectionRef = collection(db, collectionName);
      const docData = removeUndefinedFields({
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      const docRef = await addDoc(collectionRef, docData);
      return docRef.id;
    } catch (error) {
      console.error(`Error creating document in ${collectionName}:`, error);
      throw error;
    }
  },

  // Update existing document
  async update<T>(
    collectionName: string,
    id: string,
    data: Partial<Omit<T, 'id'>>
  ): Promise<void> {
    try {
      const docRef = doc(db, collectionName, id);
      const updateData = removeUndefinedFields({
        ...data,
        updatedAt: Timestamp.now(),
      });
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error(`Error updating document ${id} in ${collectionName}:`, error);
      throw error;
    }
  },

  // Delete document
  async delete(collectionName: string, id: string): Promise<void> {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(`Error deleting document ${id} from ${collectionName}:`, error);
      throw error;
    }
  },

  // Subscribe to collection changes (real-time)
  subscribeToCollection<T>(
    collectionName: string,
    callback: (data: T[]) => void,
    constraints: QueryConstraint[] = []
  ): () => void {
    try {
      const collectionRef = collection(db, collectionName);
      const q = constraints.length > 0 ? query(collectionRef, ...constraints) : collectionRef;

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as T[];
          callback(data);
        },
        (error) => {
          console.error(`Error subscribing to ${collectionName}:`, error);
        }
      );

      return unsubscribe;
    } catch (error) {
      console.error(`Error setting up subscription for ${collectionName}:`, error);
      throw error;
    }
  },

  // Subscribe to single document (real-time)
  subscribeToDocument<T>(
    collectionName: string,
    id: string,
    callback: (data: T | null) => void
  ): () => void {
    try {
      const docRef = doc(db, collectionName, id);

      const unsubscribe = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            callback({ id: docSnap.id, ...docSnap.data() } as T);
          } else {
            callback(null);
          }
        },
        (error) => {
          console.error(`Error subscribing to document ${id}:`, error);
        }
      );

      return unsubscribe;
    } catch (error) {
      console.error(`Error setting up subscription for document ${id}:`, error);
      throw error;
    }
  },
};

// Specific service functions for better type safety

// Courses
export const coursesService = {
  getAll: () => firestoreService.getAll(COLLECTIONS.COURSES),
  getById: (id: string) => firestoreService.getById(COLLECTIONS.COURSES, id),
  getBySlug: (slug: string) => firestoreService.getByField(COLLECTIONS.COURSES, 'slug', slug),
  create: (data: any) => firestoreService.create(COLLECTIONS.COURSES, data),
  update: (id: string, data: any) => firestoreService.update(COLLECTIONS.COURSES, id, data),
  delete: (id: string) => firestoreService.delete(COLLECTIONS.COURSES, id),
  subscribe: (callback: (data: any[]) => void) =>
    firestoreService.subscribeToCollection(COLLECTIONS.COURSES, callback),
};

// Services
export const servicesService = {
  getAll: () => firestoreService.getAll(COLLECTIONS.SERVICES),
  getById: (id: string) => firestoreService.getById(COLLECTIONS.SERVICES, id),
  getBySlug: (slug: string) => firestoreService.getByField(COLLECTIONS.SERVICES, 'slug', slug),
  create: (data: any) => firestoreService.create(COLLECTIONS.SERVICES, data),
  update: (id: string, data: any) => firestoreService.update(COLLECTIONS.SERVICES, id, data),
  delete: (id: string) => firestoreService.delete(COLLECTIONS.SERVICES, id),
  subscribe: (callback: (data: any[]) => void) =>
    firestoreService.subscribeToCollection(COLLECTIONS.SERVICES, callback),
};

// Certificates
export const certificatesService = {
  getAll: () => firestoreService.getAll(COLLECTIONS.CERTIFICATES),
  getById: (id: string) => firestoreService.getById(COLLECTIONS.CERTIFICATES, id),
  create: (data: any) => firestoreService.create(COLLECTIONS.CERTIFICATES, data),
  update: (id: string, data: any) => firestoreService.update(COLLECTIONS.CERTIFICATES, id, data),
  delete: (id: string) => firestoreService.delete(COLLECTIONS.CERTIFICATES, id),
  subscribe: (callback: (data: any[]) => void) =>
    firestoreService.subscribeToCollection(COLLECTIONS.CERTIFICATES, callback),
};

// Reviews
export const reviewsService = {
  getAll: () => firestoreService.getAll(COLLECTIONS.REVIEWS),
  getById: (id: string) => firestoreService.getById(COLLECTIONS.REVIEWS, id),
  create: (data: any) => firestoreService.create(COLLECTIONS.REVIEWS, data),
  update: (id: string, data: any) => firestoreService.update(COLLECTIONS.REVIEWS, id, data),
  delete: (id: string) => firestoreService.delete(COLLECTIONS.REVIEWS, id),
  subscribe: (callback: (data: any[]) => void) =>
    firestoreService.subscribeToCollection(COLLECTIONS.REVIEWS, callback),
};

// Banners
export const bannersService = {
  getAll: () => firestoreService.getAll(COLLECTIONS.BANNERS),
  getById: (id: string) => firestoreService.getById(COLLECTIONS.BANNERS, id),
  create: (data: any) => firestoreService.create(COLLECTIONS.BANNERS, data),
  update: (id: string, data: any) => firestoreService.update(COLLECTIONS.BANNERS, id, data),
  delete: (id: string) => firestoreService.delete(COLLECTIONS.BANNERS, id),
  subscribe: (callback: (data: any[]) => void) =>
    firestoreService.subscribeToCollection(COLLECTIONS.BANNERS, callback),
};

// Clients
export const clientsService = {
  getAll: () => firestoreService.getAll(COLLECTIONS.CLIENTS),
  getById: (id: string) => firestoreService.getById(COLLECTIONS.CLIENTS, id),
  create: (data: any) => firestoreService.create(COLLECTIONS.CLIENTS, data),
  update: (id: string, data: any) => firestoreService.update(COLLECTIONS.CLIENTS, id, data),
  delete: (id: string) => firestoreService.delete(COLLECTIONS.CLIENTS, id),
  subscribe: (callback: (data: any[]) => void) =>
    firestoreService.subscribeToCollection(COLLECTIONS.CLIENTS, callback),
};

// Contacts
export const contactsService = {
  getAll: () => firestoreService.getAll(COLLECTIONS.CONTACTS),
  getById: (id: string) => firestoreService.getById(COLLECTIONS.CONTACTS, id),
  create: (data: any) => firestoreService.create(COLLECTIONS.CONTACTS, data),
  update: (id: string, data: any) => firestoreService.update(COLLECTIONS.CONTACTS, id, data),
  delete: (id: string) => firestoreService.delete(COLLECTIONS.CONTACTS, id),
  subscribe: (callback: (data: any[]) => void) =>
    firestoreService.subscribeToCollection(COLLECTIONS.CONTACTS, callback),
};
