'use strict';

angular.module('dekho')
  .service('Decks', function ($http) {
    this.index = function() {
      return $http.get('/decks');
    };
  });

