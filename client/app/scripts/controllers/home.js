
'use strict';

angular.module('dekho')
  .controller('Home', function($scope) {
    $scope.decks = [
      { title: 'Grunt for beginners', synopsis: 'A short presentation about Grunt' },
      { title: 'Bower for beginners', synopsis: 'A short presentation about Bower' },
      { title: 'Node.js for beginners', synopsis: 'A short presentation about Node.js' }
    ];
  });
