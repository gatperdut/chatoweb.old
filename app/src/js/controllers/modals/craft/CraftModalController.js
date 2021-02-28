'use strict';

angular.module('chatoWeb')

.controller('CraftModalController', ['$scope', '$uibModalInstance', 'CraftService', 'CraftUtilsService', 'CraftStepUtilsService', 'craft', function($scope, $uibModalInstance, CraftService, CraftUtilsService, CraftStepUtilsService, craft) {

  $scope.model = angular.copy(craft);

  $scope.CraftStepUtilsService = CraftStepUtilsService;

  if ($scope.model.id) {
    CraftUtilsService.auxiliarize($scope.model);
  }

  $scope.submit = function(model) {
    var promise = !!$scope.model.id ?
                  CraftService.update($scope.model)
                  :
                  CraftService.save($scope.model);

    promise.then($scope.close, null);
  };

  $scope.close = function() {
    $uibModalInstance.close();
  };

}]);