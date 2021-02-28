'use strict';

angular.module('chatoWeb')

.service('AuthService', ['$http', '$q', 'CookieService', 'PromiseService', 'InterfaceService', function($http, $q, CookieService, PromiseService, InterfaceService) {

  var storage = {
    player: null
  };

  var cookieName = 'cm-credentials';

  var isAuthenticated = function() {
    return !!storage.player;
  };

  var initialized = $q.defer();

  var updated     = $q.defer();

  var login = {
    token: function(username, authentication_token) {
      return $http.get('/api/players.json', { headers: { 'X-Player-Username': username, 'X-Player-Authentication-Token': authentication_token } })
    },
    password: function(player) {
      return $http.post('/api/players/authenticate.json', { player: player }).then(
        function(response) {
          storePlayer(response.data);
          updated.notify();
        }
      );
    }
  };

  var cookie = CookieService.get(cookieName)
  if (cookie) {
    login.token(cookie.username, cookie.authentication_token).then(
      function(response) {
        storePlayer(response.data);
        initialized.resolve();
      },
      function() {
        CookieService.del(cookieName);
        initialized.resolve();
      }
    );
  }
  else {
    initialized.resolve();
  }

  var storePlayer = function(player) {
    storage.player = player;

    CookieService.save(cookieName, { username: player.username, authentication_token: player.authentication_token });
  };

  var logout = function() {
    CookieService.del(cookieName);
    InterfaceService.reload();
  };

  return {

    initialized: initialized,

    updated: updated,

    storage: storage,

    isAuthenticated: isAuthenticated,

    login: login,

    logout: logout

  };

}]);
