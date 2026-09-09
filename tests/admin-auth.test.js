import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { after, test } from "node:test";
import { initializeApp as initializeAdmin, deleteApp as deleteAdmin, getApps } from "firebase-admin/app";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, deleteApp } from "firebase/app";
import { connectAuthEmulator, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import verifyOtp from "../api/admin/verify-otp.js";
import session from "../api/admin/session.js";
import content from "../api/admin/content.js";
import { buildOtpCookiePayload, setOtpCookie, setSessionCookie } from "../api/_lib/admin-otp.js";

const projectId = "demo-hackethos-admin";
// Never allow this suite to use real Firebase services or credentials.
assert.equal(process.env.FIREBASE_AUTH_EMULATOR_HOST, "127.0.0.1:9098");
assert.equal(process.env.FIRESTORE_EMULATOR_HOST, "127.0.0.1:8185");
process.env.VITE_FIREBASE_PROJECT_ID = projectId;
process.env.OTP_SECRET = "local-regression-secret";
delete process.env.FIREBASE_CLIENT_EMAIL;
delete process.env.FIREBASE_PRIVATE_KEY;

const app = initializeAdmin({ projectId }, "regression-setup");
const adminAuth = getAdminAuth(app);
const db = getFirestore(app);
const clients = [];
after(async () => {
  await Promise.all(clients.map(deleteApp));
  await Promise.all(getApps().map(deleteAdmin));
});

function response() {
  return {
    statusCode: 200, headers: {},
    status(code) { this.statusCode = code; return this; },
    setHeader(name, value) { this.headers[name] = value; return this; },
    end(body) { this.body = JSON.parse(body); },
  };
}
function cookieHeader(res) {
  return res.headers["Set-Cookie"].map((cookie) => cookie.split(";")[0]).join("; ");
}
function challenge(user, now = Date.now(), failedAttempts = 0) {
  const res = response();
  setOtpCookie(res, buildOtpCookiePayload(user, "123456", now, failedAttempts));
  return cookieHeader(res);
}
async function account(role = "admin") {
  const uid = randomUUID();
  const email = `${uid}@example.test`;
  const password = "Emulator-only-password1!";
  await adminAuth.createUser({ uid, email, password });
  await db.collection("users").doc(uid).set({ role });
  process.env.ADMIN_OTP_EMAILS = [process.env.ADMIN_OTP_EMAILS, email].filter(Boolean).join(",");
  const client = initializeApp({ projectId, apiKey: "fake-api-key" }, uid);
  clients.push(client);
  const auth = getAuth(client);
  connectAuthEmulator(auth, "http://127.0.0.1:9098", { disableWarnings: true });
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return { uid, email, user };
}
async function verify(user, { cookie = challenge(user), token, otp = "123456" } = {}) {
  const res = response();
  await verifyOtp({ method: "POST", headers: {
    cookie, authorization: token === null ? "" : `Bearer ${token || await user.user.getIdToken()}`,
  }, body: { otp } }, res);
  return res;
}
async function checkSession(token, cookie) {
  const res = response();
  await session({ method: "GET", headers: { authorization: `Bearer ${token}`, cookie } }, res);
  return res.body.verified;
}
async function updateCourse(token, courseId) {
  return fetch(`http://127.0.0.1:8185/v1/projects/${projectId}/databases/(default)/documents/courses/${courseId}?updateMask.fieldPaths=title`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ fields: { title: { stringValue: "Updated course" } } }),
  });
}
async function writeContent(token, cookie, body) {
  const res = response();
  await content({ method: "POST", headers: { authorization: `Bearer ${token}`, cookie }, body }, res);
  return res;
}

