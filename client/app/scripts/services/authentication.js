'use strict';

angular.module('dekho')
  .service('Authentication', function ($http, $localStorage) {
    var self = this;
    this.loggedIn = false;
    this.isLoggedIn = function() {
      return this.loggedIn;
    };

    this.login = function(credentials) {
      return $http
        .post('/login', credentials)
        .then(function (res) {
          self.loggedIn = true;
          $localStorage.token = res.data.token;
          return res.data;
        });
    };

    this.logout = function() {
      return $http
        .post('/logout')
        .then(function (res) {
          self.loggedIn = false;
          delete $localStorage.token;
          return res.data;
        });
    };
  });
