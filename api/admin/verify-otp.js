import {
  MAX_FAILED_ATTEMPTS,
  assertMethod,
  buildOtpCookiePayload,
  getAuthenticatedAdmin,
  getOtpState,
  hashOtp,
  json,
  setOtpCookie,
  setSessionCookie,
} from "../_lib/admin-otp.js";

export default async function handler(req, res) {
  if (!assertMethod(req, res, "POST")) {
    return;
  }

  try {
    const user = await getAuthenticatedAdmin(req);
    const otp = String(req.body?.otp || "").trim();
    if (!/^\d{6}$/.test(otp)) {
      json(res, 400, { error: "A valid 6-digit OTP is required." });
      return;
    }

    const state = getOtpState(req);
    const now = Date.now();
    if (!state || state.uid !== user.uid || state.email !== user.email) {
      json(res, 400, { error: "No active OTP session found." });
      return;
    }

    if (state.authTime !== user.authTime) {
      json(res, 400, { error: "This OTP belongs to a different login session." });
      return;
    }

    if (state.expiresAt <= now) {
      json(res, 400, { error: "OTP expired. Request a new code." });
      return;
    }

    if (state.failedAttempts >= MAX_FAILED_ATTEMPTS) {
      json(res, 429, { error: "Maximum OTP attempts exceeded. Request a new code." });
      return;
    }

    const otpHash = hashOtp(user.uid, user.email, otp);
    if (otpHash !== state.otpHash) {
      const nextFailedAttempts = Number(state.failedAttempts || 0) + 1;
      const replacementPayload = {
        ...state,
        failedAttempts: nextFailedAttempts,
      };
      setOtpCookie(res, replacementPayload);
      json(res, 400, { error: "Invalid OTP." });
      return;
    }

    setSessionCookie(res, user, now);
    json(res, 200, { verified: true });
  } catch (error) {
    console.error("verify-otp error:", error);
    json(res, 400, {
      error: error instanceof Error ? error.message : "Unable to verify OTP.",
    });
  }
}
