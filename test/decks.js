'use strict';

var app = require('../app'),
    request = require('supertest'),
    _ = require('lodash'),
    db = require('../models'),
    expect = require('chai').expect;

describe('GET /decks API', function() {
  var tokenFixture = { token: 'foo' };
  var userFixture = { email: 'bob@example.com', name: 'Bob Roberts' };
  var deckFixtures = [
    { title: 'Grunt for beginners', synopsis: 'A short presentation about Grunt' },
    { title: 'Node.js primer', synopsis: 'A short presentation about Node' },
    { title: 'Ruby on Rails', synopsis: 'A short presentation about Rails' }
  ];
  beforeEach(function(done) {
    db.User.create(userFixture).then(function(user) {
      /* jshint camelcase: false */
      db.Token.create(_.extend(tokenFixture, { user_id: user.id })).then(function() {
        db.Deck.bulkCreate(_.map(deckFixtures, function(deck) { deck.user_id = user.id; return deck; })).then(function() { done(); });
      });
      /* jshint camelcase: true */
    });
  });
  afterEach(function(done) {
    db.Deck.destroy({}, { truncate: true }).then(function() {
      db.Token.destroy({}, { truncate: true }).then(function() {
        db.User.destroy({}, { truncate: true }).then(function() { done(); });
      });
    });
  });
  describe('when requesting /decks', function() {
    it('responds with success', function(done) {
      request(app)
        .get('/decks')
        .set('authorization', 'bearerToken foo')
        .expect(200, done);
    });
    it('returns a list of my decks in JSON', function(done) {
      request(app)
        .get('/decks')
        .set('authorization', 'bearerToken foo')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          var decks = JSON.parse(res.text);
          expect(decks.length).to.equal(deckFixtures.length);
          expect(decks[0].title).to.equal('Grunt for beginners');
          done();
        });
    });
    it('fails when I do not have a bearer token header', function(done) {
      request(app)
        .get('/decks')
        .expect(403, done);
    });
    it('fails when I the wrong bearer token in a header', function(done) {
      request(app)
        .get('/decks')
        .set('authorization', 'bearerToken bar')
        .expect(403, done);
    });
    describe('with other users', function() {
      var otherUserFixture = { email: 'alice@example.com', name: 'Alice Roberts' };
      var otherDeckFixtures = [
        { title: 'Jave for beginners', synopsis: 'A short presentation about Java' },
        { title: '.NET primer', synopsis: 'A short presentation about .NET' }
      ];
      beforeEach(function(done) {
        db.User.create(otherUserFixture).then(function(user) {
          /* jshint camelcase: false */
          db.Deck.bulkCreate(_.map(otherDeckFixtures, function(deck) { deck.user_id = user.id; return deck; })).then(function() { done(); });
          /* jshint camelcase: true */
        });
      });
      it('only returns my own decks', function(done) {
        request(app)
          .get('/decks')
          .set('authorization', 'bearerToken foo')
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            var decks = JSON.parse(res.text);
            expect(decks.length).to.equal(deckFixtures.length);
            expect(decks[0].title).to.equal('Grunt for beginners');
            done();
          });
      });
    });
  });
});
