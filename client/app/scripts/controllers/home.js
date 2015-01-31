
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
      Decks.create($scope.newDeck).then(function(result) {
        $scope.decks.push(result.data);
      });
    };
  });
