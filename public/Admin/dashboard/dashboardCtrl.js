'use strict';

angular.module('app.controllers')
.controller('dashboardCtrl', ['$scope', '$location', 'localStorageService','RestSvr', 'toastService','AuthSrv','$rootScope',
	function($scope, $location, localStorageService, RestSvr, toastService, AuthSrv, $rootScope){
		console.log('DashboardCrl');
	}
]);	