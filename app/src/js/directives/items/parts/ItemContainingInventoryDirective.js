'use strict';

angular.module('chatoWeb')

.directive('itemContainingInventory', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/items/parts/containing-inventory.html',
    scope: {
      model: '='
    },
    controller: ['$scope', '$q', 'RoomService', 'RoomUtilsService', function($scope, $q, RoomService, RoomUtilsService) {

      $scope.rooms = [];
      $scope.busy = false;
      $scope.selected = null;

      $scope.RoomUtilsService = RoomUtilsService;

      $scope.query = function(query) {
        var promise;
        $scope.busy = true;
        if (!query) {
          return;
        }
        else {
          promise = RoomService.search(query);
        }
        return promise.then(
          function(response) {
            $scope.rooms = response.data ? response.data : [];
            $scope.busy = false;
          }
        );
      };

     $scope.select = function(room) {
        $scope.selected = room;
      };

    }]
  };
}]);
