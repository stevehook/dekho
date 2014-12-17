'use strict';

var db = require('../models');

db.sequelize.sync({ force: true }).complete(function(err) {
  if (err) { throw err[0]; }
  process.exit();
});
