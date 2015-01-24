'use strict';

describe('HttpInterceptor Service', function () {

  var rootScope,
    location,
    sandbox;

  beforeEach(module('dekho'));

  beforeEach(inject(function($rootScope, $location) {
    sandbox = sinon.sandbox.create();
    rootScope = $rootScope;
    location = $location;
    sandbox.spy(rootScope, '$broadcast');
    sandbox.spy(location, 'path');
  }));

  afterEach(function() {
    sandbox.restore();
  });

  describe('responseError', function() {
    describe('when HTTP code is 401', function() {
      it('broadcasts the requestFailed notification', inject(function(HttpInterceptor) {
        HttpInterceptor.responseError({ status: 401 });
        expect(rootScope.$broadcast.calledWith('auth', 'request-failed')).toEqual(true);
      }));

      it('navigates to the /login path', inject(function(HttpInterceptor) {
        HttpInterceptor.responseError({ status: 401 });
        expect(location.path.calledWith('/login')).toEqual(true);
      }));
    });

    describe('when HTTP code is 500', function() {
      it('does not broadcast the requestFailed notification', inject(function(HttpInterceptor) {
        HttpInterceptor.responseError({ status: 500 });
        expect(rootScope.$broadcast.calledWith('auth', 'request-failed')).toEqual(false);
      }));

      it('does not navigate to the /login path', inject(function(HttpInterceptor) {
        HttpInterceptor.responseError({ status: 500 });
        expect(location.path.calledWith('/login')).toEqual(false);
      }));
    });
  });
});
