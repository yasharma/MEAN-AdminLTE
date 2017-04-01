'use strict';

angular.module('app.factories')
.service('pouchDBSvr', ['pouchDB', 'pouchDBDecorators',function (pouchDB, pouchDBDecorators) {
	var db = pouchDB('AdminLTE');
	db.find = pouchDBDecorators.qify(db.find);
	return{
		get: function(id) {
			return db.get(id);
		},
		find: function(selector) {
			return db.find({
				selector: selector
			}).then(function (result) {
				return result.docs;
			}).catch(function (err) {
				return err;
			});
		},
		findAll: function () {
			return db.allDocs({
			  	include_docs: true,
			  	attachments: true
			}).then(function (result) {
				return result;
			}).catch(function (err) {
			  	return err;
			});	
		},
		post: function (doc) {
			return db.post(doc);
		},
		replicate: function () {
			db.replicate.to('http://localhost/adminlte').$promise
			.then(null, null, function(progress) {
				console.log('replication status', progress);
			})
			.then(function(result) {
				console.log('replication resolved with', result);
			})
			.catch(function(reason) {
				console.error('replication failed with', reason);
			})
			.finally(function() {
				console.log('done');
			});
		},
		change: function () {
			db.changes({
			  since: 'now',
			  include_docs: true
			}).on('change', function(change) {
			  // handle change
			  console.log(change);
			}).on('complete', function(info) {
				console.log(info);
			  // changes() was canceled
			}).on('error', function (err) {
			  console.log(err);
			});
		}
	};
}]);