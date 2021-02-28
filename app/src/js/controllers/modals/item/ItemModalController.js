'use strict';

angular.module('chatoWeb')

.controller('ItemModalController', ['$scope', '$uibModalInstance', 'ItemService', 'ItemUtilsService', 'itemTemplate', function($scope, $uibModalInstance, ItemService, ItemUtilsService, itemTemplate) {

  $scope.model = ItemUtilsService.instantiate(itemTemplate);

  $scope.submit = function(model) {
    ItemService.save($scope.model).then($scope.close);
  };

  $scope.close = function() {
    $uibModalInstance.close();
  };

}]);