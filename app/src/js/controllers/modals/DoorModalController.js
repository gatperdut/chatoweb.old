'use strict';

angular.module('chatoWeb')

.controller('DoorModalController', ['$scope', '$uibModalInstance', 'DoorService', 'door', function($scope, $uibModalInstance, DoorService, door) {

  $scope.door = door;

  $scope.submit = function() {
    var promise;
    if ($scope.door.id) {
      promise = DoorService.update($scope.door);
    }
    else {
      promise = DoorService.create($scope.door);
    }
    promise.then(
      function() {
        $uibModalInstance.close()
      }
    );
  };

}]);