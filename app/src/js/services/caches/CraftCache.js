'use strict';

angular.module('chatoWeb')

.service('CraftCache', ['$q', '$http', 'AuthService', 'CraftService', 'UtilsService', function($q, $http, AuthService, CraftService, UtilsService) {

  var storage = {
    crafts: []
  };

  var initialized = $q.defer();

  var init = function() {
    if (AuthService.isAuthenticated()) {
      CraftService.query().then(
        function(response) {
          storage.crafts = response.data;
          initialized.resolve();
        }
      );
    }
  };

  AuthService.initialized.promise.then(init);

  AuthService.updated.promise.then(null, null, init);

  var craftEvent = {
    created: function(id) {
      CraftService.get(id).then(
        function(craft) {
          storage.crafts.push(craft);
        }
      );
    },
    updated: function(id) {
      CraftService.get(id).then(
        function(craft) {
          UtilsService.replace(storage.crafts, craft);
        }
      );
    },
    deleted: function(id) {
      UtilsService.remove(storage.crafts, id);
    }
  };

  var presence = {
    any: function() {
      return storage.crafts.length > 0;
    }
  };

  return {

    storage: storage,

    presence: presence,

    craftEvent: craftEvent

  };

}]);