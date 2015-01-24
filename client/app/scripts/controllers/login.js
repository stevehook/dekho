
'use strict';

angular.module('dekho')
  .constant('AUTH_EVENTS', {
    loginSuccess: 'login-success',
    loginFailed: 'login-failed',
    logoutSuccess: 'logout-success',
    logoutFailed: 'logout-failed',
    requestFailed: 'request-failed'
  })
  .controller('Login', function($scope, $rootScope, Authentication, AUTH_EVENTS, $state) {
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
        $state.go('home');
      }, function () {
        $rootScope.$broadcast('auth', AUTH_EVENTS.loginFailed);
      });
    };
    $scope.logout = function() {
      Authentication.logout().then(function () {
        $rootScope.$broadcast('auth', AUTH_EVENTS.logoutSuccess);
        delete $scope.currentUser;
        $state.go('login');
      }, function () {
        $rootScope.$broadcast('auth', AUTH_EVENTS.logoutFailed);
      });
    };
  });
