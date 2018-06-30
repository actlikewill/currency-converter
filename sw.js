self.addEventListener('install', function(event){    
   console.log("new Install");
   event.waitUntil(
    caches.open('currency-converter-static-v3').then(function(cache) {
        return cache.addAll(
            [
                '/',
                'css/bootstrap.min.css',
                'css/style.css',
                'js/app.js',
                'js/bootstrap.min.js',
                'js/jquery.min.js',
                'js/popper.min.js',
                'https://free.currencyconverterapi.com/api/v5/currencies'
            ]
        );
    })
);
});

self.addEventListener('fetch', function(event){    
    console.log("Fetch Event");
    var requestUrl = new URL(event.request.url);

    if (requestUrl.origin === location.origin) {
        if (requestUrl.pathname === '/') {
            event.respondWith(caches.match('/'));
            return;

        }
    }
    event.respondWith(
        caches.match(event.request).then(function(response) {
          if (response) return response;
          return fetch(event.request);        
        })        
      );
 });


