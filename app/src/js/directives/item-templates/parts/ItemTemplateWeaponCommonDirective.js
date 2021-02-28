'use strict';

angular.module('chatoWeb')

.directive('itemTemplateWeaponCommon', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/item-templates/parts/weapon-common.html',
    scope: {
      model: '=',
      type: '@'
    },
    controller: ['$scope', 'ConstantsCache', function($scope, ConstantsCache) {

      $scope.ConstantsCache = ConstantsCache;

      $scope.is = {
        ranged: function() {
          return $scope.type == 'ranged';
        },
        melee: function() {
          return $scope.type == 'melee';
        }
      };

    }]
  };
}]);
