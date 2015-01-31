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
    var deck = { id: 123, title: 'Golang for gophers' };

    beforeEach(function() {
      $rootScope.deck = deck;
      element = $compile('<slideshow deck="deck"></slideshow>')($rootScope);
      $rootScope.$digest();
    });

    it('shows the deck title', function() {
      expect(element.html()).toContain('Golang for gophers');
    });
  });
});
