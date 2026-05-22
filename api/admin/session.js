import {
  SESSION_TTL_MS,
  assertMethod,
  getSessionState,
  json,
  verifyFirebaseUser,
} from "../_lib/admin-otp.js";

export default async function handler(req, res) {
  if (!assertMethod(req, res, "GET")) {
    return;
  }

  try {
    const header = req.headers.authorization || "";
    if (!header.startsWith("Bearer ")) {
      json(res, 200, { verified: false });
      return;
    }

    const user = await verifyFirebaseUser(header.slice(7));
    const state = getSessionState(req);
    const now = Date.now();

    if (
      !state ||
      state.uid !== user.uid ||
      state.email !== user.email ||
      state.expiresAt <= now
    ) {
      json(res, 200, { verified: false });
      return;
    }

    json(res, 200, {
      verified: true,
      expiresAt: state.expiresAt,
      maxAgeMs: SESSION_TTL_MS,
    });
  } catch (error) {
    console.error("session error:", error);
    json(res, 200, { verified: false });
  }
}
