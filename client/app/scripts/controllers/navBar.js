'use strict';

angular.module('dekho')
  .controller('NavBarCtrl', function ($rootScope, $scope, $location, AUTH_EVENTS, Authentication, $state) {
    $scope.isLoggedIn = function () {
      return Authentication.isLoggedIn();
    };
    $scope.routeIs = function (route) {
      return $location.path() === route;
    };
    $scope.logout = function () {
      Authentication.logout().then(function () {
        $rootScope.$broadcast('auth', AUTH_EVENTS.logoutSuccess);
        $state.go('login');
      }, function () {
        $rootScope.$broadcast('auth', AUTH_EVENTS.logoutFailed);
      });
    };
  });

