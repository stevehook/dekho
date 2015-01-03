'use strict';

angular
  .module('dekho', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngStorage',
    'ui.router'
  ])
  .config(function ($stateProvider) {
    // $urlRouterProvider.otherwise('/login');
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'app/views/login.html',
      controller: 'Login'
    });
  });

