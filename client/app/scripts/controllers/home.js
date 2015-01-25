
'use strict';

angular.module('dekho')
  .controller('Home', function($scope, $modal, Decks) {
    Decks.index().then(function(result) {
      $scope.decks = result.data;
    });
    $scope.newDeck = function() {
      $modal({title: 'New Deck', contentTemplate: 'app/views/modals/newDeck.html', show: true});
    };
  });
