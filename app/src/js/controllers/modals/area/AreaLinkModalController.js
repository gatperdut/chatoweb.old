'use strict';

angular.module('chatoWeb')

.controller('AreaLinkModalController', ['$scope', '$uibModalInstance', 'AreaCache', 'AreaService', 'RoomService', 'RoomUtilsService', 'DirectionsService', 'room', 'dir', function($scope, $uibModalInstance, AreaCache, AreaService, RoomService, RoomUtilsService, DirectionsService, room, dir) {

  $scope.RoomUtilsService = RoomUtilsService;

  $scope.DirectionsService = DirectionsService;

  $scope.dir = dir;

  $scope.zero = 0;

  $scope.forms = {
    new: {},
    existing: {}
  };

  $scope.area = AreaService.empty(AreaCache.selection.superarea().id);
  $scope.area.rooms_attributes[0][DirectionsService.opposite.id.room(dir)] = room.id;

  $scope.selection = {
    ready: false,
    area: {
      options: _.reject(AreaCache.storage.areas, function(a) {
        return a.id == room.area_id;
      }),
      current: null,
      set: function(area) {
        $scope.selection.area.current = area;
        AreaService.rooms(area.id).then(
          function(rooms) {
            $scope.selection.room.options = rooms;
            $scope.selection.room.set($scope.selection.room.options[0]);
          }
        );
      }
    },
    room: {
      options: [],
      current: null,
      set: function(room) {
        $scope.selection.room.current = room;
        $scope.ready = true;
      }
    }
  };

  $scope.selection.area.set($scope.selection.area.options[0]);

  $scope.validRoom = function() {
    return !RoomUtilsService.connection($scope.selection.room.current, DirectionsService.opposite.simple(dir));
  };

  $scope.submit = function() {
    if ($scope.activeTab == 0) {
      AreaService.create($scope.area).then(
        function(area) {
          $uibModalInstance.close(area);
        }
      );
    }
    else {
      room[dir + 'r_id'] = $scope.selection.room.current.id;
      RoomService.update(room).then(
        function() {
          $uibModalInstance.close($scope.selection.area.current);
        }
      );
    }
  };

  $scope.valid = function() {
    if ($scope.activeTab == 0) {
      return $scope.forms.new.$valid;
    }
    else {
      return $scope.forms.existing.$valid;
    }
  };

}]);