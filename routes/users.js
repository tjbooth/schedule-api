/*
	this route is probably just for analystics ]
	as notifications will be broadcast using tags
*/
var restify = require('restify');

var UserRepository = require('../repository/usersRepository');

module.exports = function(server, logger) {

	server.get('/users/:deviceId', get);
	server.post('/users', post);
	server.put('/users', post);
};

function get(req, res, next) {
	
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	var userRepository = new UserRepository();

	var deviceId = req.params.deviceId;

	userRepository.get(deviceId, function (err, data) {
		res.send(data);
	});

    return next();
};

function post(req, res, next) {

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	
	var userRepository = new UserRepository();

	var user = req.body;

	//var user = JSON.parse(req.body);

	console.log(user);
	userRepository.upsert(user);

	res.send(user);
	
    return next();
};