import {
  SESSION_TTL_MS,
  assertMethod,
  json,
} from "../_lib/admin-otp.js";
import { requireVerifiedAdmin } from "../_lib/firebase-admin.js";

export default async function handler(req, res) {
  if (!assertMethod(req, res, "GET")) {
    return;
  }

  try {
    const state = await requireVerifiedAdmin(req);

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
