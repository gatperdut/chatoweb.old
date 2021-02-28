'use strict';

angular.module('chatoWeb')

.directive('itemTemplateInventory', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/item-templates/parts/inventory.html',
    scope: {
      model: '='
    },
    controller: ['$scope', 'InventoryTemplateUtilsService', 'LidTemplateUtilsService', 'LockTemplateUtilsService', function($scope, InventoryTemplateUtilsService, LidTemplateUtilsService, LockTemplateUtilsService) {

      $scope.toggle = {
        inventory: function() {
          if ($scope.model.inv.present) {
            $scope.model.inventory_template = InventoryTemplateUtilsService.empty('ItemTemplate');
          }
          else {
            delete $scope.model.inventory_template;
          }
        },
        lid: function() {
          if ($scope.model.inv.lid.present) {
            $scope.model.inventory_template.lid_template = LidTemplateUtilsService.empty();
          }
          else {
            delete $scope.model.inventory_template.lid_template;
          }
        },
        lock: function() {
          if ($scope.model.inv.lid.lock.present) {
            $scope.model.inventory_template.lid_template.lock_template = LockTemplateUtilsService.empty('LidTemplate');
          }
          else {
            delete $scope.model.inventory_template.lid_template.lock_template;
          }
        }
      };

    }]
  };
}]);
