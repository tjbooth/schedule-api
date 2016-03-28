/* global process:true */

'use strict';

var path = require('path'),
    cluster = require('cluster'),
    app = require('./app'),
    logging = require('./logging'),
    mongoose = require('mongoose'),
    nconf = require('nconf');

// if process.env.NODE_ENV has not been set, default to development
var NODE_ENV = process.env.NODE_ENV || 'development';
  
exports.run = run;

function run (cluster) {

    nconf.argv().env();

    nconf.defaults( { logging : {
      dir : "logs",
      level : "debug" } } );

    nconf.file({ file: 'config.json'});

    mongoose.connect(nconf.get("database"));

    //mongoose.connect('mongodb://ciaf_dev:Password123@ds062178.mongolab.com:62178/schedule-api');

    // Set up logging
    var logger = logging.createLogger(nconf.get('logging'));

    var server = app.createServer(logger, nconf.get('server:name'));

    // start listening
    var port = process.env.PORT || nconf.get('http:port');
    
    server.listen(port, function () {
      console.log('%s listening at %s', server.name, server.url);
    });
}

run();
