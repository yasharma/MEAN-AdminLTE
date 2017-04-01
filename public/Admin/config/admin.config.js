'use strict';

/* Application level configuration file */
angular.module('app.config', ['LocalStorageModule'])
/*Angular interceptors are service factories that are registered with the $httpProvider */
.config(['$httpProvider', function($httpProvider){
	var interceptor = ['$q', 'localStorageService', 'AuthSrv', '$location','$rootScope', function ($q, localStorageService, AuthSrv, $location,$rootScope) {

		/* Get the application storage type default (localstorage) */
		return {
			request: function (config) {
				config.headers = config.headers || {};
				var token = localStorageService.get('token');

				if (token) {
					config.headers.Authorization = 'Bearer '+ token;
					AuthSrv.isLogged = 1;
				}
				return config;
			},

			requestError: function (rejection) {
				return $q.reject(rejection);
			},

			response: function (response) {
				return response || $q.when(response);
			},

            // Revoke client authentication if 400 is received
            responseError: function (rejection) {
            	if(rejection.status === 401 && rejection.data.errors.code !== undefined){
            		$rootScope.$broadcast( 'TokenExpiredError', { message: 'Session has been expired, please login again.' } );
            		localStorageService.remove('token');
            		localStorageService.remove('admin');
            		delete $rootScope.admin;
            		AuthSrv.isLogged = false;
            		$location.path("/");
            	}
            	return $q.reject(rejection);
            }
        };
    }];

    $httpProvider.interceptors.push(interceptor);
}])
.config(['$mdThemingProvider', function($mdThemingProvider){
	$mdThemingProvider.theme('default')
	.primaryPalette('deep-purple')
	.accentPalette('deep-purple');

	$mdThemingProvider.enableBrowserColor({
      theme: 'blue', // Default is 'default'
      palette: 'blue', // Default is 'primary', any basic material palette and extended palettes are available
      hue: '800' // Default is '800'
  });

}])
.config(['localStorageServiceProvider',function(localStorageServiceProvider){
	localStorageServiceProvider.setPrefix('admin');
}])
.run(['$location','$rootScope', '$window','localStorageService', 'AuthSrv','toastService',
	function($location, $rootScope, $window,localStorageService, AuthSrv, toastService){
        // App Cache
        function onUpdateReady() {
          console.log('found new version!');
          $window.applicationCache.update();
        }
        $window.applicationCache.addEventListener('updateready', onUpdateReady);
        if($window.applicationCache.status === $window.applicationCache.UPDATEREADY) {
          onUpdateReady();
        }    
        // Service workers
        if ('serviceWorker' in navigator) {
            
            $window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    // Registration was successful
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    registration.update();
                }).catch(function(err) {
                    // registration failed :(
                    console.log('ServiceWorker registration failed: ', err);
                });
            });
        } 

    	$rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {    
    		if ( nextRoute !== null && nextRoute.access !== undefined && nextRoute.access.requiredLogin && !AuthSrv.isLogged && !localStorageService.get('admin')) {
    		    console.log('inside if');
                AuthSrv.isLogged = 0;
    		    $location.path("/");
    		}else {
                console.log('inside else');
                var token = localStorageService.get('token');
                if($location.path() === '/' && token ){
                    $location.path("/dashboard");
                }
            }
    	});
    	
    	
    	/* This will logout the user from the application */
    	$rootScope.clearToken = function () {
            localStorageService.remove('token');
            localStorageService.remove('admin');
            delete $rootScope.admin;
            AuthSrv.isLogged = false;
            $location.path('/login');
        };

        $rootScope.$on( 'TokenExpiredError', function( event, eventData ) {
           toastService.alert( {message: eventData.message , class: 'error'});
        });
        
        /* Set user for entire application */
    	$rootScope.admin = localStorageService.get('admin');
	}
]);