import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { currentUser, loading, authTransitioning, isAdmin, adminTwoFactorVerified } = useAuth();

  if (loading || authTransitioning) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/admin-access" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/admin-access" replace />;
  }

  if (!adminTwoFactorVerified) {
    return <Navigate to="/admin-access/otp" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
