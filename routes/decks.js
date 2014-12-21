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
      response.status(201).json(deck);
    });
  },

  destroy: function(request, response) {
    db.Deck.findOne({ where: { id: request.params.id, userId: request.currentUser.id } }).then(function(deck) {
      if (deck) {
        deck.destroy().then(function() {
          response.status(200).json(deck);
        });
      } else {
        response.status(404).json({});
      }
    });
  }
};

module.exports = decks;
