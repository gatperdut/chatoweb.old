'use strict';

angular.module('chatoWeb')

.service('ItemCache', ['$q', '$http', 'AuthService', 'ItemService', 'UtilsService', function($q, $http, AuthService, ItemService, UtilsService) {

  var storage = {
    items: []
  };

  var initialized = $q.defer();

  var init = function() {
    if (AuthService.isAuthenticated()) {
      ItemService.query().then(
        function(response) {
          storage.items = response.data;
          initialized.resolve();
        }
      );
    }
  };

  AuthService.initialized.promise.then(init);

  AuthService.updated.promise.then(null, null, init);

  var itemEvent = {
    created: function(id) {
      ItemService.get(id).then(
        function(item) {
          storage.items.push(item);
        }
      );
    },
    deleted: function(id) {
      UtilsService.remove(storage.items, item.id);
    }
  };

  var presence = {
    any: function() {
      return storage.items.length > 0;
    }
  };

  return {

    storage: storage,

    presence: presence,

    itemEvent: itemEvent

  };

}]);