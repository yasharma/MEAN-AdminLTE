'use strict';

angular.module('app.controllers')
.controller('homeCtrl', ['$scope', '$location', 'localStorageService','RestSvr',
	function($scope, $location, localStorageService, RestSvr){
		console.log('HomeCtrl');
	}
]);	