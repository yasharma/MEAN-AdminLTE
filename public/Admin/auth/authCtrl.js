'use strict';

angular.module('app.controllers')
.controller('authCtrl', ['$scope', '$location', 'localStorageService','RestSvr', 'toastService','AuthSrv','$rootScope',
	function($scope, $location, localStorageService, RestSvr, toastService, AuthSrv, $rootScope){
		var vm = this;

		vm.signin = signin;

		function signin(isValid) {
			if(!isValid){
				return;
			}
			RestSvr.login('admin/login', vm.admin).then(function (response) {
				if(response.errors){
					toastService.alert({message: response.errors.message, class: 'error'});
				} else {
					localStorageService.set('token', response.token);
					localStorageService.set('admin', response.user);
					AuthSrv.isLogged = true;
					$rootScope.admin = localStorageService.get('admin');
					$location.path('/dashboard');
				}
			});
		}
	}
]);	