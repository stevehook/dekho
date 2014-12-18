'use strict';

var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    decks = require('./routes/decks'),
    auth = require('./routes/auth'),
    app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 4000);

app.get('/', function(request, response) {
  response.status(200).json('OK');
});

app.get('/decks', decks.index);
app.post('/login', auth.login);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
module.exports = app;
