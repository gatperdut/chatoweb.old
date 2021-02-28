'use strict';

angular.module('chatoWeb')

.directive('itemVessel', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/items/parts/vessel.html',
    scope: {
      model: '='
    },
    controller: ['$scope', 'ItemService', 'ItemUtilsService', 'ConstantsCache', function($scope, ItemService, ItemUtilsService, ConstantsCache) {

      $scope.ConstantsCache = ConstantsCache;

    }]
  };
}]);
