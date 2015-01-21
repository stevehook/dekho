'use strict';

var db = require('../models'),
    async = require('async'),
    _ = require('lodash');

var userFixture = { email: 'bob@example.com', name: 'Bob Roberts', password: 'secret' };
var deckFixtures = [
      { title: 'Grunt for beginners', synopsis: 'A short presentation about Grunt' },
      { title: 'Bower for beginners', synopsis: 'A short presentation about Bower' },
      { title: 'Node.js for beginners', synopsis: 'A short presentation about Node.js' }
    ];
var user;

async.series([
  function(callback) { db.Deck.destroy({}).then(function() { callback(null); }); },
  function(callback) { db.Token.destroy({}).then(function() { callback(null); }); },
  function(callback) { db.User.destroy({}).then(function() { callback(null); }); },
  function(callback) {
    user = db.User.build(userFixture);
    user.setPassword('secret', function() {
      user.save().then(function() { callback(null); });
    });
  },
  function(callback) {
    _.each(deckFixtures, function(deck) {
      deck.userId = user.id;
    });

    db.Deck.bulkCreate(deckFixtures).then(function() { callback(null); });
  }
], function() {
  process.exit();
});
