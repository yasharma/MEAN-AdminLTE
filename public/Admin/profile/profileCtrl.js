'use strict';

angular.module('app.controllers')
.controller('profileCtrl', ['$scope', '$location', 'localStorageService','RestSvr', 'toastService','$rootScope','$timeout',
	function($scope, $location, localStorageService, RestSvr, toastService,$rootScope, $timeout){
		var vm = this;
		vm.admin = localStorageService.get('admin');
		vm.update = update;
		vm.changePassword = change_password;

		function update(isValid) {
			if(!isValid){
				return;
			}
			RestSvr.put('admin/profile/', vm.admin._id, vm.admin).then(function (response) {
				if(response.errors){
					toastService.alert({message: response.errors.message, class: 'error'});
				} else {
					toastService.alert({message: response.message, class: 'success'});
					localStorageService.set('admin', response.data);
					$rootScope.admin = localStorageService.get('admin');
				}
			});
		}

		function change_password(isValid) {
			if(!isValid) {
				return;
			}
			if(  vm.passwordDetails.new_password !== vm.passwordDetails.confirm_password ) {
				toastService.alert({message: 'New password and confirm password are not same', class: 'error'});
				return;
			}
			RestSvr.put('admin/change_password/', vm.admin._id, vm.passwordDetails).then(function (response) {
				if(response.errors){
					toastService.alert({message: response.errors.message, class: 'error'});
				} else {
					// Reset form to its intial stage
                    vm.changePasswordForm.$setPristine();
                    vm.changePasswordForm.$setUntouched();
                    $timeout(function () {vm.passwordDetails = {};},1000);
					toastService.alert({message: response.message, class: 'success'});
				}
			});
		}
	}
]);	