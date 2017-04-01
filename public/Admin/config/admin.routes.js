'use strict';

/* Application routes */
angular.module('app.routes', ['ngRoute','angular-loading-bar'])
.config(['$routeProvider', 'cfpLoadingBarProvider','$locationProvider',function($routeProvider, cfpLoadingBarProvider,$locationProvider){
	cfpLoadingBarProvider.includeSpinner = false;
	$routeProvider
	.when('/', {
		controller: 'authCtrl',
		controllerAs: 'vm',
		templateUrl: 'Admin/auth/views/login.html',
		access: { requiredLogin: false }
	})
	.when('/dashboard', {
		controller: 'dashboardCtrl',
		controllerAs: 'vm',
		templateUrl: 'Admin/dashboard/views/dashboard.html',
		access: { requiredLogin: true }
	})
	.when('/profile', {
		controller: 'profileCtrl',
		controllerAs: 'vm',
		templateUrl: 'Admin/profile/views/profile.html',
		access: { requiredLogin: true }
	})
	.when('/users', {
		controller: 'usersCtrl',
		controllerAs: 'vm',
		templateUrl: 'Admin/users/views/users.html',
		access: { requiredLogin: true }
	})
	.when('/categories', {
		controller: 'categoryCtrl',
		controllerAs: 'vm',
		templateUrl: 'Admin/categories/views/categories.html',
		access: { requiredLogin: true }
	})
	.otherwise({
		redirectTo: '/'
	});
}]);