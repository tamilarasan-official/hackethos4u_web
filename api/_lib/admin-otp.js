import crypto from "node:crypto";
import nodemailer from "nodemailer";

const ADMIN_OTP_COOKIE = "hackethos_admin_otp";
const ADMIN_SESSION_COOKIE = "hackethos_admin_session";
const OTP_LENGTH = 6;
const OTP_TTL_MS = 60 * 1000;
const RESEND_COOLDOWN_MS = 60 * 1000;
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 5;

function getEnv(name) {
  return process.env[name] || "";
}

function getOtpSecret() {
  return getEnv("OTP_SECRET");
}

function getAdminEmails() {
  return getEnv("ADMIN_OTP_EMAILS")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function json(res, status, payload) {
  res.status(status).setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

function assertMethod(req, res, method) {
  if (req.method !== method) {
    json(res, 405, { error: "Method not allowed." });
    return false;
  }

  return true;
}

function parseCookies(req) {
  const header = req.headers.cookie || "";
  const cookies = {};

  for (const pair of header.split(";")) {
    const [rawName, ...rest] = pair.trim().split("=");
    if (!rawName) {
      continue;
    }

    cookies[rawName] = decodeURIComponent(rest.join("="));
  }

  return cookies;
}

function createCookie(name, value, maxAgeSeconds) {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    `Max-Age=${maxAgeSeconds}`,
  ];

  return parts.join("; ");
}

function clearCookie(name) {
  return `${name}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

function signPayload(payload) {
  const secret = getOtpSecret();
  if (!secret) {
    throw new Error("OTP_SECRET is not configured.");
  }

  const serialized = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", secret)
    .update(serialized)
    .digest("base64url");

  return `${serialized}.${signature}`;
}

function verifySignedPayload(value) {
  if (!value || !value.includes(".")) {
    return null;
  }

  const secret = getOtpSecret();
  if (!secret) {
    throw new Error("OTP_SECRET is not configured.");
  }

  const [serialized, signature] = value.split(".");
  const expected = crypto
    .createHmac("sha256", secret)
    .update(serialized)
    .digest("base64url");

  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (
    actualBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(serialized, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

function generateOtp() {
  return crypto.randomInt(0, 10 ** OTP_LENGTH).toString().padStart(OTP_LENGTH, "0");
}

function hashOtp(uid, email, otp) {
  return crypto
    .createHash("sha256")
    .update(`${uid}:${email}:${otp}:${getOtpSecret()}`)
    .digest("hex");
}

function maskEmail(email) {
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) {
    return email;
  }

  const maskedLocal =
    localPart.length <= 2
      ? `${localPart[0]}*`
      : `${localPart.slice(0, 2)}${"*".repeat(Math.max(1, localPart.length - 2))}`;

  return `${maskedLocal}@${domain}`;
}

async function verifyFirebaseUser(idToken) {
  const apiKey = getEnv("VITE_FIREBASE_API_KEY");
  if (!apiKey) {
    throw new Error("VITE_FIREBASE_API_KEY is not configured.");
  }

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    },
  );

  const data = await response.json();
  if (!response.ok || !Array.isArray(data.users) || data.users.length === 0) {
    throw new Error("Unable to validate Firebase session.");
  }

  const user = data.users[0];
  return {
    uid: user.localId,
    email: String(user.email || "").toLowerCase(),
  };
}

async function verifyPasswordLogin(email, password) {
  const apiKey = getEnv("VITE_FIREBASE_API_KEY");
  if (!apiKey) {
    throw new Error("VITE_FIREBASE_API_KEY is not configured.");
  }

  const normalizedEmail = normalizeEmail(email);
  const normalizedPassword = String(password || "");
  if (!normalizedEmail || !normalizedPassword) {
    throw new Error("Email and password are required.");
  }

  const allowedEmails = getAdminEmails();
  if (!allowedEmails.includes(normalizedEmail)) {
    throw new Error("This account is not allowed to access the admin panel.");
  }

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: normalizedEmail,
        password: normalizedPassword,
        returnSecureToken: true,
      }),
    },
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error("Invalid email or password.");
  }

  return {
    uid: String(data.localId || ""),
    email: normalizeEmail(data.email),
  };
}

function getBearerToken(req) {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Bearer ")) {
    return "";
  }

  return header.slice(7);
}

async function getAuthenticatedAdmin(req) {
  const idToken = getBearerToken(req);
  if (!idToken) {
    throw new Error("Missing authorization token.");
  }

  const user = await verifyFirebaseUser(idToken);
  const allowedEmails = getAdminEmails();
  if (!user.email || !allowedEmails.includes(user.email)) {
    throw new Error("This email is not allowed for admin OTP.");
  }

  return user;
}

let transporterPromise = null;

async function getTransporter() {
  if (transporterPromise) {
    return transporterPromise;
  }

  const host = getEnv("SMTP_HOST");
  const port = Number(getEnv("SMTP_PORT") || 465);
  const user = getEnv("SMTP_USER");
  const pass = getEnv("SMTP_PASS");

  if (!host || !user || !pass) {
    throw new Error("SMTP environment variables are incomplete.");
  }

  transporterPromise = Promise.resolve(
    nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    }),
  );

  return transporterPromise;
}

async function sendOtpEmail(email, otp) {
  const transporter = await getTransporter();
  const from = getEnv("SMTP_FROM") || getEnv("SMTP_USER");
  if (!from) {
    throw new Error("SMTP_FROM is not configured.");
  }

  await transporter.sendMail({
    from,
    to: email,
    subject: "Hackethos4u Admin Login OTP",
    text: `Your Hackethos4u admin login OTP is ${otp}. It expires in 1 minute.`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2>Hackethos4u Admin Login OTP</h2>
        <p>Your one-time password is:</p>
        <p style="font-size: 28px; font-weight: 700; letter-spacing: 6px;">${otp}</p>
        <p>This code expires in 1 minute.</p>
        <p>If you did not attempt to sign in, change your password immediately.</p>
      </div>
    `,
  });
}

