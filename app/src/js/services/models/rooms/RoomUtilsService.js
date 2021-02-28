'use strict';

angular.module('chatoWeb')

.service('RoomUtilsService', [function() {

  var doorConnection = function(room, dir) {
    if (!room) {
      return null;
    }
    return room[dir + 'd_id'];
  };

  var connection = function(room, dir) {
    if (!room) {
      return null;
    }
    return room[dir + 'r_id'];
  };

  var title = function(room) {
    if (!room) {
      return '';
    }
    return room.title + ' (' + room.id + ')';
  };

  return {

    doorConnection: doorConnection,

    connection: connection,

    title: title

  };

}]);