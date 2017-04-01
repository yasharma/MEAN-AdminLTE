'use strict';

/* Application level configuration file */
angular.module('app.config', ['LocalStorageModule'])
.config(['$mdThemingProvider', function($mdThemingProvider){
	$mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('blue');

    $mdThemingProvider.enableBrowserColor({
      theme: 'blue', // Default is 'default'
      palette: 'blue', // Default is 'primary', any basic material palette and extended palettes are available
      hue: '800' // Default is '800'
    });
    
}])
.config(['localStorageServiceProvider',function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('front');
}])
.run(['$location','$rootScope', 'localStorageService','$window', 
	function($location, $rootScope, localStorageService, $window){
        // function body
		function onUpdateReady() {
		  console.log('found new version!');
		  $window.applicationCache.update();
		}
		$window.applicationCache.addEventListener('updateready', onUpdateReady);
		if($window.applicationCache.status === $window.applicationCache.UPDATEREADY) {
		  onUpdateReady();
		}    

		if ('serviceWorker' in navigator) {
		    
		    $window.addEventListener('load', function() {
		        navigator.serviceWorker.register('/sw.js').then(function(registration) {
		            // Registration was successful
		            console.log('ServiceWorker registration successful with scope: ', registration.scope);
		            
		        }).catch(function(err) {
		            // registration failed :(
		            console.log('ServiceWorker registration failed: ', err);
		        });
		    });
		}    
	}
]);