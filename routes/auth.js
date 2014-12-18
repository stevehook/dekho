'use strict';

var db = require('../models'),
    jwt = require('jsonwebtoken');

var auth = {
  login: function(request, response) {
    db.User.find({ where: { email: request.body.email } }).then(function(user) {
      if (user) {
        user.checkPassword(request.body.password, function(err, matched) {
          if (matched) {
            response.status(200).json({
              success: true,
              data: {
                name: user.name,
                email: user.email
              },
              token: jwt.sign(user, process.env.JWT_SECRET, { expiresInMinutes: 60 })
            });
          } else {
            response.status(403).json({ success: false, error: 'Login failed' });
          }
        });
      } else {
        response.status(403).json({ success: false, error: 'Login failed' });
      }
    });
  }
};

module.exports = auth;
