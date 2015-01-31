'use strict';

describe('Home controller', function () {

  var Home,
    rootScope,
    scope,
    sandbox;

  var decks = [
    { id: 123, title: 'Grunt for beginners', synopsis: 'A short presentation about Grunt' },
    { id: 456, title: 'Bower for beginners', synopsis: 'A short presentation about Bower' },
    { id: 789, title: 'Node.js for beginners', synopsis: 'A short presentation about Node.js' }
  ];
  var newDeck = { id: 123, title: 'Go for Gophers', synopsis: 'Short presentation on Golang' };

  // load the controller's module
  beforeEach(module('dekho'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $modal, $q, Decks) {
    sandbox = sinon.sandbox.create();
    rootScope = $rootScope;
    scope = $rootScope.$new();
    sandbox.stub(Decks, 'index', function() {
      var defer = $q.defer();
      defer.resolve({ data: decks });
      return defer.promise;
    });
    sandbox.stub(Decks, 'create', function() {
      var defer = $q.defer();
      defer.resolve({ data: newDeck });
      return defer.promise;
    });
    Home = $controller('Home', { $scope: scope, $modal: $modal, Decks: Decks });
    rootScope.$apply();
  }));

  afterEach(function () {
    sandbox.restore();
  });

  describe('showing existing decks', function() {
    it('sets up the newDeck', function () {
      expect(scope.newDeck).toEqual({ title: '', synopsis: '' });
    });

    it('calls the API to fetch the list of existing decks', function () {
      expect(scope.decks).toEqual(decks);
    });
  });

  describe('creating new decks', function() {
    beforeEach(function() {
      scope.newDeck = newDeck;
      scope.createDeck();
    });

    it('calls the API to save the new deck and adds it to the list of decks', function () {
      decks.push(newDeck);
      expect(scope.decks).toEqual(decks);
    });
  });
});


