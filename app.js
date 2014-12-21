'use strict';

var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    decks = require('./routes/decks'),
    authenticate = require('./lib/authenticate'),
    auth = require('./routes/auth'),
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

app.get('/', function(request, response) {
  response.status(200).json('OK');
});
app.get('/decks', authenticate, decks.index);
app.post('/decks', authenticate, decks.create);
app.post('/decks/:id', authenticate, decks.update);
app.delete('/decks/:id', authenticate, decks.destroy);
app.post('/login', auth.login);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
module.exports = app;
