'use strict';

angular.module('chatoWeb')

.controller('RoomModalController', ['$scope', '$uibModalInstance', 'RoomService', 'room', function($scope, $uibModalInstance, RoomService, room) {

  $scope.room = room;

  $scope.submit = function() {
    var promise;
    if ($scope.room.id) {
      promise = RoomService.update($scope.room);
    }
    else {
      promise = RoomService.create($scope.room);
    }
    promise.then(
      function() {
        $uibModalInstance.close()
      }
    );
  };

}]);