'use strict';

describe('Login controller', function () {

  var Login,
    rootScope,
    scope,
    authEvents,
    authService,
    sandbox,
    q,
    state;
  var user = { id: 123, name: 'Bob Roberts', email: 'bob@example.com' };

  // load the controller's module
  beforeEach(module('dekho'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, Authentication, AUTH_EVENTS, $q, $state) {
    sandbox = sinon.sandbox.create();
    rootScope = $rootScope;
    q = $q;
    state = $state;
    authService = {
      login: function() {},
      logout: function() {},
      isLoggedIn: function() {}
    };
    authEvents = AUTH_EVENTS;

    scope = $rootScope.$new();
    Login = $controller('Login', { $scope: scope, $rootScope: rootScope, AUTH_EVENTS: authEvents, Authentication: authService });
  }));

  beforeEach(function() {
    sandbox.spy(rootScope, '$broadcast');
    sandbox.stub(state, 'go', function() {});
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('attaches a credentials object to the scope', function () {
    expect(scope.credentials).toBeDefined();
    expect(scope.credentials.email).toEqual('');
  });

  describe('Controller: Login#logout', function() {
    beforeEach(function() {
      scope.currentUser = { id: 123, email: 'bob@example.com', password: 'secret' };
      sandbox.stub(authService, 'logout', function() {
        var defer = q.defer();
        defer.resolve(user);
        return defer.promise;
      });
    });

    it('calls the Authentication#login method and passes credentials', function () {
      scope.logout();
      expect(authService.logout.calledWith()).toEqual(true);
    });

    it('resets the current user', function() {
      scope.logout();
      rootScope.$apply();
      expect(scope.currentUser).not.toBeDefined();
    });

    it('broadcasts the logoutSuccess event', function() {
      scope.logout();
      rootScope.$apply();
      expect(rootScope.$broadcast.calledWith('auth', 'logout-success')).toEqual(true);
    });

    it('sets the path to /login', function() {
      scope.logout();
      rootScope.$apply();
      expect(state.go.calledWith('login')).toEqual(true);
    });
  });

  describe('Controller: Login#login', function() {
    var credentials = { email: 'bob@example.com', password: 'secret' };

    describe('with valid credentials', function() {
      beforeEach(function() {
        sandbox.stub(authService, 'login', function() {
          var defer = q.defer();
          defer.resolve(user);
          return defer.promise;
        });
      });

      it('calls the Authentication#login method and passes credentials', function () {
        scope.login(credentials);
        expect(authService.login.calledWith(credentials)).toEqual(true);
      });

      it('sets the current user', function() {
        scope.login(credentials);
        rootScope.$apply();
        expect(scope.currentUser).toBeDefined();
      });

      it('broadcasts the loginSuccess event', function() {
        scope.login(credentials);
        rootScope.$apply();
        expect(rootScope.$broadcast.calledWith('auth', 'login-success')).toEqual(true);
      });

      it('sets the path to /', function() {
        scope.login(credentials);
        rootScope.$apply();
        expect(state.go.calledWith('home')).toEqual(true);
      });
    });

    describe('with invalid credentials', function() {
      beforeEach(function() {
        sandbox.stub(authService, 'login', function() {
          var defer = q.defer();
          defer.reject();
          return defer.promise;
        });
      });

      it('does not set the current user', function() {
        scope.login(credentials);
        rootScope.$apply();
        expect(scope.currentUser).not.toBeDefined();
      });

      it('broadcasts the loginFailed event', function() {
        scope.login(credentials);
        rootScope.$apply();
        expect(rootScope.$broadcast.calledWith('auth', 'login-failed')).toEqual(true);
      });

      it('does not set the path to /', function() {
        scope.login(credentials);
        rootScope.$apply();
        expect(state.go.calledWith('home')).toEqual(false);
      });
    });
  });
});
