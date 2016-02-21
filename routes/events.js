var restify = require('restify');

var Busboy = require("busboy");

var Csv = require("fast-csv");

var EventsRepository = require('../repository/eventsRepository');

logging = require('../logging')
config = require('config')


module.exports = function(server, logger) {

	server.get('/schedule', get);
	server.post('/schedule', post);
	server.post('/upload', upload);

};

function get(req, res, next) {
	
	var eventsRepository = new EventsRepository();

	var sort = req.params.sort;
	var order = req.params.order;

	eventsRepository.get(sort, order, function (arr, data) {
		res.send(data);
	});

    return next();
};

function post(req, res, next) {


var logger = logging.createLogger(config.get('logging'));

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	
	var eventsRepository = new EventsRepository();

    logger.error(req.body);
	eventsRepository.upsert(req.body);

	res.send(req.body);

    return next();
};

function upload(req, res, next) {

	var eventsRepository = new EventsRepository();

	var csvStream = Csv({headers: true})
		.on("data", function(data){
			eventsRepository.upsert(data);
		})
		.on("end", function(){
		})
		.on('finish', function() {
        	res.send(req.body);
		});

	var fileStream = new Busboy({ headers: req.headers });  

	req.pipe(fileStream);       

    fileStream.on('file', function(fieldname, file, filename, encoding, mimetype) {
        file.pipe(csvStream);     
    });

	return next();
};
