'use strict';

module.exports = function(sequelize, DataTypes) {
  var Token = sequelize.define('Token', {
    token: {
      type: DataTypes.STRING(500),
      allowNull: false,
      allowEmpty: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Token.belongsTo(models.User, {
          foreignKey: {
            name: 'userId',
            type: DataTypes.INTEGER,
            allowNull: false
          }
        });
      }
    },
    tableName: 'tokens'
  });

  return Token;
};

