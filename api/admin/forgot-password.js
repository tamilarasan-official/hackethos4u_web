import {
  assertMethod,
  getAdminEmails,
  json,
  normalizeEmail,
  sendPasswordResetEmail,
} from "../_lib/admin-otp.js";

function getContinueUrl(req) {
  const configured = process.env.ADMIN_PASSWORD_RESET_CONTINUE_URL || "";
  if (configured) {
    return configured;
  }

  const host = req.headers["x-forwarded-host"] || req.headers.host;
  if (!host) {
    return "";
  }

  const proto = req.headers["x-forwarded-proto"] || "https";
  return `${proto}://${host}/admin-access`;
}

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

    await sendPasswordResetEmail(email, getContinueUrl(req));
    json(res, 200, successPayload);
  } catch (error) {
    console.error("forgot-password error:", error);
    json(res, 400, {
      error: error instanceof Error ? error.message : "Unable to send password reset link.",
    });
  }
}
