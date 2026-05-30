import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Loader2 } from 'lucide-react';
import SEO from '@/components/SEO';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const {
    login,
    loading: authLoading,
    authTransitioning,
    currentUser,
    isAdmin,
    adminTwoFactorVerified,
    adminOtpSession,
  } = useAuth();
  const navigate = useNavigate();

  if (authLoading || authTransitioning) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (currentUser && isAdmin && adminTwoFactorVerified) {
    return <Navigate to="/admin" replace />;
  }

  if (adminOtpSession && !adminTwoFactorVerified) {
    return <Navigate to="/admin-access/otp" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin-access/otp');
    } catch (error) {
      // Error is already handled in AuthContext with toast
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resetEmail) {
      return;
    }

    setResetLoading(true);
    setResetSent(false);
    try {
      const response = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: resetEmail }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unable to send password reset link.');
      }

      setResetSent(true);
      toast.success(data.message || 'Password reset link sent.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to send password reset link.';
      toast.error(message);
    } finally {
      setResetLoading(false);
    }
  };

  const openResetMode = () => {
    setResetEmail(email);
    setResetSent(false);
    setResetMode(true);
  };

  const closeResetMode = () => {
    setResetMode(false);
    setResetSent(false);
  };

  return (
    <>
      <SEO
        title="Login - Hackethos4U"
        description="Admin login page for Hackethos4U"
        noindex={true}
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <Card className="w-full max-w-md relative z-10 border-white/10 bg-black/50 backdrop-blur-xl">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white">
                {resetMode ? 'Reset Password' : 'Admin Login'}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {resetMode
                  ? 'Request a secure Firebase password reset link'
                  : 'Enter your credentials to start admin verification'}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {resetMode ? (
              <>
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email" className="text-white">
                      Admin email
                    </Label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="admin@hackethos4u.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      disabled={resetLoading}
                      className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground focus:border-primary"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white"
                    disabled={resetLoading}
                  >
                    {resetLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending reset link...
                      </>
                    ) : (
                      'Send reset link'
                    )}
                  </Button>
                </form>

                {resetSent && (
                  <div className="mt-4 rounded-lg border border-primary/20 bg-primary/10 px-4 py-3 text-center text-sm text-white">
                    If this admin email exists, a password reset link has been sent.
                  </div>
                )}

                <div className="mt-5 text-center">
                  <Button
                    type="button"
                    variant="link"
                    className="text-muted-foreground hover:text-primary"
                    onClick={closeResetMode}
                  >
                    Back to admin login
                  </Button>
                </div>
              </>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@hackethos4u.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                      className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <Label htmlFor="password" className="text-white">
                        Password
                      </Label>
                      <Button
                        type="button"
                        variant="link"
                        className="h-auto p-0 text-xs text-muted-foreground hover:text-primary"
                        onClick={openResetMode}
                      >
                        Forgot password?
                      </Button>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                      className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground focus:border-primary"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Verifying password...
                      </>
                    ) : (
                      'Continue'
                    )}
                  </Button>
                </form>

                <p className="mt-4 text-center text-sm text-muted-foreground">
                  After password validation, a one-time code will be sent to your admin email.
                </p>
                <p className="mt-2 text-center text-xs text-muted-foreground/80">
                  Secure admin sign-in uses email OTP verification.
                </p>
              </>
            )}

            <div className="mt-6 text-center">
              <Button
                variant="link"
                className="text-muted-foreground hover:text-primary"
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
