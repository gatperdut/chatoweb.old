'use strict';

angular.module('chatoWeb')

.controller('AreaEditModalController', ['$scope', '$uibModalInstance', 'AreaService', 'area', function($scope, $uibModalInstance, AreaService, area) {

  $scope.copy = angular.copy(area);

  $scope.submit = function() {
    var promise = $scope.copy.id ?
                  AreaService.update($scope.copy)
                  :
                  AreaService.create($scope.copy);
    promise.then(
      function(response) {
        $uibModalInstance.close(response);
      }
    );
  };

}]);