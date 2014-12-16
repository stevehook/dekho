'use strict';

var app = require('../app'),
    request = require('supertest'),
    db = require('../models'),
    expect = require('chai').expect;

describe('GET /decks API', function() {
  beforeEach(function(done) {
    var deck = db.Deck.build({ title: 'foo' });
    deck.save().then(function() { done(); });
  });
  afterEach(function(done) {
    db.Deck.destroy({}, { truncate: true }).then(function() { done(); });
  });
  describe('when requesting /decks', function() {
    it('responds with success', function(done) {
      request(app)
        .get('/decks')
        .expect(200, done);
    });
    it('returns a list of my decks in JSON', function(done) {
      request(app)
        .get('/decks')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          var decks = JSON.parse(res.text);
          expect(decks[0].title).to.equal('foo');
          done();
        });
    });
  });
});
