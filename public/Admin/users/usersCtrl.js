'use strict';

angular.module('app.controllers')
.controller('usersCtrl', ['pouchDBSvr','$scope',
	function(pouchDBSvr, $scope){

		$scope.selected = [];
		function bind(res) {
			$scope.users = res.rows;
		}
		pouchDBSvr.findAll().then(bind);
	}
]);	