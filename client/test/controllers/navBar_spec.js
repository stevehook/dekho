'use strict';

describe('Controller: NavBarCtrl', function () {

  var NavBarCtrl,
    rootScope,
    scope,
    authEvents,
    authService,
    sandbox,
    q;

  // load the controller's module
  beforeEach(module('dekho'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q, AUTH_EVENTS) {
    sandbox = sinon.sandbox.create();
    rootScope = $rootScope;
    q = $q;
    authService = {
      login: function() {},
      logout: function() {},
      isLoggedIn: function() {}
    };
    authEvents = AUTH_EVENTS;

    scope = $rootScope.$new();
    NavBarCtrl = $controller('NavBarCtrl', { $scope: scope, $rootScope: rootScope, AUTH_EVENTS: authEvents, Authentication: authService });
  }));

  beforeEach(function() {
    sandbox.spy(rootScope, '$broadcast');
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('Controller: NavBarCtrl#logout', function() {
    var state;

    beforeEach(inject(function($state) {
      sandbox.stub(authService, 'logout', function() {
        var defer = q.defer();
        defer.resolve();
        return defer.promise;
      });
      state = $state;
      sandbox.stub($state, 'go', function() {});
    }));

    it('calls the Authentication#logout method', function() {
      scope.logout();
      rootScope.$apply();
      expect(authService.logout.calledWith()).toEqual(true);
    });

    it('broadcasts the logout success event', function() {
      scope.logout();
      rootScope.$apply();
      expect(rootScope.$broadcast.calledWith('auth', 'logout-success')).toEqual(true);
    });

    it('navigates to the login route', function() {
      scope.logout();
      rootScope.$apply();
      expect(state.go.calledWith('login')).toEqual(true);
    });
  });
});
