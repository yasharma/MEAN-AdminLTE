'use strict';

angular.module('app.directives')
.directive('setHeight', ['$window', function($window){
    return{
        restrict:'A',
        link: function(scope, element, attrs){
            element.css('min-height', ($window.innerHeight - 50) + 'px');
        }
    };
}]);