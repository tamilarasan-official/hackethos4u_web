import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
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
const ADMIN_OTP_PENDING_KEY = 'hackethos4u-admin-otp-pending';
const ADMIN_PENDING_LOGIN_KEY = 'hackethos4u-admin-pending-login';
const ADMIN_VERIFIED_KEY = 'hackethos4u-admin-otp-verified';
const ADMIN_VERIFIED_EMAIL_KEY = 'hackethos4u-admin-verified-email';

type AdminOtpSession = {
  email: string;
  maskedEmail?: string;
  expiresAt: number;
  canResendAt: number;
  expiresInMs?: number;
  resendInMs?: number;
};

type PendingAdminLogin = {
  email: string;
  password: string;
};

type LoginResult = {
  requiresTwoFactor: boolean;
};

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  authTransitioning: boolean;
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

const normalizeAdminOtpSession = (session: AdminOtpSession): AdminOtpSession => {
  const now = Date.now();
  const expiresAt = typeof session.expiresInMs === 'number'
    ? now + Math.max(0, session.expiresInMs)
    : session.expiresAt;
  const canResendAt = typeof session.resendInMs === 'number'
    ? now + Math.max(0, session.resendInMs)
    : session.canResendAt;

  return {
    ...session,
    expiresAt,
    canResendAt,
  };
};

const getPendingAdminLogin = (): PendingAdminLogin | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(ADMIN_PENDING_LOGIN_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as PendingAdminLogin;
    if (!parsed?.email || !parsed?.password) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

const storePendingAdminLogin = (value: PendingAdminLogin | null) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (!value) {
    window.sessionStorage.removeItem(ADMIN_PENDING_LOGIN_KEY);
    return;
  }

  window.sessionStorage.setItem(ADMIN_PENDING_LOGIN_KEY, JSON.stringify(value));
};

const getVerifiedAdminMarker = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.sessionStorage.getItem(ADMIN_VERIFIED_KEY) === 'true';
};

const setVerifiedAdminMarker = (verified: boolean) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (verified) {
    window.sessionStorage.setItem(ADMIN_VERIFIED_KEY, 'true');
  } else {
    window.sessionStorage.removeItem(ADMIN_VERIFIED_KEY);
  }
};

const getVerifiedAdminEmail = () => {
  if (typeof window === 'undefined') {
    return '';
  }

  return normalizeEmail(window.sessionStorage.getItem(ADMIN_VERIFIED_EMAIL_KEY));
};

const setVerifiedAdminEmail = (email?: string | null) => {
  if (typeof window === 'undefined') {
    return;
  }

  const normalizedEmail = normalizeEmail(email);
  if (normalizedEmail) {
    window.sessionStorage.setItem(ADMIN_VERIFIED_EMAIL_KEY, normalizedEmail);
  } else {
    window.sessionStorage.removeItem(ADMIN_VERIFIED_EMAIL_KEY);
  }
};

const getOtpPending = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.sessionStorage.getItem(ADMIN_OTP_PENDING_KEY) === 'true';
};

const setOtpPending = (pending: boolean) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (pending) {
    window.sessionStorage.setItem(ADMIN_OTP_PENDING_KEY, 'true');
  } else {
    window.sessionStorage.removeItem(ADMIN_OTP_PENDING_KEY);
  }
};

