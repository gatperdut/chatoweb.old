'use strict';

angular.module('chatoWeb')

.controller('ItemTemplatePickerModalController', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {

  $scope.model = {};

  $scope.submit = function() {
    $uibModalInstance.close($scope.model);
  };

  $scope.close = function() {
    $uibModalInstance.dismiss();
  };

}]);