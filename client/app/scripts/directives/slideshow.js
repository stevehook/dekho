'use strict';

angular.module('dekho').directive('slideshow', function($window) {
  return {
    restrict: 'E',
    scope: {
      deck: '='
    },
    template: '<div class="slideshow">' +
              '<div ng-repeat="slide in deck.slides" ng-class="{visible: $first, slide: true}">{{slide.content}}</div>' +
              '</div>',
    link: function(scope, elem) {
      scope.currentSlide = 0;

      scope.setCurrentSlide = function(index) {
        angular.element(elem.find('.slide')[scope.currentSlide]).removeClass('visible');
        scope.currentSlide = index;
        angular.element(elem.find('.slide')[scope.currentSlide]).addClass('visible');
      };

      angular.element($window).on('keydown', function(e) {
        if (e.keyCode === 37) {
          if (scope.currentSlide > 0) {
            scope.setCurrentSlide(scope.currentSlide - 1);
          }
        } else if (e.keyCode === 39) {
          if (scope.currentSlide < (scope.deck.slides.length - 1)) {
            scope.setCurrentSlide(scope.currentSlide + 1);
          }
        }
      });
    }
  };
});

