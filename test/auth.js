'use strict';

var app = require('../app'),
    request = require('supertest'),
    db = require('../models'),
    expect = require('chai').expect;

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

  describe('with correct credentials', function() {
    var credentials = { email: 'bob@example.com', password: 'secret' };
    it('allows a user to login with the correct credentials', function(done) {
      request(app)
        .post('/login')
        .send(credentials)
        .expect(200, done);
    });

    it('returns a JSON Web token', function(done) {
      request(app)
        .post('/login')
        .send(credentials)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          var json = JSON.parse(res.text);
          expect(json).to.not.be.undefined();
          expect(json.success).to.equal(true);
          expect(json.data.name).to.equal('Bob Roberts');
          expect(json.data.email).to.equal('bob@example.com');
          console.log(json.token);
          expect(json.token).to.not.be.undefined();
          done();
        });
    });
  });

  it('does not allow a user to login with the wrong password', function(done) {
    request(app)
      .post('/login')
      .send({ email: 'bob@example.com', password: 'wrong' })
      .expect(403, done);
  });

  it('does not allow a user to login with the wrong email', function(done) {
    request(app)
      .post('/login')
      .send({ email: 'wrong@example.com', password: 'secret' })
      .expect(403, done);
  });
});
