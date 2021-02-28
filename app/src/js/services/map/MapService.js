'use strict';

angular.module('chatoWeb')

.service('MapService', ['$q', '$timeout', 'AreaCache', 'RoomCache', 'DoorCache', 'MapUtilsService', 'MapTransitionService', function($q, $timeout, AreaCache, RoomCache, DoorCache, MapUtilsService, MapTransitionService) {

  var network = {
    handle: null,
    set: function(nw) {
      network.handle = nw;
      network.handle.once('afterDrawing', function() {
        if (MapTransitionService.transition.area.id) {
          AreaCache.selection.select.id(MapTransitionService.transition.area.id);
          MapTransitionService.transition.area.set(null);
        }

        if (!MapTransitionService.transition.room.id) {
          selection.select.room(null);
          MapTransitionService.transition.room.set(undefined);
        }
        else if (MapTransitionService.transition.room.id) {
          network.handle.selectNodes([MapTransitionService.transition.room.id]);
          selection.select.room(MapTransitionService.transition.room.id);
          MapTransitionService.transition.room.set(undefined);
        }

        if (MapTransitionService.transition.edge.id) {
          network.handle.selectEdges([MapTransitionService.transition.edge.id]);
          selection.select.edge(MapTransitionService.transition.edge.id);
          MapTransitionService.transition.edge.set(undefined);
        }
      })
    }
  };

  var level = {
    current: 0,
    up: function() {
      if (level.current < MapUtilsService.buildData.level.highest) {
        $timeout(function() {
          level.current++;
        });
      }
    },
    down: function() {
      if (level.current > MapUtilsService.buildData.level.lowest) {
        $timeout(function() {
          level.current--;
        });
      }
    }
  };

  var selection = {
    type: null,
    data: null,
    is: {
      room: function() {
        return selection.type == 'room';
      },
      edge: function() {
        return selection.type == 'edge';
      }
    },
    select: {
      room: function(id) {
        selection.type = 'room';
        $timeout(function() {
          selection.data = MapUtilsService.find.room.id(id);
        });
      },
      edge: function(_id) {
        selection.type = 'edge';
        var edge = MapUtilsService.find.edge.id(_id);
        $timeout(function() {
          selection.data = edge;
        });
      }
    }
  };

  var initialized = $q.defer();

  var map = function(rooms) {
    console.log('[MapService] mapping.');
    MapUtilsService.map(rooms);
    if (level.current > MapUtilsService.buildData.level.highest) {
      level.down();
    }
    if (level.current < MapUtilsService.buildData.level.lowest) {
      level.up();
    }
  };

  var refresh = function(roomId) {
    map(RoomCache.storage.rooms);
  };

  RoomCache.initialized.promise.then(refresh);

  RoomCache.updated.promise.then(null, null, refresh);

  DoorCache.updated.promise.then(null, null, refresh);

  return {

    network: network,

    selection: selection,

    level: level,

    refresh: refresh

  };

}]);
