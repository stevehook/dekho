'use strict';

var db = require('../models');

var timeout = parseInt(process.env.TOKEN_TIMEOUT || 20);

var verifyTokenTimeout = function(token, callback) {
  var now = new Date();
  var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  var twentyMinutesAgo = new Date(utc.setMinutes(utc.getMinutes() - timeout));
  if (token.updatedAt < twentyMinutesAgo) {
    callback(null, false);
  } else {
    token.save().then(function() {
      callback(null, true);
    });
  }
};

var authenticate = function(request, response, next) {
  var bearerHeader = request.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(' ');
    var bearerToken = bearer[1];
    request.currentUser = undefined;
    if (bearerToken) {
      request.token = bearerToken;
      db.Token.find({ where: { token: bearerToken }, include: [db.User] }).then(function(token) {
        if (token) {
          verifyTokenTimeout(token, function(err, verified) {
            if (err || !verified) {
              response.sendStatus(403);
            } else {
              token.getUser().then(function(user) {
                request.currentUser = user;
                next();
              });
            }
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
