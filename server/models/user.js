'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING
  },
  {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Deck);
      }
    },
    instanceMethods: {
      setPassword: function(password, done) {
        var self = this;
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(password, salt, function(err, hash) {
            self.setDataValue('password', hash);
            done();
          });
        });
      },
      checkPassword: function(password, done) {
        bcrypt.compare(password, this.password, function(err, res) {
          done(err, res);
        });
      }
    },
    tableName: 'users'
  });

  return User;
};

