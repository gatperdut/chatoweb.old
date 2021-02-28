'use strict';

angular.module('chatoWeb')

.service('RoomCache', ['$q', '$http', 'AreaCache', 'AreaService', 'UtilsService', 'DirectionsService', 'MapTransitionService', function($q, $http, AreaCache, AreaService, UtilsService, DirectionsService, MapTransitionService) {

  var storage = {
    rooms: [],
  };

  var initialized = $q.defer();

  var updated = $q.defer();

  var init = function() {
    console.log('[RoomCache] fetched rooms.');
    return AreaService.rooms(AreaCache.selection.current.id).then(
      function(rooms) {
        storage.rooms = rooms;
        initialized.resolve();
      }
    );
  };

  AreaCache.initialized.promise.then(init);

  AreaCache.updated.promise.then(null, null, function(roomId) {
    init().then(function() {
      MapTransitionService.transition.room.set(roomId)
      updated.notify();
    });
  });

  var roomEvent = {
    created: function(room) {
      storage.rooms.push(room);
      anchor(room, false);
      updated.notify();
    },
    updated: function(room) {
      UtilsService.replace(storage.rooms, room);
      anchor(room, false);
      updated.notify();
    },
    deleted: function(room) {
      UtilsService.remove(storage.rooms, room.id);
      anchor(room, true);
      updated.notify();
    }
  };

  var anchor = function(room, destroying) {
    _.each(DirectionsService.list.all, function(dir) {
      var r = _.findWhere(storage.rooms, { id: room[dir + 'r_id'] });
      if (!!r) {
        if (destroying) {
          r[DirectionsService.opposite.id.room(dir)] = null;
        }
        else {
          r[DirectionsService.opposite.id.room(dir)] = room.id;
        }
      }
      else {
        var hash = {};
        var oppositeDirId = DirectionsService.opposite.id.room(dir)
        hash[oppositeDirId] = room.id
        var r2 = _.findWhere(storage.rooms, hash);
        if (r2) {
          r2[oppositeDirId] = null;
        }
      }
    });
  };

  var presence = {
    any: function() {
      return storage.rooms.length > 0;
    }
  };

  return {

    initialized: initialized,

    updated: updated,

    storage: storage,

    roomEvent: roomEvent,

    presence: presence

  };

}]);