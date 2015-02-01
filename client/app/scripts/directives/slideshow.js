'use strict';

angular.module('dekho').directive('slideshow', function() {
  return {
    restrict: 'E',
    scope: {
      deck: '='
    },
    template: '<div><h3>{{deck.title}}</h3>' +
              '<div ng-repeat="slide in deck.slides" ng-class="{visible: $first, slide: true}">{{slide.content}}</div>' +
              '</div>'
  };
});

