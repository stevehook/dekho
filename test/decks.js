'use strict';

var app = require('../app'),
    request = require('supertest'),
    _ = require('lodash'),
    db = require('../models'),
    helpers = require('./specHelper'),
    expect = require('chai').expect;

describe('decks API', function() {
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

  describe('DELETE /decks/:id', function() {
    var deckFixture = { title: 'Grunt for beginners', synopsis: 'A short presentation about Grunt' };
    var deck;
    beforeEach(function(done) {
      db.Deck.create(_.extend(deckFixture, { userId: user.id })).then(function(newDeck) {
        deck = newDeck;
        done();
      });
    });

    it('responds with success', function(done) {
      request(app)
        .delete('/decks/' + deck.id)
        .set('authorization', 'bearerToken foo')
        .expect(200, done);
    });
    it('deletes the given deck', function(done) {
      request(app)
        .delete('/decks/' + deck.id)
        .set('authorization', 'bearerToken foo')
        .end(function() {
          db.Deck.count().then(function(count) {
            expect(count).to.equal(0);
            done();
          });
        });
    });

    describe('with other users', function() {
      var otherUserFixture = { email: 'alice@example.com', name: 'Alice Roberts' };
      var otherDeckFixture = { title: 'Java for beginners', synopsis: 'A short presentation about Java' };
      var otherDeck;
      beforeEach(function(done) {
        helpers.setupUser(otherUserFixture, function(err, user) {
          db.Deck.create(_.extend(otherDeckFixture, { userId: user.id })).then(function(deck) {
            otherDeck = deck;
            done();
          });
        });
      });

      it('returns 404 when we try to delete another users deck', function(done) {
        request(app)
          .delete('/decks/' + otherDeck.id)
          .set('authorization', 'bearerToken foo')
          .expect(404, done);
        });
    });
  });

  describe('POST /decks', function() {
    var newDeck = { title: 'Grunt for beginners', synopsis: 'A short presentation about Grunt' };

    it('responds with success', function(done) {
      request(app)
        .post('/decks')
        .send(newDeck)
        .set('authorization', 'bearerToken foo')
        .expect(200, done);
    });

    it('creates a new deck', function(done) {
      request(app)
        .post('/decks')
        .send(newDeck)
        .set('authorization', 'bearerToken foo')
        .end(function() {
          db.Deck.count({ where: { userId: user.id } }).then(function(count) {
            expect(count).to.equal(1);
            done();
          });
        });
    });

    it('returns the new deck', function(done) {
      request(app)
        .post('/decks')
        .send(newDeck)
        .set('authorization', 'bearerToken foo')
        .end(function(err, res) {
          var deck = JSON.parse(res.text);
          expect(deck.title).to.equal('Grunt for beginners');
          expect(deck.synopsis).to.equal('A short presentation about Grunt');
          expect(deck.userId).to.equal(user.id);
          done();
        });
    });
  });

  describe('GET /decks', function() {
    var deckFixtures = [
      { title: 'Grunt for beginners', synopsis: 'A short presentation about Grunt' },
      { title: 'Node.js primer', synopsis: 'A short presentation about Node' },
      { title: 'Ruby on Rails', synopsis: 'A short presentation about Rails' }
    ];
    beforeEach(function(done) {
      db.Deck.bulkCreate(_.map(deckFixtures, function(deck) { deck.userId = user.id; return deck; })).then(function() { done(); });
    });

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

    describe('with other users', function() {
      var otherUserFixture = { email: 'alice@example.com', name: 'Alice Roberts' };
      var otherDeckFixtures = [
        { title: 'Java for beginners', synopsis: 'A short presentation about Java' },
        { title: '.NET primer', synopsis: 'A short presentation about .NET' }
      ];
      beforeEach(function(done) {
        helpers.setupUser(otherUserFixture, function(err, user) {
          db.Deck.bulkCreate(_.map(otherDeckFixtures, function(deck) { deck.userId = user.id; return deck; })).then(function() { done(); });
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

    describe('authentication', function() {
      it('fails when I do not have a bearer token header', function(done) {
        request(app)
        .get('/decks')
        .expect(403, done);
      });
      it('fails when I have an invalid bearer token', function(done) {
        request(app)
        .get('/decks')
        .set('authorization', 'bearerToken bar')
        .expect(403, done);
      });
      describe('when my bearer token is out of date', function() {
        beforeEach(function(done) {
          var yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          db.sequelize.query('UPDATE tokens SET "updatedAt" = ?', null, { raw: true }, [yesterday.toISOString()]).success(function() {
            done();
          });
        });
        it('fails when I have an out of date bearer token', function(done) {
          request(app)
          .get('/decks')
          .set('authorization', 'bearerToken foo')
          .expect(403, done);
        });
      });
    });
  });
});
