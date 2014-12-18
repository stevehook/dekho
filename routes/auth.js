'use strict';

var db = require('../models');

var auth = {
  login: function(request, response) {
    db.User.find({ where: { email: request.body.email } }).then(function(user) {
      if (user) {
        user.checkPassword(request.body.password, function(err, matched) {
          if (matched) {
            response.status(200).json(user);
          } else {
            response.status(403).json({ error: 'Login failed' });
          }
        });
      } else {
        response.status(403).json({ error: 'Login failed' });
      }
    });
  }
};

module.exports = auth;
