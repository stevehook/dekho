'use strict';

var app = require('../app'),
    request = require('supertest');

describe('GET / API', function() {
  describe('when requesting /', function() {
    it('responds with success', function(done) {
      request(app)
        .get('/')
        .expect(200, done);
    });
  });
});
