import { Timestamp } from "firebase-admin/firestore";
import { assertMethod, json } from "../_lib/admin-otp.js";
import { getAdminDatabase, requireVerifiedAdmin } from "../_lib/firebase-admin.js";

const collections = new Set([
  "courses", "services", "certificates", "reviews", "banners", "clients", "contacts",
]);

export default async function handler(req, res) {
  if (!assertMethod(req, res, "POST")) return;
  try {
    await requireVerifiedAdmin(req);
  } catch (error) {
    json(res, 403, { error: error.message, code: "permission-denied" });
    return;
  }

  const { action, collection, id, data } = req.body || {};
  if (!collections.has(collection) || !["create", "update", "delete"].includes(action)) {
    json(res, 400, { error: "Invalid content operation." });
    return;
  }
  if (action !== "create" && (typeof id !== "string" || !id || id.includes("/"))) {
    json(res, 400, { error: "Invalid content ID." });
    return;
  }
  if (action !== "delete" && (!data || typeof data !== "object" || Array.isArray(data))) {
    json(res, 400, { error: "Invalid content data." });
    return;
  }

  try {
    const ref = getAdminDatabase().collection(collection);
    if (action === "delete") {
      await ref.doc(id).delete();
      json(res, 200, { id });
      return;
    }
    const timestamp = Timestamp.now();
    const document = { ...data, updatedAt: timestamp };
    // Document identity comes from Firestore, never from editable content.
    delete document.id;
    delete document.createdAt;
    if (action === "create") {
      const created = await ref.add({ ...document, createdAt: timestamp });
      json(res, 200, { id: created.id });
    } else {
      await ref.doc(id).update(document);
      json(res, 200, { id });
    }
  } catch (error) {
    console.error("Content write failed:", error);
    const missing = error.code === 5;
    json(res, missing ? 404 : 500, {
      error: missing ? "This content no longer exists. Refresh the page." : "Unable to save content. Please try again.",
    });
  }
}
