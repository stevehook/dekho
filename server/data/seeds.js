'use strict';

var db = require('../models');

var userFixture = { email: 'bob@example.com', name: 'Bob Roberts', password: 'secret' };

var user = db.User.build(userFixture);
user.setPassword('secret', function() {
  user.save().then(function() {
    process.exit();
  });
});
