
'use strict';

angular.module('dekho')
  .controller('Deck', function($scope) {
    $scope.deck = { id: 789, title: 'Node.js for beginners', synopsis: 'A short presentation about Node.js', slides: [
      { index: 1, content: 'Node is all about asynchronous I/O' },
      { index: 2, content: 'Asynchronous I/O is about not waiting for stuff' },
      { index: 3, content: 'We have a lot of callbacks' },
      { index: 4, content: 'Callbacks can be a pain' },
      { index: 5, content: 'But its worth it' }
    ]};
    // TODO: lookup the deck with the given id
    // Decks.find(id).then(function(result) {
    //   $scope.deck = result.data;
    // });
  });
