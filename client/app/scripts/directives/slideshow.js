'use strict';

angular.module('dekho').directive('slideshow', function($window) {
  return {
    restrict: 'E',
    scope: {
      deck: '='
    },
    template: '<div class="slideshow">' +
              '<div ng-repeat="slide in deck.slides" ng-class="{visible: $first, slide: true}">{{slide.content}}</div>' +
              '<div class="footer">' +
              '<span class="glyphicon glyphicon-fast-backward" ng-click="showFirst()"></span>' +
              '<span class="glyphicon glyphicon-backward" ng-click="showPrevious()"></span>' +
              '<span class="">{{currentSlide + 1}}/{{slideCount()}}</span>' +
              '<span class="glyphicon glyphicon-forward" ng-click="showNext()"></span>' +
              '<span class="glyphicon glyphicon-fast-forward" ng-click="showLast()"></span>' +
              '<span class="glyphicon glyphicon-remove" ng-click="closeSlideshow()"></span>' +
              '</div>' +
              '</div>',
    link: function(scope, elem) {
      scope.currentSlide = 0;

      scope.setCurrentSlide = function(index) {
        angular.element(elem.find('.slide')[scope.currentSlide]).removeClass('visible');
        scope.currentSlide = index;
        angular.element(elem.find('.slide')[scope.currentSlide]).addClass('visible');
      };

      scope.slideCount = function() {
        return scope.deck.slides.length;
      };

      scope.showFirst = function() {
        scope.setCurrentSlide(0);
      };

      scope.showLast = function() {
        scope.setCurrentSlide(scope.slideCount() - 1);
      };

      scope.showNext = function() {
        if (scope.currentSlide < (scope.deck.slides.length - 1)) {
          scope.setCurrentSlide(scope.currentSlide + 1);
        }
      };

      scope.showPrevious = function() {
        if (scope.currentSlide > 0) {
          scope.setCurrentSlide(scope.currentSlide - 1);
        }
      };

      angular.element($window).on('keydown', function(e) {
        if (e.keyCode === 37) {
          scope.showPrevious();
        } else if (e.keyCode === 39) {
          scope.showNext();
        }
      });
    }
  };
});

