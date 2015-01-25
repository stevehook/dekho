'use strict';

angular
  .module('dekho', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngStorage',
    'ui.router',
    'ngAnimate',
    'mgcrea.ngStrap.modal'
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

    $httpProvider.interceptors.push(['HttpInterceptor', function(HttpInterceptor) {
      return HttpInterceptor;
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