async function apiRequest<T>(path: string, idToken?: string, body?: Record<string, unknown>, method = 'POST'): Promise<T> {
  const response = await fetch(path, {
    method,
    credentials: 'include',
    headers: {
      ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
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

const normalizeEmail = (value?: string | null) => String(value || '').trim().toLowerCase();

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const otpVerificationInProgressRef = useRef(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authTransitioning, setAuthTransitioning] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminTwoFactorVerified, setAdminTwoFactorVerified] = useState(false);
  const [adminOtpSession, setAdminOtpSession] = useState<AdminOtpSession | null>(getStoredAdminOtpSession());

  const syncAdminOtpSession = (session: AdminOtpSession | null) => {
    const normalizedSession = session ? normalizeAdminOtpSession(session) : null;
    setAdminOtpSession(normalizedSession);
    storeAdminOtpSession(normalizedSession);
  };

  const clearAuthState = () => {
    setIsAdmin(false);
    setAdminTwoFactorVerified(false);
    syncAdminOtpSession(null);
    storePendingAdminLogin(null);
    setVerifiedAdminMarker(false);
    setVerifiedAdminEmail('');
    setOtpPending(false);
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
      setIsAdmin(false);
      setAdminTwoFactorVerified(false);
      if (!getOtpPending()) {
        syncAdminOtpSession(null);
        storePendingAdminLogin(null);
        setVerifiedAdminMarker(false);
        setVerifiedAdminEmail('');
      }
      if (!otpVerificationInProgressRef.current) {
        setAuthTransitioning(false);
      }
      setLoading(false);
      return;
    }

    setCurrentUser(user);

    try {
      const role = await resolveRole(user);
      const userEmail = normalizeEmail(user.email);
      const pendingEmail = normalizeEmail(getPendingAdminLogin()?.email);
      const otpEmail = normalizeEmail(adminOtpSession?.email);
      const verifiedEmail = getVerifiedAdminEmail();
      const nextIsAdmin =
        role === 'admin' ||
        userEmail === pendingEmail ||
        userEmail === otpEmail ||
        userEmail === verifiedEmail;
      setIsAdmin(nextIsAdmin);

      if (!nextIsAdmin) {
        setAdminTwoFactorVerified(false);
        syncAdminOtpSession(null);
        storePendingAdminLogin(null);
        setVerifiedAdminMarker(false);
        setVerifiedAdminEmail('');
      } else {
        if (getOtpPending()) {
          setAdminTwoFactorVerified(false);
        } else {
          if (getVerifiedAdminMarker()) {
            setAdminTwoFactorVerified(true);
          }
          const verified = await checkAdminSession(user);
          setAdminTwoFactorVerified(verified);
          if (verified) {
            syncAdminOtpSession(null);
            storePendingAdminLogin(null);
            setVerifiedAdminMarker(true);
            setVerifiedAdminEmail(user.email);
          } else {
            setVerifiedAdminMarker(false);
            setVerifiedAdminEmail('');
          }
        }
      }
    } finally {
      if (!otpVerificationInProgressRef.current) {
        setAuthTransitioning(false);
      }
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
    if (message.includes('This account is not allowed to access the admin panel.')) {
      return message;
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
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (auth.currentUser) {
        await signOut(auth);
      }
      setVerifiedAdminMarker(false);
      setVerifiedAdminEmail('');
      setOtpPending(true);
      storePendingAdminLogin({ email, password });

      const data = await apiRequest<AdminOtpSession>('/api/admin/start-otp', undefined, { email, password });

      syncAdminOtpSession(data);
      setCurrentUser(null);
      setIsAdmin(false);
      setAdminTwoFactorVerified(false);
      toast.success('OTP sent to your admin email.');

      return { requiresTwoFactor: true };
    } catch (error: unknown) {
      console.error('Login error:', error);
      setOtpPending(false);
      syncAdminOtpSession(null);
      storePendingAdminLogin(null);
      toast.error(normalizeAuthError(error));
      throw error;
    }
  };

  const resendAdminOtp = async () => {
    try {
      if (!adminOtpSession) {
        throw new Error('No active OTP session found.');
      }

      const data = await apiRequest<AdminOtpSession>('/api/admin/resend-otp');

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
      otpVerificationInProgressRef.current = true;
      setAuthTransitioning(true);
      const pendingLogin = getPendingAdminLogin();
      if (!pendingLogin) {
        otpVerificationInProgressRef.current = false;
        setAuthTransitioning(false);
        throw new Error('Your login session expired. Please sign in again.');
      }

      await apiRequest('/api/admin/verify-otp', undefined, { otp });
      const credential = await signInWithEmailAndPassword(auth, pendingLogin.email, pendingLogin.password);
      const role = await resolveRole(credential.user);
      const userEmail = normalizeEmail(credential.user.email);
      const pendingEmail = normalizeEmail(pendingLogin.email);

      if (role !== 'admin' && userEmail !== pendingEmail) {
        await signOut(auth);
        throw new Error('This account is not allowed to access the admin panel.');
      }

      const verified = await checkAdminSession(credential.user);
      if (!verified) {
        await signOut(auth);
        throw new Error('OTP verification was not completed correctly. Please try again.');
      }

      setCurrentUser(credential.user);
      setIsAdmin(true);
      setAdminTwoFactorVerified(true);
      syncAdminOtpSession(null);
      storePendingAdminLogin(null);
      setVerifiedAdminMarker(true);
      setVerifiedAdminEmail(credential.user.email);
      setOtpPending(false);
      toast.success('Admin verification successful.');
    } catch (error: unknown) {
      otpVerificationInProgressRef.current = false;
      setAuthTransitioning(false);
      console.error('Verify OTP error:', error);
      toast.error(normalizeAuthError(error));
      throw error;
    } finally {
      otpVerificationInProgressRef.current = false;
      setAuthTransitioning(false);
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
    authTransitioning,
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
