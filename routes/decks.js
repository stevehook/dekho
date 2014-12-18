'use strict';

var db = require('../models');

var decks = {
  index: function(request, response) {
    //TODO: Scope the query to the current user
    db.Deck.findAll().then(function(decks) {
      response.status(200).json(decks);
    });
  }
};

module.exports = decks;
