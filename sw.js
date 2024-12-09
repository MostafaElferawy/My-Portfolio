
// var cacheName = 'career';
const staticDevCoffee = "career"

const assets = [
 '/',
  'career.html',
  'sw.js',
  'manifest.json',
  'style.css',
  'img/offline-img.png', 
]

// var filesToCache = [
//   '/',
//   'career.html',
//   'sw.js',
//   'manifest.json',
//   // 'favicon.png',
//   // 'page2.html',
//   'styles.css',
//   'img/offline-img.png', 
// ];

if ('serviceWorker' in navigator) {
  console.log("test")
  navigator.serviceWorker.register('sw.js');
}

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets)
    })
  )
})


// self.addEventListener('install', function(event) {
//   event.waitUntil(
//     caches.open(cacheName).then(function(cache) {
//       console.log(cache)
//       return cache.addAll(filesToCache);
//     })
//   )
// });

// self.addEventListener('activate', function (event) {
//   // console.log('sw: service worker ready and activated', event);
// });

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(function (err) {
      return caches.match('img/offline-img.png');
    })
  )
});




