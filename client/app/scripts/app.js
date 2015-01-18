'use strict';

angular
  .module('dekho', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngStorage',
    'ui.router'
  ])
  .config(function ($stateProvider, $httpProvider) {
    // $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/views/login.html',
        controller: 'Login'
      })
      .state('home', {
        url: '/',
        templateUrl: 'app/views/home.html',
        controller: 'Home',
        authenticate: true
      });

    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
      return {
        'request': function (config) {
          config.headers = config.headers || {};
          if ($localStorage.token) {
            config.headers.Authorization = 'Bearer ' + $localStorage.token;
          }
          return config;
        },
        'responseError': function(response) {
          if(response.status === 401 || response.status === 403) {
            console.log('redirecting to login because auth failed...');
            $location.path('/login');
          }
          return $q.reject(response);
        }
      };
    }]);
  })
  .run(function($rootScope, $state, Authentication) {
    $rootScope.$on('$stateChangeStart', function(event, toState){
      if (toState.authenticate && !Authentication.isLoggedIn()){
        console.log('redirecting to login because not logged in...');
        $state.transitionTo('login');
        event.preventDefault();
      }
    });
  });

