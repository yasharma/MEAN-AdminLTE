'use strict';

angular.module('myApp', [
	'ngMaterial',
	'ngSanitize',
	'app.routes',
	'app.config',
	'app.controllers',
	'app.factories',
	'ngMessages',
	'LocalStorageModule'

]);

/* Setting up new module with its corresponding dependencies */

angular.module('app.controllers', []);
angular.module('app.factories', []);
angular.module('app.directives', []);
angular.module('app.filters', []);
