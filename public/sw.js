// Service Worker for caching Firebase and other resources
const CACHE_NAME = 'orange-hub-v1';
const FIREBASE_CACHE = 'firebase-cache-v1';

// Resources to cache immediately
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
];

// Firebase domains to cache with long lifetime
const FIREBASE_DOMAINS = [
  'firebaseapp.com',
  'firebase.googleapis.com',
  'www.googleapis.com',
  'firestore.googleapis.com',
];

// Install event - cache static resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_CACHE_URLS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== FIREBASE_CACHE)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - implement caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // IMPORTANT: Only cache GET requests (POST/PUT/DELETE can't be cached)
  if (request.method !== 'GET') {
    // Let POST/PUT/DELETE requests pass through to network
    event.respondWith(fetch(request));
    return;
  }

  // Check if it's a Firebase resource
  const isFirebaseResource = FIREBASE_DOMAINS.some(domain => url.hostname.includes(domain));

  if (isFirebaseResource) {
    // Cache-first strategy for Firebase resources with long lifetime
    event.respondWith(
      caches.open(FIREBASE_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            // Return cached response and update in background
            const fetchPromise = fetch(request).then((networkResponse) => {
              // Only cache successful GET responses
              if (networkResponse && networkResponse.status === 200 && request.method === 'GET') {
                cache.put(request, networkResponse.clone());
              }
              return networkResponse;
            }).catch(() => cachedResponse); // Return cached on network failure

            return cachedResponse;
          }

          // Not in cache, fetch from network
          return fetch(request).then((networkResponse) => {
            // Cache successful GET responses for 1 year (max-age)
            if (networkResponse && networkResponse.status === 200 && request.method === 'GET') {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
  } else if (request.destination === 'script' || request.destination === 'style') {
    // Cache-first for JS and CSS files
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
  } else {
    // Network-first for other resources
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match(request);
      })
    );
  }
});
