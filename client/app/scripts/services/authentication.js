'use strict';

angular.module('dekho')
  .service('Authentication', function ($http) {
    var self = this;
    this.loggedIn = false;
    this.isLoggedIn = function () {
      return this.loggedIn;
    };

    this.login = function (credentials) {
      return $http
        .post('/login', credentials)
        .then(function (res) {
          self.loggedIn = true;
          return res.data;
        });
    };

    this.logout = function () {
      return $http
        .delete('/logout')
        .then(function (res) {
          self.loggedIn = false;
          return res.data;
        });
    };

    //TODO: method to verify that the user is logged in
  });
