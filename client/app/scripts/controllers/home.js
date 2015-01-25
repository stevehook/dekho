
'use strict';

angular.module('dekho')
  .controller('Home', function($scope, $modal, Decks) {
    $scope.newDeck = { title: '', synopsis: '' };
    Decks.index().then(function(result) {
      $scope.decks = result.data;
    });
    $scope.createDeck = function() {
      console.log($scope.newDeck);
    };
  });
