'use strict';

var _ = require('lodash'),
    db = require('../models');

var userFixture = { email: 'bob@example.com', name: 'Bob Roberts' };
var tokenFixture = { token: 'foo' };

var helpers = {
  setupUser: function(options, callback) {
    db.User.create(_.extend(userFixture, options)).then(function(user) {
      db.Token.create(_.extend(tokenFixture, { userId: user.id })).then(function() {
        callback(null, user);
      });
    });
  },

  cleanUp: function(callback) {
    db.Deck.destroy({}, { truncate: true }).then(function() {
      db.Token.destroy({}, { truncate: true }).then(function() {
        db.User.destroy({}, { truncate: true }).then(function() { callback(null); });
      });
    });
  }
};

module.exports = helpers;
