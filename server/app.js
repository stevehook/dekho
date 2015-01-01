'use strict';

var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    decks = require('./routes/decks'),
    authenticate = require('./lib/authenticate'),
    auth = require('./routes/auth'),
    path = require('path'),
    app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  next();
});
app.set('port', process.env.PORT || 4000);

// Environment specific config
// TODO: Move this to a separate file
var config = {
  env: process.env.NODE_ENV || 'development',
  root: path.normalize(__dirname + '/..')
};
var env = config.env;

if ('development' === env || 'test' === env) {
  // app.use(require('connect-livereload')());
  app.use(express.static(path.join(config.root, 'client')));
  app.set('appPath', 'client');
  // app.use(errorHandler()); // Error handler - has to be last
} else if ('production' === env) {
  app.use(express.static(path.join(config.root, 'server/public')));
    // app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    // app.use(express.static(path.join(config.root, 'public')));
    // app.set('appPath', config.root + '/public');
}

app.get('/', function(request, response) {
  response.sendFile(path.join(config.root, 'client') + '/app/index.html');
});
app.get('/decks', authenticate, decks.index);
app.post('/decks', authenticate, decks.create);
app.post('/decks/:id', authenticate, decks.update);
app.delete('/decks/:id', authenticate, decks.destroy);
app.post('/login', auth.login);
app.get('/login', authenticate, auth.show);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
module.exports = app;
