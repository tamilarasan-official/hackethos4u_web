# Admin OTP and course updates

The website Firestore rules require both `users/{uid}.role == "admin"` and
`adminTwoFactorVerifiedAt >= auth_time * 1000` in the Firebase ID token.
A website session cookie alone does not authorize course updates.

The login flow signs in to Firebase, sends that ID token with the OTP, and verifies
that the token and OTP challenge belong to the same allowed admin. The signed
session cookie is bound to that account and Firebase authentication time.
Existing cookies without that binding must sign in again.

Admin membership comes from the existing server `ADMIN_OTP_EMAILS` allowlist.
No `users` collection or Firestore `role` field is required for website login
or server content writes.

Admin create/update/delete operations use `/api/admin/content`. The server checks
the ID token (including revocation), server email allowlist, and
matching unexpired OTP cookie on every write. Only CMS collections are allowed;
the endpoint cannot change user roles or arbitrary Firestore paths. The server
sets timestamps and writes through the Admin SDK. Public contact submissions
keep their existing direct Firestore path, and realtime content reads stay intact.

No Firebase rules or user custom claims are changed. In particular, OTP does not
grant other password-only sessions for the same account database write access.

## Local configuration

Use server-only credentials for **the website Firebase project** configured by
`VITE_FIREBASE_PROJECT_ID` (`hackthous4u-website`), not the separate mobile app
project. Set `FIREBASE_CLIENT_EMAIL` and `FIREBASE_PRIVATE_KEY`, or use Application
Default Credentials with `GOOGLE_APPLICATION_CREDENTIALS`. Never prefix private
credentials with `VITE_`, commit them, or include them in client bundles.

The server identity needs permission to read Firebase Authentication users and
read/write Firestore CMS documents. Configure the OTP allowlist, signing
secret, and SMTP settings listed in `.env.example` as server environment values.
This change does not provision roles, credentials, or deploy any rules.

`npm run dev` now serves the existing Vercel API handlers locally as well as the
frontend. Set server values in your ignored `.env.local` and restart after API or
environment changes. Production still uses Vercel's API routes. Use a test project
for manual testing that must not send real OTP emails or affect production data.

## Isolated regression tests

With Firebase CLI and Java 21 available, run `npm run test:admin`. It starts local
Auth and Firestore emulators with a `demo-` project and a rules fixture matching
the active CMS authorization condition. No SMTP, production credentials, or
production writes are needed. The suite refuses to run without the expected
loopback emulator endpoints.

The test reproduces the denied direct course update and confirms that the server
endpoint saves it with a verified session. It also covers a second password-only
session, OTP retry, missing/invalid tokens, mismatched accounts, unlisted emails,
expired/exhausted challenges, expired/wrong-session cookies, preservation of
existing claims, removal from the allowlist, content CRUD, server timestamps,
collection/path validation, and missing documents.

Firebase references: [custom claims](https://firebase.google.com/docs/auth/admin/custom-claims)
and [server credentials](https://firebase.google.com/docs/admin/setup).
