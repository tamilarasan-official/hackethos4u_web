import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCydoRu5x4VmdG6S7Wlu6iFjxMIpkPbm60",
  authDomain: "hackthous4u-website.firebaseapp.com",
  projectId: "hackthous4u-website",
  storageBucket: "hackthous4u-website.firebasestorage.app",
  messagingSenderId: "1077490164590",
  appId: "1:1077490164590:web:b06b56ce6505cf7e94d77f",
  measurementId: "G-4B1TVWCFQ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Enable offline persistence
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Firestore persistence failed: Multiple tabs open');
    } else if (err.code === 'unimplemented') {
      console.warn('Firestore persistence not available in this browser');
    }
  });
}

export default app;
