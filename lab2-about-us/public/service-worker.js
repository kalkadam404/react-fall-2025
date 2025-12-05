const APP_SHELL_CACHE = "app-shell-v1";
const RUNTIME_CACHE = "runtime-cache-v1";
const API_CACHE = "api-cache-v1";

const APP_SHELL_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/vite.svg",
  "/arrow_next.svg",
  "/arrow3.svg",
  "/bg.png",
  "/f_white.svg",
  "/insta_white.svg",
  "/point3.svg",
  "/poster1.svg",
  "/twit_white.svg",
  "/vk_white.svg",
  "/yes.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(APP_SHELL_CACHE);
      await cache.addAll(APP_SHELL_ASSETS);
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => {
          if (
            ![APP_SHELL_CACHE, RUNTIME_CACHE, API_CACHE].includes(cacheName)
          ) {
            return caches.delete(cacheName);
          }
          return undefined;
        })
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestURL = new URL(event.request.url);

  if (event.request.mode === "navigate") {
    event.respondWith(handleNavigationRequest(event.request));
    return;
  }

  if (requestURL.origin === self.location.origin) {
    const assetDestinations = ["style", "script", "image", "font"];
    if (assetDestinations.includes(event.request.destination)) {
      event.respondWith(cacheFirst(event.request, RUNTIME_CACHE));
      return;
    }
  }

  if (requestURL.origin === "https://api.themoviedb.org") {
    event.respondWith(networkFirstApi(event.request));
  }
});

async function handleNavigationRequest(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(APP_SHELL_CACHE);
    cache.put("/index.html", response.clone());
    return response;
  } catch (error) {
    const cached = await caches.match("/index.html");
    if (cached) {
      return cached;
    }

    return new Response("Offline", {
      status: 503,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    if (cached) {
      return cached;
    }
    return new Response("Offline", {
      status: 503,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

async function networkFirstApi(request) {
  const cache = await caches.open(API_CACHE);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }

    return new Response(
      JSON.stringify({
        message: "Offline. Cached data unavailable.",
        ok: false,
        results: [],
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
