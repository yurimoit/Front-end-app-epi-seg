const cacheName = 'my-pwa-cache-v1';
const filesToCache = [
    '/',
    '/index.html',
    '/path/to/other/assets',
    // Adicione todos os arquivos que você deseja armazenar em cache
];

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(filesToCache);
        })
    );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
