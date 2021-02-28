'use strict';

angular.module('chatoWeb')

.service('SuperareaCache', ['$q', '$http', 'AuthService', 'SuperareaService', 'UtilsService', 'MapTransitionService', function($q, $http, AuthService, SuperareaService, UtilsService, MapTransitionService) {

  var storage = {
    superareas: []
  };

  var initialized = $q.defer();

  var updated = $q.defer();

  var init = function() {
    if (AuthService.isAuthenticated()) {
      console.log('[SuperareaCache] initialized.');
      SuperareaService.query().then(
        function(response) {
          storage.superareas = response.data;
          initialized.resolve();
        }
      );
    }
  };

  AuthService.initialized.promise.then(init);

  AuthService.updated.promise.then(null, null, init);

  var superareaEvent = {
    created: function(superarea) {
      storage.superareas.push(superarea);
      updated.notify(superarea.id);
    },
    updated: function(superarea) {
      UtilsService.replace(storage.superareas, superarea);
      updated.notify();
    },
    deleted: function(superarea) {
      UtilsService.remove(storage.superareas, superarea.id);
      updated.notify(storage.superareas[0].id)
    }
  };


  var presence = {
    any: function() {
      return storage.superareas.length > 0;
    }
  };

  return {

    initialized: initialized,

    updated: updated,

    storage: storage,

    superareaEvent: superareaEvent

  };

}]);