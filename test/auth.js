'use strict';

var app = require('../app'),
    request = require('supertest'),
    db = require('../models');
    // expect = require('chai').expect;

describe('POST /login API', function() {
  var userFixture = { email: 'bob@example.com', name: 'Bob Roberts' };
  beforeEach(function(done) {
    var user = db.User.build(userFixture);
    user.setPassword('secret', function() {
      user.save().then(function() {
        done();
      });
    });
  });
  afterEach(function(done) {
    db.User.destroy({}, { truncate: true }).then(function() { done(); });
  });

  it('allows a user to login with the correct credentials', function(done) {
    request(app)
      .post('/login')
      .send({ email: 'bob@example.com', password: 'secret' })
      .expect(200, done);
  });

  it('does not allow a user to login with the wrong password', function(done) {
    request(app)
      .post('/login')
      .send({ email: 'bob@example.com', password: 'wrong' })
      .expect(403, done);
  });
});
