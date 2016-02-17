var mongoose = require('mongoose');

var exports = module.exports = { };

exports.ensureConnection = function() {
	//var db = mongoose.connection;
	
	//try { db = mongoose.connect('mongodb://mongodb://localhost/admin-dev'); }
	//catch (ex) { }

	//db.on('error', console.error.bind(console, 'connection error:'));
	//db.once('open', function (callback) {
  	//	console.log("db open");
	//});	
}

exports.closeConnection = function() {
	///mongoose.connection.close();
}
