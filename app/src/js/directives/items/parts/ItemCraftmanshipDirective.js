'use strict';

angular.module('chatoWeb')

.directive('itemCraftmanship', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/items/parts/craftmanship.html',
    scope: {
      model: '='
    },
    controller: ['$scope', 'ConstantsCache', 'ItemUtilsService', function($scope, ConstantsCache, ItemUtilsService) {

      $scope.ConstantsCache = ConstantsCache;

      var copy = angular.copy($scope.model);

      $scope.change = function() {
        ItemUtilsService.resetDescs($scope.model, copy);
      };

    }]
  };
}]);
