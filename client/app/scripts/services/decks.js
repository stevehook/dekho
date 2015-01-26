'use strict';

angular.module('dekho')
  .service('Decks', function ($http, $rootScope, DECK_EVENTS) {
    this.index = function() {
      return $http.get('/decks');
    };
    this.create = function(newDeck) {
      $http.post('/decks', newDeck, { headers: { 'X-Http-Method-Override': 'PATCH' } }).
        success(function(deck) {
          $rootScope.$broadcast('deck', DECK_EVENTS.createSuccess, deck);
        }).
        error(function() {
          $rootScope.$broadcast('deck', DECK_EVENTS.createFailed);
        });
    };
  });

