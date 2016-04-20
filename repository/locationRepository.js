var Mongoose = require('mongoose/');

var database = require('../repository/database');

var LocationSchema = new Mongoose.Schema({
	name: String,
	description: String,
	tags: String,
}, {strict: false});

var Location = Mongoose.model('Location', LocationSchema);

var LocationRepository = function() {  

	var self = this;

	self.get = function (sort, order, onExec) {
		database.ensureConnection();
		Location.find().sort(sort).exec(onExec); 
	};

	self.upsert = function (data) {
		Location.update(
			{ 'name' : data.name },
			data,
			{ upsert: true },
			function (err, thing) {
				//res.send(err);
			});
	};
};

module.exports = LocationRepository;