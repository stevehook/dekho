'use strict';

angular.module('dekho')
  .constant('AUTH_MESSAGES', {
    'login-success': { text: 'Login succeeded', type: 'info' },
    'login-failed': { text: 'Login failed', type: 'danger' },
    'logout-success': { text: 'Logout succeeded', type: 'info' },
    'logout-failed': { text: 'Logout failed', type: 'danger' },
    'request-failed': { text: 'You need to log in again', type: 'danger' }
  })
  .constant('DECK_MESSAGES', {
    'create-success': { text: 'New deck created', type: 'info' },
    'create-failed': { text: 'Could not create new deck', type: 'danger' },
    'complete-success': { text: 'Deck completed', type: 'info' },
    'complete-failed': { text: 'Could not complete deck', type: 'danger' },
    'delete-success': { text: 'Deck deleted', type: 'info' },
    'delete-failed': { text: 'Could not delete deck', type: 'danger' }
  })
  .controller('NotificationCtrl', function ($rootScope, $scope, AUTH_MESSAGES, DECK_MESSAGES) {
    $scope.show = false;
    $scope.text = '';
    $scope.type = '';
    $rootScope.$on('auth', function(_, eventType){
      var message = AUTH_MESSAGES[eventType];
      if (message) { $scope.setNotification(message.text, message.type); }
    });
    $rootScope.$on('deck', function(_, eventType){
      var message = DECK_MESSAGES[eventType];
      if (message) { $scope.setNotification(message.text, message.type); }
    });
    $scope.setNotification = function(text, type) {
      $scope.text = text;
      $scope.type = type;
      $scope.show = true;
    };
    $scope.resetNotification = function() {
      $scope.show = false;
      $scope.text = '';
      $scope.type = '';
    };
    $scope.showNotification = function () {
      return $scope.show;
    };
    $scope.notificationType = function () {
      return $scope.type;
    };
    $scope.notificationText = function () {
      return $scope.text;
    };
  });

