var restify = require('restify');

var ActsRepository = require('../repository/actsRepository');

module.exports = function(server, logger) {

	server.get('/acts', get);
};

function get(req, res, next) {
	
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	var actsRepository = new ActsRepository();

	var sort = req.params.sort;
	var order = req.params.order;

	actsRepository.get(sort, order, function (arr, data) {
		res.send(data);
	});

    return next();
};