'use strict';

angular.module('chatoWeb')

.service('CraftService', ['$http', 'CraftUtilsService', 'NotiService', 'FireModalService', function($http, CraftUtilsService, NotiService, FireModalService) {

  var get = function(id) {
    return $http.get('/api/crafts/' + id + '.json').then(
      function(response) {
        return response.data;
      }
    );
  };

  var query = function() {
    return $http.get('/api/crafts.json')
  };

  var save = function(craft) {
    craft = CraftUtilsService.attributize(craft);
    return $http.post('/api/crafts.json', { craft: craft }).then(
      function(response) {
        NotiService.s('Craft created.');
        return response.data;
      },
      function(response) {
        NotiService.e('Nope.')
        FireModalService.open.errors(response.data.errors);
      }
    )
  };

  var update = function(craft) {
    craft = CraftUtilsService.attributize(craft);
    return $http.put('/api/crafts/' + craft.id + '.json', { craft: craft }).then(
      function(response) {
        NotiService.s('Craft updated.');
        return response.data;
      },
      function(response) {
        NotiService.e('Nope.')
        FireModalService.open.errors(response.data.errors);
      }
    )
  };

  var destroy = function(craft) {
    return $http.delete('/api/crafts/' + craft.id + '.json', { craft: craft }).then(
      function(response) {
        NotiService.s('Craft removed.');
        return response.data;
      },
      function(response) {
        NotiService.e('Nope.')
        FireModalService.open.errors(response.data.errors);
      }
    );
  };

  return {

    get: get,

    query: query,

    save: save,

    update: update,

    destroy: destroy

  };

}]);