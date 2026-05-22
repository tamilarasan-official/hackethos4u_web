import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onIdTokenChanged,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  User,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { toast } from 'sonner';

const ADMIN_OTP_SESSION_KEY = 'hackethos4u-admin-otp';

type AdminOtpSession = {
  email: string;
  maskedEmail?: string;
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

async function apiRequest<T>(path: string, idToken: string, body?: Record<string, unknown>, method = 'POST'): Promise<T> {
  const response = await fetch(path, {
    method,
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${idToken}`,
      ...(method !== 'GET' ? { 'Content-Type': 'application/json' } : {}),
    },
    ...(method !== 'GET' ? { body: JSON.stringify(body || {}) } : {}),
  });

  const data = (await response.json()) as T & { error?: string };
  if (!response.ok) {
    throw new Error(data.error || 'Request failed.');
  }

  return data;
}

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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminTwoFactorVerified, setAdminTwoFactorVerified] = useState(false);
  const [adminOtpSession, setAdminOtpSession] = useState<AdminOtpSession | null>(getStoredAdminOtpSession());

  const syncAdminOtpSession = (session: AdminOtpSession | null) => {
    setAdminOtpSession(session);
    storeAdminOtpSession(session);
  };

  const clearAuthState = () => {
    setIsAdmin(false);
    setAdminTwoFactorVerified(false);
    syncAdminOtpSession(null);
  };

  const checkAdminSession = async (user: User) => {
    const idToken = await user.getIdToken();
    const response = await apiRequest<{ verified: boolean }>(
      '/api/admin/session',
      idToken,
      undefined,
      'GET',
    );
    return response.verified === true;
  };

  const applyUserState = async (user: User | null) => {
    if (!user) {
      setCurrentUser(null);
      clearAuthState();
      setLoading(false);
      return;
    }

    setCurrentUser(user);

    try {
      const role = await resolveRole(user);
      const nextIsAdmin = role === 'admin';
      setIsAdmin(nextIsAdmin);

      if (!nextIsAdmin) {
        setAdminTwoFactorVerified(false);
        syncAdminOtpSession(null);
      } else {
        const verified = await checkAdminSession(user);
        setAdminTwoFactorVerified(verified);
        if (verified) {
          syncAdminOtpSession(null);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const normalizeAuthError = (error: unknown) => {
    const firebaseError = error as { code?: string; message?: string };
    const code = firebaseError.code || '';
    const message = firebaseError.message || '';

    if (code === 'auth/invalid-credential' || code === 'auth/wrong-password') {
      return 'Invalid email or password.';
    }
    if (code === 'auth/user-not-found') {
      return 'No account found with this email.';
    }
    if (code === 'auth/too-many-requests') {
      return 'Too many failed attempts. Please try again later.';
    }
    if (message.includes('not allowed for admin OTP')) {
      return 'This account is not allowed to access the admin panel.';
    }
    if (message.includes('Please wait before requesting another OTP')) {
      return message;
    }
    if (message.includes('OTP')) {
      return message;
    }
    if (code === 'auth/network-request-failed') {
      return 'Network error. Please check your connection.';
    }

    return message || 'Authentication failed. Please try again.';
  };

  const login = async (email: string, password: string): Promise<LoginResult> => {
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const role = await resolveRole(credential.user);

      if (role !== 'admin') {
        await signOut(auth);
        throw new Error('This account is not allowed to access the admin panel.');
      }

      const idToken = await credential.user.getIdToken();
      const data = await apiRequest<AdminOtpSession>('/api/admin/start-otp', idToken);

      syncAdminOtpSession(data);
      setCurrentUser(credential.user);
      setIsAdmin(true);
      setAdminTwoFactorVerified(false);
      toast.success('OTP sent to your admin email.');

      return { requiresTwoFactor: true };
    } catch (error: unknown) {
      console.error('Login error:', error);
      toast.error(normalizeAuthError(error));
      throw error;
    }
  };

  const resendAdminOtp = async () => {
    try {
      if (!auth.currentUser) {
        throw new Error('No user logged in');
      }

      const idToken = await auth.currentUser.getIdToken();
      const data = await apiRequest<AdminOtpSession>('/api/admin/resend-otp', idToken);

      syncAdminOtpSession(data);
      toast.success('A new OTP has been sent.');
    } catch (error: unknown) {
      console.error('Resend OTP error:', error);
      toast.error(normalizeAuthError(error));
      throw error;
    }
  };

  const verifyAdminOtp = async (otp: string) => {
    try {
      if (!auth.currentUser) {
        throw new Error('No user logged in');
      }

      const idToken = await auth.currentUser.getIdToken(true);
      await apiRequest('/api/admin/verify-otp', idToken, { otp });
      setAdminTwoFactorVerified(true);
      syncAdminOtpSession(null);
      toast.success('Admin verification successful.');
    } catch (error: unknown) {
      console.error('Verify OTP error:', error);
      toast.error(normalizeAuthError(error));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });
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
