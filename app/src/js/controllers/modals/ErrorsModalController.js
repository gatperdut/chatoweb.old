'use strict';

angular.module('chatoWeb')

.controller('ErrorsModalController', ['$scope', '$uibModalInstance', 'errors', function($scope, $uibModalInstance, errors) {

  $scope.errors = errors;

  $scope.keys = _.keys(errors);

  $scope.close = function() {
    $uibModalInstance.close()
  };

}]);