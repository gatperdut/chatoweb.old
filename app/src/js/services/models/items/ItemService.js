'use strict';

angular.module('chatoWeb')

.service('ItemService', ['$http', 'ItemUtilsService', 'NotiService', 'FireModalService', function($http, ItemUtilsService, NotiService, FireModalService) {

  var get = function(id) {
    return $http.get('/api/items/' + id + '.json').then(
      function(response) {
        return response.data;
      }
    );
  };

  var query = function() {
    return $http.get('/api/items.json')
  };

  var save = function(item) {
    item = ItemUtilsService.attributize(item);
    return $http.post('/api/items.json', { item: item }).then(
      function(response) {
        NotiService.s('Item created.');
        return response.data;
      },
      function() {
        NotiService.e('Nope.')
      }
    )
  };

  var destroy = function(item) {
    return $http.delete('/api/item/' + item.id + '.json', { item: item }).then(
      function(response) {
        NotiService.s('Item removed.');
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

    destroy: destroy

  };

}]);