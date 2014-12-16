"use strict";

module.exports = function(sequelize, DataTypes) {
  var Deck = sequelize.define("Deck", {
    title: DataTypes.STRING,
    synopsis: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Deck.hasMany(models.Slide);
      }
    },
    tableName: 'decks'
  });

  return Deck;
};
