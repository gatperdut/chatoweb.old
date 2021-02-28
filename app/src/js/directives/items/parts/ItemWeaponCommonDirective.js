'use strict';

angular.module('chatoWeb')

.directive('itemWeaponCommon', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/items/parts/weapon-common.html',
    scope: {
      model: '=',
      type: '@'
    },
    controller: ['$scope', 'ConstantsCache', function($scope, ConstantsCache) {

      $scope.ConstantsCache = ConstantsCache;

    }]
  };
}]);
