"use strict";

module.exports = function(sequelize, DataTypes) {
  var Slide = sequelize.define("Slide", {
    index: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Slide.belongsTo(models.Deck);
      }
    },
    tableName: 'slides'
  });

  return Slide;
};
