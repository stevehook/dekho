'use strict';

var db = require('../models'),
    _ = require('lodash');

var userFixture = { email: 'bob@example.com', name: 'Bob Roberts', password: 'secret' };
var deckFixtures = [
      { title: 'Grunt for beginners', synopsis: 'A short presentation about Grunt' },
      { title: 'Bower for beginners', synopsis: 'A short presentation about Bower' },
      { title: 'Node.js for beginners', synopsis: 'A short presentation about Node.js' }
    ];

db.Deck.destroy({}).then(function() {
  db.User.destroy({}).then(function() {

    var user = db.User.build(userFixture);
    user.setPassword('secret', function() {
      user.save().then(function() {
        _.each(deckFixtures, function(deck) {
          deck.userId = user.id;
        });

        var first = db.Deck.build(deckFixtures[0]);
        first.save().then(function() {
          process.exit();
        });
      });
    });
  });
});
