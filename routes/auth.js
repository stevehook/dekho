'use strict';

var db = require('../models');

var auth = {
  login: function(request, response) {
    db.User.find({ where: { email: request.body.email, password: request.body.password } }).then(function(user) {
      if (user) {
        response.status(200).json(user);
      } else {
        response.status(403).json({ error: 'Login failed' });
      }
    });
  }
};

module.exports = auth;
