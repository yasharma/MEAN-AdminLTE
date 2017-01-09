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
.run(['$location','$rootScope', 'localStorageService', 
	function($location, $rootScope, localStorageService){
        // function body
}]);