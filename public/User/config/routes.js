'use strict';

/* Application routes */
angular.module('app.routes', ['ngRoute','angular-loading-bar'])
.config(['$routeProvider', 'cfpLoadingBarProvider','$locationProvider',function($routeProvider, cfpLoadingBarProvider,$locationProvider){
	cfpLoadingBarProvider.includeSpinner = false;
	$routeProvider
	.when('/', {
		controller: 'homeCtrl',
		templateUrl: 'User/home/views/home.html'
	})
	.otherwise({
		redirectTo: '/'
	});
}]);