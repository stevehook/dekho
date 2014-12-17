'use strict';

module.exports = function(sequelize, DataTypes) {
  var Deck = sequelize.define('Deck', {
    title: DataTypes.STRING,
    synopsis: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Deck.hasMany(models.Slide);
        Deck.belongsTo(models.User);
      }
    },
    tableName: 'decks'
  });

  return Deck;
};
