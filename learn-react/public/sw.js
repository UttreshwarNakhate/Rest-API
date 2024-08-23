/* eslint-disable no-restricted-globals */
let cachedData = "appV1";

// Store content in cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cachedData).then((cache) => {
      cache.addAll([
        // "/static/js/bundle.js",
        // "/static/js/main.chunk.js",
        // "/static/js/0.chunk.js",
        "/index.html",
        "/",
        "/about",
        "/profile",
        "/productsPage",
        "/products/:_id",
        "/cart",
      ]);
    })
  );
});

// Read content from cache
self.addEventListener("fetch", (event) => {
  if (event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
    event.waitUntil(
      self.registration.showNotification("Internet", {
        body: "internet not working",
      })
    );
  }
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((result) => {
        if (result) {
          return result;
        }
        // If URL is not cached then fetch from server
        let requestURL = event.request.clone();
        return fetch(requestURL);
      })
    );
  }
});
