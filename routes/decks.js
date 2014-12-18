'use strict';

var db = require('../models');

var decks = {
  index: function(request, response) {
    /* jshint camelcase: false */
    db.Deck.findAll({ where: { user_id: request.currentUser.id } }).then(function(decks) {
    /* jshint camelcase: true */
      response.status(200).json(decks);
    });
  }
};

module.exports = decks;
