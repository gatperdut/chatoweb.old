'use strict';

angular.module('chatoWeb')

.service('ItemTemplateCache', ['$q', '$http', 'AuthService', 'ItemTemplateService', 'UtilsService', function($q, $http, AuthService, ItemTemplateService, UtilsService) {

  var storage = {
    itemTemplates: []
  };

  var initialized = $q.defer();

  var init = function() {
    if (AuthService.isAuthenticated()) {
      ItemTemplateService.query().then(
        function(response) {
          storage.itemTemplates = response.data;
          initialized.resolve();
        }
      );
    }
  };

  AuthService.initialized.promise.then(init);

  AuthService.updated.promise.then(null, null, init);

  var itemTemplateEvent = {
    created: function(id) {
      ItemTemplateService.get(id).then(
        function(itemTemplate) {
          storage.itemTemplates.push(itemTemplate);
        }
      );
    },
    updated: function(id) {
      ItemTemplateService.get(id).then(
        function(itemTemplate) {
          UtilsService.replace(storage.itemTemplates, itemTemplate);
        }
      );
    },
    deleted: function(id) {
      UtilsService.remove(storage.itemTemplates, id);
    }
  };

  var presence = {
    any: function() {
      return storage.itemTemplates.length > 0;
    }
  };

  return {

    storage: storage,

    presence: presence,

    itemTemplateEvent: itemTemplateEvent

  };

}]);