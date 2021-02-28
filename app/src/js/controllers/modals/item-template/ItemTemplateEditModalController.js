'use strict';

angular.module('chatoWeb')

.controller('ItemTemplateEditModalController', ['$scope', '$timeout', '$compile', '$uibModalInstance', 'ItemTemplateService', 'ItemTemplateUtilsService', 'InventoryTemplateUtilsService', 'itemTemplate', function($scope, $timeout, $compile, $uibModalInstance, ItemTemplateService, ItemTemplateUtilsService, InventoryTemplateUtilsService, itemTemplate) {

  $scope.form = {};

  InventoryTemplateUtilsService.buildAux(itemTemplate);

  var type = ItemTemplateUtilsService.whatIs(itemTemplate);

  $scope.copy = angular.copy(itemTemplate);

  var directiveName = 'item-template-' + type;

  var el = $compile('<form name="form"><' + directiveName + ' model="copy"></' + directiveName + '></form>')( $scope );
  $timeout(function() {
    $('.placeholder').append(el[0]);
  });

  $scope.close = function() {
    $uibModalInstance.close();
  };

  $scope.submit = function() {
    ItemTemplateService.update($scope.copy).then($scope.close);
  };

}]);