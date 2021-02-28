'use strict';

angular.module('chatoWeb')

.service('AreaService', ['$http', 'FireModalService', 'RoomService', 'NotiService', function($http, FireModalService, RoomService, NotiService) {

  var empty = function(superareaId) {
    return {
      name: 'Some distinctive area name',
      superarea_id: superareaId,
      rooms_attributes: [
        RoomService.empty(null)
      ]
    };
  };

  var get = function(id) {
    return $http.get('/api/areas/' + id + '.json').then(
      function(response) {
        return response.data;
      }
    );
  };

  var query = function() {
    return $http.get('/api/areas.json');
  };

  var rooms = function(id) {
    return $http.get('/api/areas/' + id + '/rooms.json').then(
      function(response) {
        return response.data;
      }
    );
  };

  var create = function(area) {
    return $http.post('/api/areas.json', { area: area }).then(
      function(response) {
        NotiService.s('Area created.');
        return response.data;
      },
      function() {
        NotiService.e('Nope.')
      }
    );
  };

  var update = function(area) {
    return $http.put('/api/areas/' + area.id + '.json', { area: area }).then(
      function() {
        NotiService.s('Area updated.');
      },
      function() {
        NotiService.e('Nope.')
      }
    );
  };

  var destroy = function(area) {
    return $http.delete('/api/areas/' + area.id + '.json', { area: area }).then(
      function(response) {
        NotiService.s('Area removed.');
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

    rooms: rooms,

    create: create,

    update: update,

    destroy: destroy

  };

}]);