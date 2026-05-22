import {
  assertMethod,
  buildOtpCookiePayload,
  json,
  maskEmail,
  sendOtpEmail,
  setOtpCookie,
  verifyPasswordLogin,
} from "../_lib/admin-otp.js";

export default async function handler(req, res) {
  if (!assertMethod(req, res, "POST")) {
    return;
  }

  try {
    const email = String(req.body?.email || "");
    const password = String(req.body?.password || "");
    const user = await verifyPasswordLogin(email, password);
    const otp = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
    const now = Date.now();
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
    console.error("start-otp error:", error);
    json(res, 400, {
      error: error instanceof Error ? error.message : "Unable to send OTP.",
    });
  }
}
