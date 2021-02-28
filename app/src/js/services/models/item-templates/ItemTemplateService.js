'use strict';

angular.module('chatoWeb')

.service('ItemTemplateService', ['$http', 'ItemTemplateUtilsService', 'NotiService', 'FireModalService', function($http, ItemTemplateUtilsService, NotiService, FireModalService) {

  var get = function(id) {
    return $http.get('/api/item_templates/' + id + '.json').then(
      function(response) {
        return response.data;
      }
    );
  };

  var getByCode = function(code) {
    return $http.get('/api/item_templates/code/' + code + '.json').then(
      function(response) {
        return response.data;
      }
    );
  };

  var query = function() {
    return $http.get('/api/item_templates.json')
  };

  var search = function(term) {
    return $http.get('/api/item_templates/search.json', { params: { term: term } });
  };

  var save = function(itemTemplate) {
    itemTemplate = ItemTemplateUtilsService.attributize(itemTemplate);
    return $http.post('/api/item_templates.json', { item_template: itemTemplate }).then(
      function(response) {
        NotiService.s('Item template created.');
        return response.data;
      },
      function() {
        NotiService.e('Nope.')
      }
    )
  };

  var update = function(itemTemplate) {
    itemTemplate = ItemTemplateUtilsService.attributize(itemTemplate);
    return $http.put('/api/item_templates/' + itemTemplate.id + '.json', { item_template: itemTemplate }).then(
      function(response) {
        NotiService.s('Item template updated.');
        return response.data;
      },
      function() {
        NotiService.e('Nope.')
      }
    )
  };

  var destroy = function(itemTemplate) {
    return $http.delete('/api/item_templates/' + itemTemplate.id + '.json', { item_template: itemTemplate }).then(
      function(response) {
        NotiService.s('Item template removed.');
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

    getByCode: getByCode,

    query: query,

    search: search,

    save: save,

    update: update,

    destroy: destroy

  };

}]);