import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ShieldCheck, Loader2, Mail } from 'lucide-react';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useAuth } from '@/contexts/AuthContext';

const formatSeconds = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const AdminOtp = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    loading,
    authTransitioning,
    adminTwoFactorVerified,
    adminOtpSession,
    verifyAdminOtp,
    resendAdminOtp,
    logout,
  } = useAuth();

  const [otp, setOtp] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [redirectingToAdmin, setRedirectingToAdmin] = useState(false);
  const [secondsUntilResend, setSecondsUntilResend] = useState(0);
  const [secondsUntilExpiry, setSecondsUntilExpiry] = useState(0);

  useEffect(() => {
    if (!adminOtpSession?.canResendAt && !adminOtpSession?.expiresAt) {
      setSecondsUntilResend(0);
      setSecondsUntilExpiry(0);
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const nextResendValue = adminOtpSession?.canResendAt
        ? Math.max(0, Math.ceil((adminOtpSession.canResendAt - now) / 1000))
        : 0;
      const nextExpiryValue = adminOtpSession?.expiresAt
        ? Math.max(0, Math.ceil((adminOtpSession.expiresAt - now) / 1000))
        : 0;

      setSecondsUntilResend(nextResendValue);
      setSecondsUntilExpiry(nextExpiryValue);
    };

    updateTimer();
    const interval = window.setInterval(updateTimer, 1000);
    return () => window.clearInterval(interval);
  }, [adminOtpSession?.canResendAt, adminOtpSession?.expiresAt]);

  if (loading || authTransitioning || redirectingToAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Completing secure admin sign-in...</p>
        </div>
      </div>
    );
  }

  if (!adminOtpSession) {
    return <Navigate to="/admin-access" replace />;
  }

  if (adminTwoFactorVerified && currentUser) {
    return <Navigate to="/admin" replace />;
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      return;
    }

    setSubmitting(true);
    try {
      await verifyAdminOtp(otp);
      setRedirectingToAdmin(true);
      navigate('/admin', { replace: true });
    } catch {
      setRedirectingToAdmin(false);
      setOtp('');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await resendAdminOtp();
      setOtp('');
    } finally {
      setResending(false);
    }
  };

  const handleCancel = async () => {
    await logout();
    navigate('/admin-access', { replace: true });
  };

  return (
    <>
      <SEO
        title="Admin OTP Verification - Hackethos4U"
        description="Verify admin login with one-time email OTP"
        noindex={true}
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </div>

        <Card className="w-full max-w-md relative z-10 border-white/10 bg-black/50 backdrop-blur-xl">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white">Verify Admin Access</CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter the 6-digit code sent to your admin email
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 text-white">
                <Mail className="w-4 h-4 text-primary" />
                <span>{adminOtpSession.maskedEmail || adminOtpSession.email}</span>
              </div>
              <p className="mt-2">
                Use the latest OTP email. The code expires in {formatSeconds(secondsUntilExpiry)}.
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-6">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  disabled={submitting || secondsUntilExpiry === 0}
                  containerClassName="justify-center"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="h-12 w-12 bg-white/5 border-white/10 text-white" />
                    <InputOTPSlot index={1} className="h-12 w-12 bg-white/5 border-white/10 text-white" />
                    <InputOTPSlot index={2} className="h-12 w-12 bg-white/5 border-white/10 text-white" />
                    <InputOTPSlot index={3} className="h-12 w-12 bg-white/5 border-white/10 text-white" />
                    <InputOTPSlot index={4} className="h-12 w-12 bg-white/5 border-white/10 text-white" />
                    <InputOTPSlot index={5} className="h-12 w-12 bg-white/5 border-white/10 text-white" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white"
                disabled={submitting || otp.length !== 6 || secondsUntilExpiry === 0}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying OTP...
                  </>
                ) : secondsUntilExpiry === 0 ? (
                  'OTP Expired'
                ) : (
                  'Verify and Login'
                )}
              </Button>
            </form>

            <div className="mt-6 space-y-3 text-center">
              <p className="text-sm text-muted-foreground">
                {secondsUntilResend > 0
                  ? `Resend available in ${formatSeconds(secondsUntilResend)}`
                  : 'Need a fresh code?'}
              </p>
              <Button
                type="button"
                variant="outline"
                className="w-full border-white/10 hover:bg-white/5 text-white"
                onClick={handleResend}
                disabled={resending || secondsUntilResend > 0}
              >
                {resending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending new OTP...
                  </>
                ) : (
                  'Resend OTP'
                )}
              </Button>
              <Button
                type="button"
                variant="link"
                className="text-muted-foreground hover:text-primary"
                onClick={handleCancel}
              >
                Cancel and sign out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminOtp;
