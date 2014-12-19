'use strict';

var db = require('../models');

var decks = {
  index: function(request, response) {
    db.Deck.findAll({ where: { userId: request.currentUser.id } }).then(function(decks) {
      response.status(200).json(decks);
    });
  }
};

module.exports = decks;
