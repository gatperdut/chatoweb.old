'use strict';

angular.module('chatoWeb')

.directive('itemTemplateArmor', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/item-templates/parts/armor.html',
    scope: {
      model: '='
    },
    controller: ['$scope', 'ConstantsCache', 'ItemTemplateUtilsService', function($scope, ConstantsCache, ItemTemplateUtilsService) {

      $scope.ConstantsCache = ConstantsCache;

      $scope.zero = 0;

      $scope.bodyPartsAux = {};
      _.each(ConstantsCache.storage.armorInfo.body_parts, function(bodyPart) {
        $scope.bodyPartsAux[bodyPart] = _.include($scope.model.armor_stat_template.body_parts, bodyPart);
      });

      $scope.$watchCollection('bodyPartsAux', function () {
        $scope.model.armor_stat_template.body_parts = [];
        angular.forEach($scope.bodyPartsAux, function (value, key) {
          if (value) {
            $scope.model.armor_stat_template.body_parts.push(key);
          }
        });
      });

      $scope.$watch('model.armor_stat_template.base', function() {
        $scope.model.variable_set_template.material_type = ConstantsCache.storage.materials.types.per_armor_base[$scope.model.armor_stat_template.base];
      });

    }]
  };
}]);
