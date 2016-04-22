var Mongoose = require('mongoose/');

var database = require('../repository/database');

var ActSchema = new Mongoose.Schema({
	name: String,
	sortName: String, 
	description: String,
	tags: String,
	start: Date,
	end: Date,
	notified: Boolean
}, {strict: false});

var Act = Mongoose.model('Act', ActSchema);

var ActsRepository = function() {  

	var self = this;

	self.get = function (sort, order, onExec) {
		database.ensureConnection();
		Act.find().sort(sort).exec(onExec); 
	};

	self.upsert = function (data) {
		Act.update(
			{ 'name' : data.name },
			data,
			{ upsert: true },
			function (err, thing) {
				//res.send(err);
			});
	};

	self.getActsByTime = function (time, onExec) {
		database.ensureConnection();
		Act.find().exec(onExec); 
	};

};

module.exports = ActsRepository;