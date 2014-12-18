'use strict';

var db = require('../models');

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
          token.getUser().then(function(user) {
            request.currentUser = user;
            next();
          });
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

module.exports = authenticate;
