'use strict';

var app = require('../app'),
    request = require('supertest'),
    db = require('../models'),
    helpers = require('./specHelper'),
    expect = require('chai').expect;

describe('GET /login', function() {
  var user;

  beforeEach(function(done) {
    helpers.setupUser({}, function(err, newUser) {
      user = newUser;
      done();
    });
  });
  afterEach(function(done) {
    helpers.cleanUp(function() { done(); });
  });

  it('returns success when I provide a valid token', function(done) {
    request(app)
      .get('/login')
      .set('authorization', 'bearerToken foo')
      .expect(200, done);
  });

  it('returns current session details when I provide a valid token', function(done) {
    request(app)
      .get('/login')
      .set('authorization', 'bearerToken foo')
      .end(function(err, res) {
        var json = JSON.parse(res.text);
        expect(json.name).to.equal('Bob Roberts');
        expect(json.email).to.equal('bob@example.com');
        done();
      });
  });

  it('returns unauthorized when I provide an invalid token', function(done) {
    request(app)
      .get('/login')
      .set('authorization', 'bearerToken bar')
      .expect(403, done);
  });
});

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
    db.Token.destroy({}, { truncate: true }).then(function() {
      db.User.destroy({}, { truncate: true }).then(function() { done(); });
    });
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
