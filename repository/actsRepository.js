var mongoose = require('mongoose/');

var database = require('../repository/database');

var exports = module.exports = { };

var actSchema = new mongoose.Schema({
	name: String,
	sortName: String, 
	description: String,
	genre: String,
	eventDay: String,
	start: Date,
	end: Date
}, {strict: false});

var Act = mongoose.model('Act', actSchema);

var actsRepository = function() {  

	var self = this;

	self.get = function (sort, order, onExec) {
		database.ensureConnection();
		Act.find().sort(sort).exec(onExec); 
	};


	self.create = function () {
		return new Act();
	};

	self.insert = function (act, onSuccess) {
   		database.ensureConnection();
   		act.save(onSuccess);
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
};

module.exports = actsRepository;