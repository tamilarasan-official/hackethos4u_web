import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onIdTokenChanged,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  User,
  IdTokenResult,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { auth, db, functions } from '@/lib/firebase';
import { toast } from 'sonner';

const ADMIN_OTP_SESSION_KEY = 'hackethos4u-admin-otp';

type AdminOtpSession = {
  email: string;
  expiresAt: number;
  canResendAt: number;
};

type LoginResult = {
  requiresTwoFactor: boolean;
};

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isAdmin: boolean;
  adminTwoFactorVerified: boolean;
  adminOtpSession: AdminOtpSession | null;
  login: (email: string, password: string) => Promise<LoginResult>;
  verifyAdminOtp: (otp: string) => Promise<void>;
  resendAdminOtp: () => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getStoredAdminOtpSession = (): AdminOtpSession | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(ADMIN_OTP_SESSION_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as AdminOtpSession;
    if (!parsed?.email || !parsed?.expiresAt || !parsed?.canResendAt) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

const storeAdminOtpSession = (session: AdminOtpSession | null) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (!session) {
    window.sessionStorage.removeItem(ADMIN_OTP_SESSION_KEY);
    return;
  }

  window.sessionStorage.setItem(ADMIN_OTP_SESSION_KEY, JSON.stringify(session));
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

type AuthMetadata = {
  isAdmin: boolean;
  adminTwoFactorVerified: boolean;
};

const resolveRole = async (user: User) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      return String(userDoc.data().role || '');
    }
  } catch (error) {
    console.error('Failed to resolve user role:', error);
  }

  return '';
};

const deriveAdminMetadata = async (user: User, tokenResult: IdTokenResult): Promise<AuthMetadata> => {
  const role = await resolveRole(user);
  const isAdmin = role === 'admin' || tokenResult.claims.admin === true;
  const verifiedAt = Number(tokenResult.claims.adminTwoFactorVerifiedAt || 0);
  const authTimeMs = Number(tokenResult.claims.auth_time || 0) * 1000;
  const adminTwoFactorVerified = isAdmin && verifiedAt >= authTimeMs;

  return {
    isAdmin,
    adminTwoFactorVerified,
  };
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminTwoFactorVerified, setAdminTwoFactorVerified] = useState(false);
  const [adminOtpSession, setAdminOtpSession] = useState<AdminOtpSession | null>(getStoredAdminOtpSession());

  const startAdminEmailOtp = httpsCallable(functions, 'startAdminEmailOtp');
  const verifyAdminEmailOtp = httpsCallable(functions, 'verifyAdminEmailOtp');

  const syncAdminOtpSession = (session: AdminOtpSession | null) => {
    setAdminOtpSession(session);
    storeAdminOtpSession(session);
  };

  const clearAuthState = () => {
    setIsAdmin(false);
    setAdminTwoFactorVerified(false);
    syncAdminOtpSession(null);
  };

  const applyUserState = async (user: User | null, forceRefresh = false) => {
    if (!user) {
      setCurrentUser(null);
      clearAuthState();
      setLoading(false);
      return;
    }

    setCurrentUser(user);

    try {
      const tokenResult = await user.getIdTokenResult(forceRefresh);
      const metadata = await deriveAdminMetadata(user, tokenResult);
      setIsAdmin(metadata.isAdmin);
      setAdminTwoFactorVerified(metadata.adminTwoFactorVerified);

      if (metadata.adminTwoFactorVerified) {
        syncAdminOtpSession(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const normalizeAuthError = (error: unknown) => {
    const firebaseError = error as { code?: string; message?: string };
    const code = firebaseError.code || '';

    if (code === 'auth/invalid-credential' || code === 'auth/wrong-password') {
      return 'Invalid email or password.';
    }
    if (code === 'auth/user-not-found') {
      return 'No account found with this email.';
    }
    if (code === 'auth/too-many-requests') {
      return 'Too many failed attempts. Please try again later.';
    }
    if (code === 'functions/permission-denied') {
      return 'This account is not allowed to access the admin panel.';
    }
    if (code === 'functions/resource-exhausted') {
      return firebaseError.message || 'Too many OTP requests. Please wait before trying again.';
    }
    if (code === 'functions/unavailable') {
      return 'OTP service is unavailable right now. Please try again shortly.';
    }
    if (code === 'auth/network-request-failed') {
      return 'Network error. Please check your connection.';
    }

    return firebaseError.message || 'Authentication failed. Please try again.';
  };

  const login = async (email: string, password: string): Promise<LoginResult> => {
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const tokenResult = await credential.user.getIdTokenResult(true);
      const metadata = await deriveAdminMetadata(credential.user, tokenResult);

      if (!metadata.isAdmin) {
        await signOut(auth);
        throw { code: 'functions/permission-denied' };
      }

      const result = await startAdminEmailOtp();
      const data = result.data as { email: string; expiresAt: number; canResendAt: number };
      syncAdminOtpSession({
        email: data.email,
        expiresAt: data.expiresAt,
        canResendAt: data.canResendAt,
      });
      setCurrentUser(credential.user);
      setIsAdmin(true);
      setAdminTwoFactorVerified(false);
      toast.success('OTP sent to your admin email.');

      return { requiresTwoFactor: true };
    } catch (error: unknown) {
      console.error('Login error:', error);
      const message = normalizeAuthError(error);
      toast.error(message);
      throw error;
    }
  };

  const resendAdminOtp = async () => {
    try {
      const result = await startAdminEmailOtp();
      const data = result.data as { email: string; expiresAt: number; canResendAt: number };
      syncAdminOtpSession({
        email: data.email,
        expiresAt: data.expiresAt,
        canResendAt: data.canResendAt,
      });
      toast.success('A new OTP has been sent.');
    } catch (error: unknown) {
      console.error('Resend OTP error:', error);
      const message = normalizeAuthError(error);
      toast.error(message);
      throw error;
    }
  };

  const verifyAdminOtp = async (otp: string) => {
    try {
      await verifyAdminEmailOtp({ otp });
      if (!auth.currentUser) {
        throw new Error('No user logged in');
      }

      await applyUserState(auth.currentUser, true);
      toast.success('Admin verification successful.');
    } catch (error: unknown) {
      console.error('Verify OTP error:', error);
      const message = normalizeAuthError(error);
      toast.error(message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      clearAuthState();
      toast.success('Logged out successfully!');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout. Please try again.');
      throw error;
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      if (!currentUser || !currentUser.email) {
        throw new Error('No user logged in');
      }

      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword,
      );
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPassword);
      toast.success('Password changed successfully!');
    } catch (error: unknown) {
      console.error('Change password error:', error);
      let errorMessage = 'Failed to change password.';
      const firebaseError = error as { code?: string };

      if (firebaseError.code === 'auth/wrong-password' || firebaseError.code === 'auth/invalid-credential') {
        errorMessage = 'Current password is incorrect.';
      } else if (firebaseError.code === 'auth/weak-password') {
        errorMessage = 'New password is too weak. Use at least 6 characters.';
      } else if (firebaseError.code === 'auth/requires-recent-login') {
        errorMessage = 'Please logout and login again before changing password.';
      }

      toast.error(errorMessage);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (user) => {
      setLoading(true);
      void applyUserState(user);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    loading,
    isAdmin,
    adminTwoFactorVerified,
    adminOtpSession,
    login,
    verifyAdminOtp,
    resendAdminOtp,
    logout,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