test("admin content writes require a matching verified OTP session", async (t) => {
  await t.test("another password-only session cannot gain write access by refreshing", async () => {
    const user = await account();
    const otherApp = initializeApp({ projectId, apiKey: "fake-api-key" }, randomUUID());
    clients.push(otherApp);
    const otherAuth = getAuth(otherApp);
    connectAuthEmulator(otherAuth, "http://127.0.0.1:9098", { disableWarnings: true });
    const other = await signInWithEmailAndPassword(otherAuth, user.email, "Emulator-only-password1!");
    assert.equal((await verify(user)).statusCode, 200);
    assert.equal((await updateCourse(await other.user.getIdToken(true), randomUUID())).status, 403);
    assert.equal((await writeContent(await other.user.getIdToken(), "", {
      action: "create", collection: "courses", data: { title: "Unauthorized" },
    })).statusCode, 403);
  });
  await t.test("reproduces direct-write failure, then saves through the verified server session", async () => {
    const user = await account();
    await adminAuth.setCustomUserClaims(user.uid, { existingPermission: "preserved" });
    const oldToken = await user.user.getIdToken(true);
    const courseId = randomUUID();
    await db.collection("courses").doc(courseId).set({ title: "Original course" });
    assert.equal((await updateCourse(oldToken, courseId)).status, 403);
    const result = await verify(user);
    assert.equal(result.statusCode, 200, JSON.stringify(result.body));
    assert.equal((await updateCourse(oldToken, courseId)).status, 403);
    assert.equal(await checkSession(oldToken, cookieHeader(result)), true);
    const token = await user.user.getIdToken(true);
    const claims = await user.user.getIdTokenResult();
    assert.equal(claims.claims.existingPermission, "preserved");
    assert.equal(claims.claims.adminTwoFactorVerifiedAt, undefined);
    assert.equal(await checkSession(token, cookieHeader(result)), true);
    const saved = await writeContent(token, cookieHeader(result), {
      action: "update", collection: "courses", id: courseId,
      data: { title: "Updated course", pricing: { groupMax: 25000 }, demoVideoUrl: "" },
    });
    assert.equal(saved.statusCode, 200, JSON.stringify(saved.body));
    assert.equal((await db.collection("courses").doc(courseId).get()).data().title, "Updated course");
  });
  for (const [name, options] of [
    ["missing bearer", { token: null }],
    ["invalid bearer", { token: "invalid-token" }],
    ["incorrect OTP", { otp: "654321" }],
  ]) {
    await t.test(name, async () => {
      const user = await account();
      const result = await verify(user, options);
      assert.notEqual(result.statusCode, 200);
      assert.equal((await adminAuth.getUser(user.uid)).customClaims?.adminTwoFactorVerifiedAt, undefined);
    });
  }
  await t.test("mismatched identity cannot use another account's OTP", async () => {
    const owner = await account();
    const other = await account();
    const result = await verify(other, { cookie: challenge(owner) });
    assert.equal(result.statusCode, 403);
    assert.equal((await adminAuth.getUser(other.uid)).customClaims?.adminTwoFactorVerifiedAt, undefined);
  });
  await t.test("non-admin is denied even when email is on the OTP allowlist", async () => {
    const user = await account("user");
    const result = await verify(user);
    assert.notEqual(result.statusCode, 200);
    assert.equal((await adminAuth.getUser(user.uid)).customClaims?.adminTwoFactorVerifiedAt, undefined);
  });
  await t.test("expired or exhausted challenges cannot grant a claim", async () => {
    const user = await account();
    assert.equal((await verify(user, { cookie: challenge(user, Date.now() - 61000) })).statusCode, 400);
    assert.equal((await verify(user, { cookie: challenge(user, Date.now(), 5) })).statusCode, 429);
    assert.equal((await adminAuth.getUser(user.uid)).customClaims?.adminTwoFactorVerifiedAt, undefined);
  });
  await t.test("invalid OTP remains retryable with the updated challenge cookie", async () => {
    const user = await account();
    const failure = await verify(user, { otp: "654321" });
    assert.equal(failure.statusCode, 400);
    const success = await verify(user, { cookie: cookieHeader(failure) });
    assert.equal(success.statusCode, 200);
  });
  await t.test("expired cookie and cookie from another login are rejected", async () => {
    const user = await account();
    const verified = await verify(user);
    const token = await user.user.getIdToken(true);
    const { claims } = await user.user.getIdTokenResult();
    const wrongSession = response();
    setSessionCookie(wrongSession, { ...user, authTime: claims.auth_time - 1 }, Date.now());
    assert.equal(await checkSession(token, cookieHeader(wrongSession)), false);
    const expired = response();
    setSessionCookie(expired, { ...user, authTime: claims.auth_time }, Date.now() - 9 * 3600000);
    for (const cookie of [cookieHeader(wrongSession), cookieHeader(expired), ""]) {
      assert.equal(await checkSession(token, cookie), false);
      assert.equal((await writeContent(token, cookie, {
        action: "create", collection: "courses", data: { title: "Rejected" },
      })).statusCode, 403);
    }
  });
  await t.test("permission removal makes an existing verified session invalid", async () => {
    const user = await account();
    const verified = await verify(user);
    const token = await user.user.getIdToken(true);
    await db.collection("users").doc(user.uid).update({ role: "user" });
    assert.equal(await checkSession(token, cookieHeader(verified)), false);
    assert.equal((await updateCourse(token, randomUUID())).status, 403);
    assert.equal((await writeContent(token, cookieHeader(verified), {
      action: "create", collection: "courses", data: { title: "Rejected" },
    })).statusCode, 403);
  });
  await t.test("verified admins can create, edit, and delete content with server timestamps", async () => {
    const user = await account();
    const verified = await verify(user);
    const token = await user.user.getIdToken();
    const cookie = cookieHeader(verified);
    for (const collection of ["courses", "services", "certificates", "reviews", "banners", "clients", "contacts"]) {
      const created = await writeContent(token, cookie, { action: "create", collection, data: { title: "New", id: "spoofed" } });
      assert.equal(created.statusCode, 200);
      const id = created.body.id;
      const original = (await db.collection(collection).doc(id).get()).data();
      assert.equal(original.id, undefined);
      assert.ok(original.createdAt.toMillis());
      const changed = await writeContent(token, cookie, { action: "update", collection, id, data: { title: "Edited", createdAt: "spoofed" } });
      assert.equal(changed.statusCode, 200);
      const edited = (await db.collection(collection).doc(id).get()).data();
      assert.equal(edited.title, "Edited");
      assert.equal(edited.createdAt.toMillis(), original.createdAt.toMillis());
      assert.equal((await writeContent(token, cookie, { action: "delete", collection, id })).statusCode, 200);
      assert.equal((await db.collection(collection).doc(id).get()).exists, false);
    }
  });
  await t.test("content endpoint rejects privileged collections, invalid paths, data and missing documents", async () => {
    const user = await account();
    const verified = await verify(user);
    const token = await user.user.getIdToken();
    const cookie = cookieHeader(verified);
    for (const body of [
      { action: "update", collection: "users", id: user.uid, data: { role: "admin" } },
      { action: "delete", collection: "courses", id: "a/b/c" },
      { action: "update", collection: "courses", id: "a", data: [] },
      { action: "list", collection: "courses" },
    ]) assert.equal((await writeContent(token, cookie, body)).statusCode, 400);
    assert.equal((await writeContent(token, cookie, { action: "update", collection: "courses", id: randomUUID(), data: { title: "Missing" } })).statusCode, 404);
  });
});
