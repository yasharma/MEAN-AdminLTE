"use strict";

const mongoose 	= require('mongoose'),
	path 		= require('path'),
  	config 	 	= require(path.resolve(`./config/env/${process.env.NODE_ENV}`)),
	Schema 		= mongoose.Schema,
	
CategorySchema = new Schema({
	name: String
});

module.exports = mongoose.model('Category', CategorySchema);