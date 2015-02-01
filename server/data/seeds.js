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
var nodeSlideFixtures = [
      { index: 1, content: 'Node is all about asynchronous I/O' },
      { index: 2, content: 'Asynchronous I/O is about not waiting for stuff' },
      { index: 3, content: 'We have a lot of callbacks' },
      { index: 4, content: 'Callbacks can be a pain' },
      { index: 5, content: 'But its worth it' }
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
  },
  function(callback) {
    db.Deck.find({ where: {title: 'Node.js for beginners'} }).then(function(lastDeck) {
      _.each(nodeSlideFixtures, function(slide) {
        slide.deckId = lastDeck.id;
      });
      db.Slide.bulkCreate(nodeSlideFixtures).then(function() { callback(null); });
    });
  },
], function() {
  process.exit();
});
