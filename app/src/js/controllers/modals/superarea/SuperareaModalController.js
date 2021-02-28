'use strict';

angular.module('chatoWeb')

.controller('SuperareaModalController', ['$scope', '$uibModalInstance', 'SuperareaService', 'superarea', function($scope, $uibModalInstance, SuperareaService, superarea) {

  $scope.copy = angular.copy(superarea);

  $scope.submit = function() {
    var promise = $scope.copy.id ?
                  SuperareaService.update($scope.copy)
                  :
                  SuperareaService.create($scope.copy);
    promise.then(
      function(response) {
        $uibModalInstance.close(response);
      }
    );
  };

}]);