var Mongoose = require('mongoose/');

var database = require('../repository/database');

var EventSchema = new Mongoose.Schema({
	name: String,
	sortName: String, 
	description: String,
	type: String,
	day: String,
	contributor: String,
	start: Date,
	end: Date
}, {strict: false});

var Event = Mongoose.model('Event', EventSchema);

var EventsRepository = function() {  

	var self = this;

	self.get = function (sort, order, onExec) {
		database.ensureConnection();
		Event.find().sort(sort).exec(onExec); 
	};

	self.upsert = function (data) {
		Event.update(
			{ 'name' : data.name },
			data,
			{ upsert: true },
			function (err, thing) {
				//res.send(err);
			});
	};
};

module.exports = EventsRepository;