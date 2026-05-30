import {
  assertMethod,
  getAdminEmails,
  json,
  normalizeEmail,
  sendPasswordResetEmail,
} from "../_lib/admin-otp.js";

export default async function handler(req, res) {
  if (!assertMethod(req, res, "POST")) {
    return;
  }

  const successPayload = {
    sent: true,
    message: "If this admin email exists, a password reset link has been sent.",
  };

  try {
    const email = normalizeEmail(req.body?.email);
    if (!email) {
      json(res, 400, { error: "Admin email is required." });
      return;
    }

    const allowedEmails = getAdminEmails();
    if (!allowedEmails.includes(email)) {
      json(res, 200, successPayload);
      return;
    }

    await sendPasswordResetEmail(email, process.env.ADMIN_PASSWORD_RESET_CONTINUE_URL || "");
    json(res, 200, successPayload);
  } catch (error) {
    console.error("forgot-password error:", error);
    json(res, 400, {
      error: error instanceof Error ? error.message : "Unable to send password reset link.",
    });
  }
}
