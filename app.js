var express = require('express'),
    http = require('http'),
    app = express();

app.set('port', 4000);

app.get('/', function(request, response) {
  response.status(200).json('OK');
});

http.createServer(app).listen(app.get('port'));
module.exports = app;
