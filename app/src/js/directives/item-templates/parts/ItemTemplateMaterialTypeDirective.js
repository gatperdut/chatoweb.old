'use strict';

angular.module('chatoWeb')

.directive('itemTemplateMaterialType', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/item-templates/parts/material-type.html',
    scope: {
      model: '=',
      type: '@',
      mandatory: '='
    },
    controller: ['$scope', 'ConstantsCache', function($scope, ConstantsCache) {

      $scope.ConstantsCache = ConstantsCache;

      $scope.zero = 0;

    }]
  };
}]);
