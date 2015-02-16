
'use strict';

angular.module('dekho')
  .controller('Slideshow', function($scope) {
    $scope.deck = { id: 789, title: 'Node.js for beginners', synopsis: 'A short presentation about Node.js', slides: [
      { index: 1, content: "#Async IO\n\n\n\n    foo.bar(function(err, res) {\n      baz();\n    });\n* Node is all about asynchronous I/O\n* and other things..." },
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
