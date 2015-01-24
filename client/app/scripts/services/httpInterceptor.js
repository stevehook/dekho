'use strict';

angular.module('dekho')
  .service('HttpInterceptor', function ($q, $location, $localStorage, $rootScope, AUTH_EVENTS) {
    this.request = function (config) {
      config.headers = config.headers || {};
      if ($localStorage.token) {
        config.headers.Authorization = 'Bearer ' + $localStorage.token;
      }
      return config;
    };
    this.responseError = function(response) {
      if(response.status === 401 || response.status === 403) {
        console.log('redirecting to login because auth failed...');
        $rootScope.$broadcast('auth', AUTH_EVENTS.requestFailed);
        $location.path('/login');
      }
      return $q.reject(response);
    };
  });

