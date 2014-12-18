'use strict';

var express = require('express'),
    http = require('http'),
    decks = require('./routes/decks'),
    app = express();

app.set('port', process.env.PORT || 4000);

app.get('/', function(request, response) {
  response.status(200).json('OK');
});

app.get('/decks', decks.index);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
module.exports = app;
