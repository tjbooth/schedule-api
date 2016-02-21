var Mongoose = require('mongoose/');

var database = require('../repository/database');

var FavouriteSchema = new Mongoose.Schema({
	eventId: String,
	eventName: String,
	reminder: Boolean
})

var UserSchema = new Mongoose.Schema({
	name: String,
	favourites: [FavouriteSchema]
}, {strict: false});


var User = Mongoose.model('User', UserSchema);

var UsersRepository = function() {  

	var self = this;

	self.get = function (id, onExec) {
		database.ensureConnection();
		User.findById(id, function (err, found) {
			onExec(err, found);
		}); 
	};


	self.create = function () {
		return new User();
	};

	self.insert = function (user, onSuccess) {
   		database.ensureConnection();
   		user.save(onSuccess);
   	};

	self.addFavourite = function (id, favourite, onResult) {
		User.findByIdAndUpdate(
        id,
        { $push: {"favourites": favourite } },
        { safe: true, upsert: true, new : true },
        function(err, model) {
            onResult(err, model);
        });
	};
};

module.exports = UsersRepository;