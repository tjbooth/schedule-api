var restify = require('restify');

var LocationRepository = require('../repository/locationRepository');

module.exports = function(server, logger) {

	server.get('/locations', get);
};

function get(req, res, next) {
	
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	var locationRepository = new LocationRepository();

	var sort = req.params.sort;
	var order = req.params.order;

	locationRepository.get(sort, order, function (arr, data) {
		res.send(data);
	});

    return next();
};