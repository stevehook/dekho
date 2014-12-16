var express = require('express'),
    http = require('http'),
    db = require('./models'),
    app = express();

app.set('port', process.env.PORT || 4000);

app.get('/', function(request, response) {
  response.status(200).json('OK');
});

app.get('/decks', function(request, response) {
  response.status(200).json([{ "title": "foo" }]);
});

db.sequelize.sync().complete(function(err) {
  if (err) {
    throw err[0];
  } else {
    http.createServer(app).listen(app.get('port'), function() {
      console.log('Express server listening on port ' + app.get('port'));
    });
  }
});
module.exports = app;
