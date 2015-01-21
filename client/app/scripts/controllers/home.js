
'use strict';

angular.module('dekho')
  .controller('Home', function($scope, Decks) {
    Decks.index().then(function(result) {
      $scope.decks = result.data;
    });
  });
