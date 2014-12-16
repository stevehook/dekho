"use strict";

module.exports = function(sequelize, DataTypes) {
  var Deck = sequelize.define("Deck", {
    title: DataTypes.STRING,
    synopsis: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Desk.hasMany(models.Slide);
      }
    }
  });

  return Deck;
};
