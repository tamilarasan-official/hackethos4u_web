import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Loader2 } from 'lucide-react';
import SEO from '@/components/SEO';
import { auth } from '@/lib/firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resettingSession, setResettingSession] = useState(true);
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const resetSession = async () => {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          credentials: 'include',
        });

        if (auth.currentUser) {
          await signOut(auth);
        }
      } catch (error) {
        console.error('Failed to reset admin session:', error);
      } finally {
        if (active) {
          setResettingSession(false);
        }
      }
    };

    void resetSession();

    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || resettingSession || currentUser) {
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
              <CardTitle className="text-2xl font-bold text-white">Admin Login</CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter your credentials to start admin verification
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {resettingSession ? (
              <div className="py-8 text-center text-muted-foreground">
                <Loader2 className="w-5 h-5 mx-auto mb-3 animate-spin" />
                Resetting previous admin session...
              </div>
            ) : (
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
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
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
            )}

            <p className="mt-4 text-center text-sm text-muted-foreground">
              After password validation, a one-time code will be sent to your admin email.
            </p>

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
