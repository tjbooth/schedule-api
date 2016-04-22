var restify = require('restify');

var ActsRepository = require('../repository/actsRepository');
var Notifier = require('../notifications/azureNotifier');
var logging = require('../logging');
var nconf = require('nconf');

module.exports = function(server, logger) {

	server.get('/acts', get);
	server.post('/acts', post);
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

function post(req, res, next) {

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	// need to get the acts that are going to start in the next 10 mins
	// exclude those that we have already notified users about
	var actsRepository = new ActsRepository();

	nconf.defaults( { timeOffset : 1 } );
	nconf.env();

	var offset = nconf.get('timeOffset');

	console.log(offset);

	var currentTime = new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" )

	console.log(currentTime);

	var acts = actsRepository.getActsByTime(currentTime, function (arr, data) {
		var notifier = new Notifier();
		// notifier.send(
		// 	'tag', 
		// 	'ios',
		// 	function (data) {
		// 		res.send(data);
		// 	},
		// 	function (data) {
		// 		res.send(data);
		// 	});
		res.send(data[0].name);

		data[0].notified = true;
		actsRepository.upsert(data[0]);
	});


	

	return next();

}