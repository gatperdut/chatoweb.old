'use strict';

angular.module('chatoWeb')

.service('YourCharactersCache', ['$q', '$http', 'AuthService', 'CharacterService', function($q, $http, AuthService, CharacterService) {

  var storage = {
    current: null,
    previous: []
  };

  var initialized = $q.defer();

  var init = function() {
    if (AuthService.isAuthenticated()) {
      $q.all([
        CharacterService.yours(),
        CharacterService.previous()
      ])
      .then(
        function(response) {
          storage.current  = response[0].data;
          storage.previous = response[1].data;
          initialized.resolve();
        }
      );
    }
  };

  AuthService.initialized.promise.then(init);

  AuthService.updated.promise.then(null, null, init);

  var presence = {
    current: function() {
      return !!storage.current;
    },
    previous: function() {
      return storage.previous.length > 0;
    },
    any: function() {
      return presence.current() || presence.previous();
    }
  };

  return {

    storage: storage,

    presence: presence

  };

}]);