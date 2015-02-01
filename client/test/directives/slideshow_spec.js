'use strict';

describe('slideshow', function() {
  var $compile,
      $rootScope,
      element;

  beforeEach(module('dekho'));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  describe('with an empty slide deck', function() {
    var deck = { id: 123, title: 'Go for gophers' };

    beforeEach(function() {
      $rootScope.deck = deck;
      element = $compile('<slideshow deck="deck"></slideshow>')($rootScope);
      $rootScope.$digest();
    });

    it('shows the deck title', function() {
      expect(element.html()).toContain('Go for gophers');
    });
  });

  describe('with a 3 slide deck', function() {
    var deck = { id: 123,
      title: 'Go for gophers',
      synopsis: 'An introductory talk about the Go programming language',
      slides: [
        { index: 1, content: 'first slide content' },
        { index: 2, content: 'second slide content' },
        { index: 3, content: 'third slide content' }
      ]
    };

    beforeEach(function() {
      $rootScope.deck = deck;
      element = $compile('<slideshow deck="deck"></slideshow>')($rootScope);
      $rootScope.$digest();
    });

    it('shows the deck title', function() {
      expect(element.html()).toContain('Go for gophers');
    });

    it('shows the individual slides', function() {
      expect(element.html()).toContain('first slide content');
      expect(element.html()).toContain('second slide content');
      expect(element.html()).toContain('third slide content');
    });

    it('makes the first slide visible', function() {
    });

    it('hides the other slides', function() {
    });
  });
});
