'use strict';

angular.module('chatoWeb')

.service('DoorService', ['$http', 'NotiService', function($http, NotiService) {

  var empty = function(hash) {
    var door = {
      short_desc: 'door',
      long_desc:  'some beautiful door',
      full_desc:  'This is the full description of the door.',
      see_through: false
    };

    return _.extend(door, hash);
  };

  var get = function(id) {
    return $http.get('/api/doors/' + id + '.json');
  };

  var query = function() {
    return $http.get('/api/doors.json');
  };

  var create = function(door) {
    return $http.post('/api/doors.json', { door: door }).then(
      function() {
        NotiService.s('Door created.');
      },
      function() {
        NotiService.e('Nope.')
      }
    );
  };

  var update = function(door) {
    return $http.put('/api/doors/' + door.id + '.json', { door: door }).then(
      function() {
        NotiService.s('Door updated.');
      },
      function() {
        NotiService.e('Nope.')
      }
    );
  };

  var destroy = function(door) {
    return $http.delete('/api/doors/' + door.id + '.json', { door: door }).then(
      function() {
        NotiService.s('Door removed.');
      },
      function() {
        NotiService.e('Nope.')
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