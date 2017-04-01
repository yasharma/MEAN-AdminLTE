var CACHE_NAME = 'meanadminlte-cache-v7';
var urlsToCache = [
	'offline.html',
	'https://fonts.googleapis.com/icon?family=Material+Icons',
	'/index.html',
	'/admin.html',
	'/User/partials/header.html',
	'/User/home/views/home.html',
	'/Admin/partials/admin.header.html',
	'/Admin/partials/admin.sidebar.html',
	'/Admin/partials/admin.footer.html',
	'/css/style.css',
	'/css/site.min.css',
	'/css/landing-page.css',
	'/css/admin-site.min.css',
	'/css/admin-style.css',
	'/js/site.min.js',
	'/js/app.min.js',
	'/js/admin-site.min.js',
	'/js/admin.app.min.js',
	'/images/ipad.png',
	'/images/dog.png',
	'/images/phones.png',
	'/images/intro-bg.jpg',
	'/images/banner-bg.jpg'
];
const OFFLINE_URL = 'offline.html';

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
    	caches.open(CACHE_NAME)
    	.then(function(cache) {
    		console.log('Opened cache');
    		return cache.addAll(urlsToCache);
    	})
    );
});
self.addEventListener('fetch', function(event) {
	if (event.request.method !== 'GET') {
    /* If we don't block the event as shown below, then the request will go to
       the network as usual.
       */
       console.log('WORKER: fetch event ignored.', event.request.method, event.request.url);
       return;
   }
   event.respondWith(fromNetwork(event.request, 400).catch(function(){
   	return fromCache(event.request);
   }));
});

function fromNetwork(request, timeout) {
	return new Promise(function (fulfill, reject) {
		var timeoutId = setTimeout(reject, timeout);
		fetch(request).then(function (response) {
			clearTimeout(timeoutId);
			fulfill(response);
		}, reject);
	});
}

function fromCache(request) {
	return caches.open(CACHE_NAME).then(function (cache) {
		return cache.match(request).then(function (matching) {
			return matching || caches.match(OFFLINE_URL) || Promise.reject('no-match');
		});
	});
}

self.addEventListener('activate', function(event) {

	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName) {
					if (CACHE_NAME.indexOf(cacheName) === -1) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});