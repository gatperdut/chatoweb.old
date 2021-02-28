'use strict';

angular.module('chatoWeb')

.service('SuperareaService', ['$http', 'FireModalService', 'AreaService', 'RoomService', 'NotiService', function($http, FireModalService, AreaService, RoomService, NotiService) {

  var empty = function() {
    return {
      name: 'Some superarea name',
      areas_attributes: [
        AreaService.empty(null)
      ]
    };
  };

  var get = function(id) {
    return $http.get('/api/superareas/' + id + '.json').then(
      function(response) {
        return response.data;
      }
    );
  };

  var query = function() {
    return $http.get('/api/superareas.json');
  };

  var create = function(superarea) {
    return $http.post('/api/superareas.json', { superarea: superarea }).then(
      function(response) {
        NotiService.s('Superarea created.');
        return response.data;
      },
      function() {
        NotiService.e('Nope.')
      }
    );
  };

  var update = function(superarea) {
    return $http.put('/api/superareas/' + superarea.id + '.json', { superarea: superarea }).then(
      function() {
        NotiService.s('Superarea updated.');
      },
      function() {
        NotiService.e('Nope.')
      }
    );
  };

  var destroy = function(superarea) {
    return $http.delete('/api/superareas/' + superarea.id + '.json', { superarea: superarea }).then(
      function(response) {
        NotiService.s('Superarea removed.');
        return response.data;
      },
      function(response) {
        NotiService.e('Nope.')
        FireModalService.open.errors(response.data.errors);
      }
    );
  };

  return {

    empty: empty,

    get: get,

    query: query,

    create: create,

    update: update,

    destroy: destroy

  };

}]);