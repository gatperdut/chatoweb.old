'use strict';

angular.module('chatoWeb')

.controller('ItemTemplateCreateModalController', ['$scope', '$uibModalInstance', 'ItemTemplateService', 'ItemTemplateUtilsService', function($scope, $uibModalInstance, ItemTemplateService, ItemTemplateUtilsService) {

  $scope.form = {};

  $scope.activeTab = 'plain';

  $scope.model = {
    plain:  ItemTemplateUtilsService.empty.plain(),
    melee:  ItemTemplateUtilsService.empty.weapon.melee(),
    ranged: ItemTemplateUtilsService.empty.weapon.ranged(),
    armor:  ItemTemplateUtilsService.empty.armor(),
    edible: ItemTemplateUtilsService.empty.edible(),
    vessel: ItemTemplateUtilsService.empty.vessel()
  };

  $scope.close = function() {
    $uibModalInstance.close();
  };

  $scope.submit = function() {
    ItemTemplateService.save($scope.model[$scope.activeTab]).then($scope.close);
  };

}]);