var restify = require('restify');

var mongoose = require('mongoose');

var database = require('../repository/database');

var busboy = require("busboy");

var csv = require("fast-csv");

var fs = require('fs');

var formidable = require('formidable');

var actsRepository = require('../repository/actsRepository');

module.exports = function(server, logger) {

	server.get('/schedule', get);
	server.post('/schedule', post);
	server.post('/upload', upload);

};

function get(req, res, next) {
	
	var repositoryInstance = new actsRepository();

	var sort = req.params.sort;
	var order = req.params.order;

	repositoryInstance.get(sort, order, function (arr, data) {
		res.send(data);
	});

    return next();
};

function post(req, res, next) {

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	
	var repositoryInstance = new actsRepository();

	var act = repositoryInstance.create();
	act.name = "aa - from new post - not content"
	act.sortName = "zz - sort"

	repositoryInstance.insert(act, function () {
	    res.send(req.body);
	  });
    
    return next();
};

function upload(req, res, next) {

	var repositoryInstance = new actsRepository();

	var csvStream = csv({headers: true})
		.on("data", function(data){
			repositoryInstance.upsert(data);
		})
		.on("end", function(){
		})
		.on('finish', function() {
        	res.send(req.body);
		});

	var fileStream = new busboy({ headers: req.headers });  

	req.pipe(fileStream);       

    fileStream.on('file', function(fieldname, file, filename, encoding, mimetype) {
        file.pipe(csvStream);     
    });

	return next();
};
