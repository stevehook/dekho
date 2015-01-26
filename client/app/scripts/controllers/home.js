
'use strict';

angular.module('dekho')
  .constant('DECK_EVENTS', {
    createSuccess: 'create-success',
    createFailed: 'create-failed'
  })
  .controller('Home', function($scope, $modal, Decks) {
    $scope.newDeck = { title: '', synopsis: '' };
    Decks.index().then(function(result) {
      $scope.decks = result.data;
    });
    $scope.createDeck = function() {
      //TODO: validation
      Decks.create($scope.newDeck);
    };
  });
