var restify = require('restify');

var UserRepository = require('../repository/usersRepository');

module.exports = function(server, logger) {

	server.get('/users/:deviceId', get);
	server.post('/users', post);
	server.put('/users', put);
};

function get(req, res, next) {
	
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
	
	var jsonBody = JSON.parse(req.body);

	var userRepository = new UserRepository();

	userRepository.insert(jsonBody, function () {
		res.send(jsonBody);
	});
    
    return next();
};

function put(req, res, next) {

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	var userRepository = new UserRepository();

	var user = JSON.parse(req.body);

	userRepository.update(user, function(err, result) {
		res.send(result);
	});

	return next;
}
