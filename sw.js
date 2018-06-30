self.addEventListener('install', function(event){    
   console.log("new Install");
   event.waitUntil(
    caches.open('currency-converter-static-v1').then(function(cache) {
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
    event.respondWith(
        caches.match(event.request).then(function(response) {
          if (response) return response;
          return fetch(event.request);        
        })        
      );
 });