function buildOtpCookiePayload(user, otp, now, failedAttempts = 0) {
  return {
    uid: user.uid,
    email: user.email,
    otpHash: hashOtp(user.uid, user.email, otp),
    expiresAt: now + OTP_TTL_MS,
    canResendAt: now + RESEND_COOLDOWN_MS,
    failedAttempts,
  };
}

function setOtpCookie(res, payload) {
  const signed = signPayload(payload);
  res.setHeader("Set-Cookie", [
    createCookie(ADMIN_OTP_COOKIE, signed, Math.ceil(OTP_TTL_MS / 1000)),
    clearCookie(ADMIN_SESSION_COOKIE),
  ]);
}

function setSessionCookie(res, user, now) {
  const payload = {
    uid: user.uid,
    email: user.email,
    verifiedAt: now,
    expiresAt: now + SESSION_TTL_MS,
  };

  res.setHeader("Set-Cookie", [
    createCookie(
      ADMIN_SESSION_COOKIE,
      signPayload(payload),
      Math.ceil(SESSION_TTL_MS / 1000),
    ),
    clearCookie(ADMIN_OTP_COOKIE),
  ]);
}

function getOtpState(req) {
  const cookies = parseCookies(req);
  const payload = verifySignedPayload(cookies[ADMIN_OTP_COOKIE]);
  if (!payload) {
    return null;
  }

  return payload;
}

function getPendingOtpAdmin(req) {
  const payload = getOtpState(req);
  if (!payload?.uid || !payload?.email) {
    return null;
  }

  return {
    uid: String(payload.uid),
    email: normalizeEmail(payload.email),
  };
}

function getSessionState(req) {
  const cookies = parseCookies(req);
  const payload = verifySignedPayload(cookies[ADMIN_SESSION_COOKIE]);
  if (!payload) {
    return null;
  }

  return payload;
}

function clearAuthCookies(res) {
  res.setHeader("Set-Cookie", [
    clearCookie(ADMIN_OTP_COOKIE),
    clearCookie(ADMIN_SESSION_COOKIE),
  ]);
}

export {
  ADMIN_SESSION_COOKIE,
  MAX_FAILED_ATTEMPTS,
  OTP_TTL_MS,
  RESEND_COOLDOWN_MS,
  SESSION_TTL_MS,
  assertMethod,
  buildOtpCookiePayload,
  clearAuthCookies,
  getAuthenticatedAdmin,
  getPendingOtpAdmin,
  getOtpState,
  getSessionState,
  hashOtp,
  json,
  maskEmail,
  normalizeEmail,
  sendOtpEmail,
  setOtpCookie,
  setSessionCookie,
  verifyFirebaseUser,
  verifyPasswordLogin,
};
