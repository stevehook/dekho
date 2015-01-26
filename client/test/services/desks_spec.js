'use strict';

describe('Decks Service', function () {

  var $httpBackend,
    rootScope,
    sandbox,
    decks;

  beforeEach(module('dekho'));

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    decks = [
      { id: 123, title: 'Grunt for beginners', synopsis: 'A short presentation about Grunt' },
      { id: 456, title: 'Bower for beginners', synopsis: 'A short presentation about Bower' },
      { id: 789, title: 'Node.js for beginners', synopsis: 'A short presentation about Node.js' }
    ];

    // Stub $http to return some tasks
    $httpBackend = $injector.get('$httpBackend');
    rootScope = $rootScope;
  }));

  describe('index', function () {
    var data;

    beforeEach(inject(function(Decks) {
      $httpBackend.when('GET', '/decks').respond(200, decks);
      Decks.index().then(function(res) { data = res.data; });
      $httpBackend.flush();
    }));

    it('returns the list of decks', function() {
      expect(data).toEqual(decks);
    });
  });

  describe('create', function() {
    describe('when API returns success', function() {
      var data = { title: 'Grunt for beginners', synopsis: 'A short presentation about Grunt' };
      var newDeck = { id: 123, title: 'Grunt for beginners', synopsis: 'A short presentation about Grunt' };
      var result;

      beforeEach(inject(function(Decks) {
        sandbox = sinon.sandbox.create();
        sandbox.spy(rootScope, '$broadcast');
        $httpBackend.when('POST', '/decks').respond(200, newDeck);
        Decks.create(data).then(function(res) { result = res.data; });
        $httpBackend.flush();
      }));

      afterEach(function() {
        sandbox.restore();
      });

      it('returns the new deck', function() {
        expect(result).toEqual(newDeck);
      });

      it('broadcasts the create-success event', function() {
        expect(rootScope.$broadcast.calledWith('deck', 'create-success', newDeck)).toEqual(true);
      });
    });

    describe('when API returns an error', function() {
      var data = { title: 'Grunt for beginners', synopsis: 'A short presentation about Grunt' };
      var result;

      beforeEach(inject(function(Decks) {
        sandbox = sinon.sandbox.create();
        sandbox.spy(rootScope, '$broadcast');
        $httpBackend.when('POST', '/decks').respond(500, {});
        Decks.create(data).then(function(res) { result = res.data; });
        $httpBackend.flush();
      }));

      afterEach(function() {
        sandbox.restore();
      });

      it('does not return a new deck', function() {
        expect(result).not.toBeDefined();
      });

      it('broadcasts the create-failed event', function() {
        expect(rootScope.$broadcast.calledWith('deck', 'create-failed')).toEqual(true);
      });
    });
  });
});
