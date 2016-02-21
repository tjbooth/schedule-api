var restify = require('restify');

var UserRepository = require('../repository/usersRepository');

module.exports = function(server, logger) {

	server.get('/users', get);
	server.post('/users', post);
	server.patch('/users', patch);
};

function get(req, res, next) {
	
	var userRepository = new UserRepository();

	var userId = req.params.userId;

	userRepository.get(userId, function (err, data) {
		res.send(data);
	});

	//res.send(userId);

    return next();
};

function post(req, res, next) {

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	
	var userRepository = new UserRepository();

	var user = userRepository.create();
	user.name = "aa - from new post - not content";
	user.userId = 
	user.actId = 'abc';

	userRepository.insert(user, function () {
	    res.send(req.body);
	  });
    
    return next();
};

function patch(req, res, next) {

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	var userRepository = new UserRepository();

	var userId = req.body.userId;
	var favourite = JSON.parse(req.body.favourite);

	userRepository.addFavourite(userId, favourite, function(err, result) {
		res.send(result);
	});

	return next;
}
