'use strict';

angular.module('myAdmin', [
	'ngMaterial',
	'ngAnimate',
	'ngSanitize',
	'app.routes',
	'app.config',
	'app.controllers',
	'app.directives',
	'app.factories',
	'app.filters',
	'ngMessages',
	'LocalStorageModule',
	'ui.bootstrap',
	'pouchdb',
	'md.data.table'
]);

/* Setting up new module with its corresponding dependencies */

angular.module('app.controllers', []);
angular.module('app.factories', []);
angular.module('app.directives', []);
angular.module('app.filters', []);