/**
 * NEXOVIAN Service Worker - Offline Cache
 * Grade 4 to University in 11 South African Languages
 */

const CACHE_NAME = 'nexovian-cache-v4';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.svg',
  '/favicon.ico',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Pre-cache error (non-fatal):', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Do not intercept non-GET requests, API requests, Vite dev bundles, node_modules, or versioned queries
  if (
    request.method !== 'GET' ||
    url.pathname.includes('/api/') ||
    url.pathname.includes('/node_modules/') ||
    url.pathname.includes('/@vite/') ||
    url.pathname.includes('/@fs/') ||
    url.pathname.includes('/@id/') ||
    url.pathname.includes('/src/') ||
    url.search.includes('v=') ||
    url.pathname.includes('hot-update')
  ) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and request is HTML navigation, fallback to root or cached response
          if (request.mode === 'navigate') {
            return caches.match('/') || caches.match('/index.html');
          }
        });

      return cachedResponse || fetchPromise;
    })
  );
});
