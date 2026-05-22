import {
  assertMethod,
  buildOtpCookiePayload,
  getAuthenticatedAdmin,
  getOtpState,
  json,
  maskEmail,
  sendOtpEmail,
  setOtpCookie,
} from "../_lib/admin-otp.js";

export default async function handler(req, res) {
  if (!assertMethod(req, res, "POST")) {
    return;
  }

  try {
    const user = await getAuthenticatedAdmin(req);
    const now = Date.now();
    const currentState = getOtpState(req);

    if (currentState && currentState.uid === user.uid && currentState.canResendAt > now) {
      json(res, 429, {
        error: "Please wait before requesting another OTP.",
      });
      return;
    }

    const otp = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
    const payload = buildOtpCookiePayload(user, otp, now);

    await sendOtpEmail(user.email, otp);
    setOtpCookie(res, payload);

    json(res, 200, {
      email: user.email,
      maskedEmail: maskEmail(user.email),
      expiresAt: payload.expiresAt,
      canResendAt: payload.canResendAt,
    });
  } catch (error) {
    console.error("resend-otp error:", error);
    json(res, 400, {
      error: error instanceof Error ? error.message : "Unable to resend OTP.",
    });
  }
}
