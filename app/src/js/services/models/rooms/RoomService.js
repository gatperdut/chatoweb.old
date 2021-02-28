'use strict';

angular.module('chatoWeb')

.service('RoomService', ['$http', 'FireModalService', 'NotiService', function($http, FireModalService, NotiService) {

  var empty = function(areaId) {
    return {
      title: 'Some distinctive room name',
      description: 'Some room description',
      area_id: areaId,
      nr_id:  null,
      er_id:  null,
      sr_id:  null,
      wr_id:  null,
      ur_id:  null,
      dr_id:  null
    };
  };

  var get = function(id) {
    return $http.get('/api/rooms/' + id + '.json').then(
      function(response) {
        return response.data;
      }
    );
  };

  var query = function() {
    return $http.get('/api/rooms.json');
  };

  var search = function(term) {
    return $http.get('/api/rooms/search.json', { params: { term: term } });
  };

  var create = function(room) {
    return $http.post('/api/rooms.json', { room: room }).then(
      function(response) {
        NotiService.s('Room created.');
        return response.data;
      },
      function() {
        NotiService.e('Nope.')
      }
    );
  };

  var update = function(room) {
    return $http.put('/api/rooms/' + room.id + '.json', { room: room }).then(
      function() {
        NotiService.s('Room updated.');
      },
      function() {
        NotiService.e('Nope.')
      }
    );
  };

  var destroy = function(room) {
    return $http.delete('/api/rooms/' + room.id + '.json', { room: room }).then(
      function(response) {
        NotiService.s('Room removed.');
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

    search: search,

    create: create,

    update: update,

    destroy: destroy

  };

}]);