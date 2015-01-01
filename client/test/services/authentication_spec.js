'use strict';

describe('Authentication Service', function () {

  var $httpBackend,
    user;

  beforeEach(module('dekho'));

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    user = { id: 234, name: 'Bob', email: 'bob@example.com' };

    // Stub $http to return some tasks
    $httpBackend = $injector.get('$httpBackend');
  }));

  describe('login', function () {
    var data;

    beforeEach(inject(function(Authentication) {
      $httpBackend.when('POST', '/login').respond(200, user);
      Authentication.loggedIn = false;
      Authentication.login({ email: 'bob@example.com' })
        .then(function(res) { data = res; });
      $httpBackend.flush();
    }));

    it('returns the matching user details', function() {
      expect(data).toEqual(user);
    });

    it('sets the state to logged in', inject(function(Authentication) {
      expect(Authentication.isLoggedIn()).toEqual(true);
    }));
  });

  // describe('logout', function () {
  //   var data;

  //   beforeEach(inject(function(AuthenticationService) {
  //     $httpBackend.when('DELETE', '/api/sessions').respond(200, {});
  //     AuthenticationService.loggedIn = true;
  //     AuthenticationService.logout()
  //       .then(function(res) { data = res; });
  //     $httpBackend.flush();
  //   }));

  //   it('returns nothing', function() {
  //     expect(data).toEqual({});
  //   });

  //   it('sets the state to logged out', inject(function(AuthenticationService) {
  //     expect(AuthenticationService.isLoggedIn()).toEqual(false);
  //   }));
  // });
});


