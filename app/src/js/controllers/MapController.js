'use strict';

angular.module('chatoWeb')

.controller('MapController', ['$scope', '$timeout', 'MapService', 'MapUtilsService', 'FireModalService', 'DirectionsService', 'OrientationsService', 'SuperareaService', 'AreaService', 'RoomService', 'SuperareaUtilsService', 'RoomUtilsService', 'DoorService', 'SuperareaCache', 'AreaCache', 'MapTransitionService', 'DoorCache', function($scope, $timeout, MapService, MapUtilsService, FireModalService, DirectionsService, OrientationsService, SuperareaService, AreaService, RoomService, SuperareaUtilsService, RoomUtilsService, DoorService, SuperareaCache, AreaCache, MapTransitionService, DoorCache) {

  $scope.deselect = {
    node: function(data) {
      if (!data.edges.length) {
        MapService.selection.select.room(null);
      }
    },
    edge: function(data) {
      if (!data.nodes.length) {
        MapService.selection.select.room(null);
      }
    }
  };

  $scope.selectNode = function(data) {
    MapService.selection.select.room(data.nodes[0]);
  };

  $scope.selectEdge = function(data) {
    if (data.nodes.length > 0) {
      return;
    }
    MapService.selection.select.edge(data.edges[0]);
  };

  $scope.edit = function(data) {
    if (data.nodes.length > 0) {
      FireModalService.open.room(MapUtilsService.find.room.id(data.nodes[0]));
    }
    else {
      var edge = MapUtilsService.find.edge.id(data.edges[0]);
      if (edge.door) {
        FireModalService.open.door(edge.door);
      }
      else {
        $scope.door.create.edge(edge);
      }
    }
  };

  $scope.MapService = MapService;

  $scope.MapUtilsService = MapUtilsService;

  $scope.FireModalService = FireModalService;

  $scope.DirectionsService = DirectionsService;

  $scope.SuperareaUtilsService = SuperareaUtilsService;

  $scope.RoomUtilsService = RoomUtilsService;

  $scope.SuperareaCache = SuperareaCache;

  $scope.AreaCache = AreaCache;

  $scope.networkLoaded = function(network) {
    MapService.network.set(network);
  };

  $scope.room = {
    create: function(dir, id) {
      var room = RoomService.empty(AreaCache.selection.current.id);
      room[DirectionsService.opposite.id.room(dir)] = id;
      FireModalService.open.room(room)
    },
    connect: function(room, dir) {
      room[dir + 'r_id'] = MapUtilsService.find.node.coordinates(room, dir).id;
      RoomService.update(room);
    },
    disconnect: function(room, dir) {
      room[dir + 'r_id'] = null;
      RoomService.update(room);
    },
    remove: function(room) {
      RoomService.destroy(room);
    }
  };

  $scope.door = {
    create: {
      edge: function(edge) {
        var hash = OrientationsService.doorIds(MapUtilsService.find.node.id(edge.from), MapUtilsService.find.node.id(edge.to));
        FireModalService.open.door(DoorService.empty(hash)).then(
          function() {
            MapTransitionService.transition.edge.set(edge.id);
          }
        )
      },
      direction: function(room, dir) {
        var fakeNode1 = {
          id: room.id,
          x: 0,
          y: 0,
          z: 0
        };
        var fakeNode2 = {
          id: RoomUtilsService.connection(room, dir),
          x: DirectionsService.increment.x[dir] * 150,
          y: DirectionsService.increment.y[dir] * 150,
          z: DirectionsService.increment.z[dir] * 150
        };
        var hash = OrientationsService.doorIds(fakeNode1, fakeNode2);
        FireModalService.open.door(DoorService.empty(hash));
      }
    },
    edit: function(room, dir) {
      var door = _.findWhere(DoorCache.storage.doors, { id: RoomUtilsService.doorConnection(room, dir) });
      FireModalService.open.door(door);
    },
    remove: {
      edge: function(edge) {
        DoorService.destroy(edge.door).then(
          function() {
            MapTransitionService.transition.edge.set(edge.id);
          }
        );
      },
      direction: function(room, dir) {
        var fakeDoor = {
          id: RoomUtilsService.doorConnection(room, dir)
        };
        DoorService.destroy(fakeDoor);
      }
    }
  };

  $scope.transition = {
    follow: function(room, dir) {
      RoomService.get(RoomUtilsService.connection(room, dir)).then(
        function(r) {
          AreaCache.selection.select.id(r.area_id, r.id);
        }
      );
    },
    create: function(room, dir) {
      FireModalService.open.area.link(room, dir).then(
        function(area) {
          MapTransitionService.transition.area.set(area.id);
        }
      );
    }
  };

  $scope.area ={
    create: function() {
      FireModalService.open.area.edit(AreaService.empty(AreaCache.selection.superarea().id)).then(
        function(area) {
          MapTransitionService.transition.area.set(area.id);
        }
      );
    },
    edit: function() {
      FireModalService.open.area.edit(AreaCache.selection.current);
    }
  };

  $scope.superarea = {
    visible: {
      status: false,
      toggle: function() {
        $scope.superarea.visible.status = !$scope.superarea.visible.status;
      }
    },
    create: function() {
      FireModalService.open.superarea(SuperareaService.empty());
    },
    edit: function() {
      FireModalService.open.superarea(AreaCache.selection.superarea());
    }
  };

}]);