'use strict';

angular.module('chatoWeb')

.directive('itemTemplateCommon', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/item-templates/parts/common.html',
    scope: {
      model: '='
    },
    controller: ['$scope', 'MaterialUtilsService', 'CraftmanshipUtilsService', function($scope, MaterialUtilsService, CraftmanshipUtilsService) {

      $scope.zero = 0;

      $scope.MaterialUtilsService = MaterialUtilsService;

      $scope.missing = {
        material: function(desc) {
          return !!$scope.model.variable_set_template.material_type && !MaterialUtilsService.validDesc(desc);
        },
        craftmanship: function(desc) {
          return $scope.model.variable_set_template.has_craftmanship && !CraftmanshipUtilsService.validDesc(desc);
        },
        any: function(desc) {
          return $scope.missing.material(desc) || $scope.missing.craftmanship(desc);
        },
        names: function(desc) {
          var result = [];
          _.each(['material', 'craftmanship'], function(variable) {
            if ($scope.missing[variable](desc)) {
              result.push('$' + variable);
            }
          });

          return result.join(', ');
        }
      }

    }]
  };
}]);
