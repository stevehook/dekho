'use strict';

module.exports = function(sequelize, DataTypes) {
  var Token = sequelize.define('Token', {
    token: {
      type: DataTypes.STRING(500),
      allowNull: false,
      allowEmpty: false
    },
    /* jshint camelcase: false */
    user_id: {
    /* jshint camelcase: true */
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Token.belongsTo(models.User);
      }
    },
    tableName: 'tokens'
  });

  return Token;
};

