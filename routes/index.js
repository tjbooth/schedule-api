/* global __dirname:true */
   
var fs   = require('fs'),
    path = require('path');
    
function initialize(server, logger) {
  
  server.get('/', function (req, res, next) {
    res.send({ 'message': 'Restify is online and operational.' });      
    return next();
  });

 server.get('/hello/:name', function (req, res, next) {
   res.send('hello ' + req.params.name);
   return next();
  });
  
};

var routes = [
  'users',
  'acts',
  'locations'
];

module.exports = function(server, logger) {
  initialize(server, logger);
  
  routes.forEach(function (route) {
    try {
      require(path.join(__dirname, route))(server, logger);
    } catch (err) {
      var fileName = path.join(__dirname, route);
      console.log(fileName);
      throw new Error("Can't load '" + fileName + "' route");
    }
  });
};

