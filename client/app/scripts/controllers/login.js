
'use strict';

angular.module('dekho')
  .constant('AUTH_EVENTS', {
    loginSuccess: 'login-success',
    loginFailed: 'login-failed',
    logoutSuccess: 'logout-success',
    logoutFailed: 'logout-failed'
  })
  .controller('Login', function($scope, $rootScope, Authentication, AUTH_EVENTS, $location) {
    $scope.credentials = {
      email: ''
    };
    $scope.isLoggedIn = function() {
      return Authentication.isLoggedIn();
    };
    $scope.login = function(credentials) {
      this.credentials = credentials;
      Authentication.login(credentials).then(function (user) {
        $rootScope.$broadcast('auth', AUTH_EVENTS.loginSuccess);
        $scope.currentUser = user;
        $location.path('/');
      }, function () {
        $rootScope.$broadcast('auth', AUTH_EVENTS.loginFailed);
      });
    };
    $scope.logout = function() {
      Authentication.logout().then(function () {
        $rootScope.$broadcast('auth', AUTH_EVENTS.logoutSuccess);
        delete $scope.currentUser;
        $location.path('/login');
      }, function () {
        $rootScope.$broadcast('auth', AUTH_EVENTS.logoutFailed);
      });
    };
  });
