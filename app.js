/* global process:true, __dirname:true */

'use strict';

var path    = require('path'),
    restify = require('restify'),
    nconf  = require('nconf'),
    routes  = require('./routes');

exports.createServer = createServer;


/*
 * Set up server
 * @return the created server
 */
function createServer (logger, serverName) {

  var settings = {
    name: serverName
  };

  if (logger) settings.log = logger;

  var server = restify.createServer(settings);

  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.queryParser());
  server.use(restify.bodyParser({ mapParams: true }));
  
  server.on('NotFound', function (req, res, next) {
    if (logger) {
      logger.debug('404', 'No route that matches request for ' + req.url);
    }
    res.send(404, req.url + ' was not found');
  });
  
  if (logger) server.on('after', restify.auditLogger({ log: logger }));
  
  routes(server, logger);
  
  return server;
}
