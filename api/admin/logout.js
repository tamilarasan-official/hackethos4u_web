import {
  assertMethod,
  clearAuthCookies,
  json,
} from "../_lib/admin-otp.js";

export default async function handler(req, res) {
  if (!assertMethod(req, res, "POST")) {
    return;
  }

  clearAuthCookies(res);
  json(res, 200, { ok: true });
}
