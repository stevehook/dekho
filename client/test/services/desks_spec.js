'use strict';

describe('Decks Service', function () {

  var $httpBackend,
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
});
