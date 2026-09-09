import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getAdminEmails, getSessionState, normalizeEmail } from "./admin-otp.js";

function getAdminApp() {
  const existing = getApps().find((app) => app.name === "website-admin");
  if (existing) return existing;

  const projectId = process.env.VITE_FIREBASE_PROJECT_ID;
  if (!projectId) throw new Error("VITE_FIREBASE_PROJECT_ID is not configured.");

  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (Boolean(clientEmail) !== Boolean(privateKey)) {
    throw new Error("Both FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY are required.");
  }

  return initializeApp({
    projectId,
    credential: clientEmail && privateKey
      ? cert({ projectId, clientEmail, privateKey: privateKey.replace(/\\n/g, "\n") })
      : applicationDefault(),
  }, "website-admin");
}

export async function getFirebaseAdminUser(req) {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Bearer ")) throw new Error("Missing authorization token.");

  const app = getAdminApp();
  const token = await getAuth(app).verifyIdToken(header.slice(7), true);
  const email = normalizeEmail(token.email);
  if (!email || !getAdminEmails().includes(email)) {
    throw new Error("This account is not allowed to access the admin panel.");
  }
  return { uid: token.uid, email, authTime: token.auth_time, token };
}

export function getAdminDatabase() {
  return getFirestore(getAdminApp());
}

export async function requireVerifiedAdmin(req) {
  const state = getSessionState(req);
  if (!state || !Number.isFinite(state.expiresAt) || state.expiresAt <= Date.now()) {
    throw new Error("Your admin session expired. Please sign in and verify OTP again.");
  }
  const user = await getFirebaseAdminUser(req);
  if (state.uid !== user.uid || state.email !== user.email ||
      !Number.isFinite(user.authTime) || state.authTime !== user.authTime) {
    throw new Error("OTP does not belong to this login. Please sign in again.");
  }
  return state;
}
