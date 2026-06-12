self.addEventListener("install", e=>{
  e.waitUntil(
    caches.open("news").then(c=>{
      return c.addAll([
        "index.html",
        "news.html",
        "style.css",
        "script.js",
        "news.json"
      ]);
    })
  );
});

self.addEventListener("fetch", e=>{
  e.respondWith(
    caches.match(e.request).then(r=>r || fetch(e.request))
  );
});