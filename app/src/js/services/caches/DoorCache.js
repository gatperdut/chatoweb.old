'use strict';

angular.module('chatoWeb')

.service('DoorCache', ['$q', '$http', 'AuthService', 'DoorService', 'UtilsService', 'DirectionsService', 'RoomCache', function($q, $http, AuthService, DoorService, UtilsService, DirectionsService, RoomCache) {

  var storage = {
    doors: []
  };

  var initialized = $q.defer();

  var updated = $q.defer();

  var init = function() {
    if (AuthService.isAuthenticated()) {
      console.log('[DoorCache] initialized.');
      DoorService.query().then(
        function(response) {
          storage.doors = response.data;
          initialized.resolve();
        }
      );
    }
  };

  AuthService.initialized.promise.then(init);

  AuthService.updated.promise.then(null, null, init);

  var doorEvent = {
    created: function(door) {
      storage.doors.push(door);
      anchor(door, false);
      updated.notify();
    },
    updated: function(door) {
      UtilsService.replace(storage.doors, door);
      updated.notify();
    },
    deleted: function(door) {
      UtilsService.remove(storage.doors, door.id);
      anchor(door, true);
      updated.notify();
    }
  };

  var anchor = function(room, destroying) {
    var r;
    _.each(DirectionsService.list.all, function(dir) {
      r = _.findWhere(RoomCache.storage.rooms, { id: room[dir + 'r_id'] });
      if (!!r) {
        r[DirectionsService.opposite.id.door(dir)] = destroying ? null : room.id;
      }
    });
  };

  return {

    initialized: initialized,

    updated: updated,

    storage: storage,

    doorEvent: doorEvent

  };

}]);