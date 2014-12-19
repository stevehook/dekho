'use strict';

module.exports = function(sequelize, DataTypes) {
  var Deck = sequelize.define('Deck', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      allowEmpty: false
    },
    synopsis: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Deck.hasMany(models.Slide);
        Deck.belongsTo(models.User, {
          foreignKey: {
            name: 'userId',
            type: DataTypes.INTEGER,
            allowNull: false
          }
        });
      }
    },
    tableName: 'decks'
  });

  return Deck;
};
