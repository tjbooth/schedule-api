var Mongoose = require('mongoose/');

var database = require('../repository/database');

var FavouriteSchema = new Mongoose.Schema({
	actId: String,
	reminder: Boolean,
	status: String
})

var UserSchema = new Mongoose.Schema({
	name: String,
	deviceId: String,
	favourites: [FavouriteSchema]
}, { strict: false });


var User = Mongoose.model('User', UserSchema);

var UsersRepository = function() {  

	var self = this;

	self.get = function (deviceId, onExec) {
		database.ensureConnection();
		User.findOne({ deviceId: deviceId }, 'name deviceId favourites', onExec);
	};

	self.insert = function (user, onSuccess) {
   		database.ensureConnection();
   		var entity = new User(user);
   		entity.save(onSuccess);
   	};

	self.update = function (user, onResult) {
		User.findOneAndUpdate(
        { deviceId: user.deviceId },
        user,
        { safe: true, upsert: true, new : true },
        function(err, model) {
            onResult(err, model);
        });
	};
};

module.exports = UsersRepository;