'use strict';

angular.module('chatoWeb')

.service('APIInterceptor',['$q', '$injector', function ($q, $injector) {

  var isAPICall = function(req) {
    return req.method !== 'JSONP' && req.url.substring(0, 4) == '/api';
  };

  var request = function(req) {
    var AuthService = $injector.get('AuthService');

    if (AuthService.isAuthenticated() && isAPICall(req)) {
      req.headers['X-Player-Username'] = AuthService.storage.player.username;
      req.headers['X-Player-Authentication-Token'] = AuthService.storage.player.authentication_token;
    }
    return $q.resolve(req);
  };

  return {

    request: request

  };

}]);
