'use strict';

angular.module('chatoWeb')

.directive('itemTemplateVessel', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/item-templates/parts/vessel.html',
    scope: {
      model: '='
    },
    controller: ['$scope', 'ConstantsCache', function($scope, ConstantsCache) {

      $scope.ConstantsCache = ConstantsCache;

    }]
  };
}]);
