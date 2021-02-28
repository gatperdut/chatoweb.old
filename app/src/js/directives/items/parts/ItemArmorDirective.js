'use strict';

angular.module('chatoWeb')

.directive('itemArmor', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/items/parts/armor.html',
    scope: {
      model: '='
    },
    controller: ['$scope', 'ArmorStatUtilsService', function($scope, ArmorStatUtilsService) {

      $scope.$watchGroup(['model.variable_set.material', 'model.variable_set.craftmanship'], function() {
        ArmorStatUtilsService.update($scope.model)
      });

    }]
  };
}]);
