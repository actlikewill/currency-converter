self.addEventListener('install', function(event) {
    var urlsToCache = 
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
    console.log(event.request);
    event.respondWith(
      fetch(event.request).then(function (response) {
        if (response.status === 404) {
            return new Response('A really Cool 404 Page  - Not Found Here');
        }
        return response;
      }).catch(function() {
          return new Response('You are offline');
      })        
    );
});

