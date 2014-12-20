'use strict';

var db = require('../models');

var decks = {
  index: function(request, response) {
    db.Deck.findAll({ where: { userId: request.currentUser.id } }).then(function(decks) {
      response.status(200).json(decks);
    });
  },

  create: function(request, response) {
    var attributes = request.body;
    attributes.userId = request.currentUser.id;
    db.Deck.create(attributes).then(function(deck) {
      response.status(200).json(deck);
    });
  }
};

module.exports = decks;
