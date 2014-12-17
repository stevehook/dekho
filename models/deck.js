'use strict';

module.exports = function(sequelize, DataTypes) {
  var Deck = sequelize.define('Deck', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      allowEmpty: false
    },
    synopsis: DataTypes.STRING,
    /* jshint camelcase: false */
    user_id: {
    /* jshint camelcase: true */
      type: DataTypes.INTEGER,
      allowNull: false
    }
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
