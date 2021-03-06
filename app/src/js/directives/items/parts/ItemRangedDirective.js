'use strict';

angular.module('chatoWeb')

.directive('itemRanged', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/items/parts/ranged.html',
    scope: {
      model: '='
    },
    controller: ['$scope', 'WeaponStatUtilsService', function($scope, WeaponStatUtilsService) {

      $scope.$watchGroup(['model.variable_set.material', 'model.variable_set.craftmanship'], function() {
        WeaponStatUtilsService.update($scope.model)
      });

    }]
  };
}]);
