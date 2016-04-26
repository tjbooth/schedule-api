var Mongoose = require('mongoose/');

var database = require('../repository/database');

var FavouriteSchema = new Mongoose.Schema({
	actId: String,
	reminder: Boolean,
	status: String
})

var UserSchema = new Mongoose.Schema({
	name: String,
	deviceId: String//,
	//favourites: [FavouriteSchema]
}, { strict: false });


var User = Mongoose.model('User', UserSchema);

var UsersRepository = function() {  

	var self = this;

	self.upsert = function (data) {
		database.ensureConnection();
		User.update(
			{ 'deviceId' : data.deviceId },
			data,
			{ upsert: true },
			function (err, thing) {
				//res.send(err);
			});
	};
};

module.exports = UsersRepository;