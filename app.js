'use strict';

var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    decks = require('./routes/decks'),
    auth = require('./routes/auth'),
    db = require('./models'),
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

var authenticate = function(request, response, next) {
  var bearerHeader = request.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(' ');
    var bearerToken = bearer[1];
    request.currentUser = undefined;
    if (bearerToken) {
      request.token = bearerToken;
      db.Token.find({ where: { token: bearerToken } }).then(function(token) {
        if (token) {
          request.currentUser = token.user;
          next();
        } else {
          response.sendStatus(403);
        }
      });
    } else {
      response.sendStatus(403);
    }
  } else {
    response.sendStatus(403);
  }
};

app.get('/', function(request, response) {
  response.status(200).json('OK');
});
app.get('/decks', authenticate, decks.index);
app.post('/login', auth.login);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
module.exports = app;
