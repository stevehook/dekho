'use strict';

describe('Authentication Service', function () {

  var $httpBackend,
    user,
    response;

  beforeEach(module('dekho'));

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    user = { id: 234, name: 'Bob', email: 'bob@example.com' };
    response = { success: true, data: user, token: 'foobar' };

    // Stub $http to return some tasks
    $httpBackend = $injector.get('$httpBackend');
  }));

  describe('login', function () {
    var data;

    beforeEach(inject(function(Authentication) {
      $httpBackend.when('POST', '/login').respond(200, response);
      Authentication.loggedIn = false;
      Authentication.login({ email: 'bob@example.com' })
        .then(function(res) { data = res.data; });
      $httpBackend.flush();
    }));

    it('returns the matching user details', function() {
      expect(data).toEqual(user);
    });

    it('sets the state to logged in', inject(function(Authentication) {
      expect(Authentication.isLoggedIn()).toEqual(true);
    }));

    it('stores the token in local storage', inject(function($localStorage) {
      expect($localStorage.token).toEqual('foobar');
    }));
  });

  describe('logout', function () {
    var data;

    beforeEach(inject(function(Authentication, $localStorage) {
      $localStorage.token = 'foobar';
      $httpBackend.when('POST', '/logout').respond(200, {});
      Authentication.loggedIn = true;
      Authentication.logout()
        .then(function(res) { data = res; });
      $httpBackend.flush();
    }));

    it('returns nothing', function() {
      expect(data).toEqual({});
    });

    it('sets the state to logged out', inject(function(Authentication) {
      expect(Authentication.isLoggedIn()).toEqual(false);
    }));

    it('resets the token in local storage', inject(function($localStorage) {
      expect($localStorage.token).not.toBeDefined();
    }));
  });
});


