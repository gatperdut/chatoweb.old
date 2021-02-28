'use strict';

angular.module('chatoWeb')

.directive('itemStack', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/items/parts/stack.html',
    scope: {
      model: '='
    },
    controller: ['$scope', function($scope) {

      $scope.change = function() {
        if ($scope.model.max < 0) {
          $scope.model.max = 0;
        }
        $scope.model.current = $scope.model.max;
      };

    }]
  };
}]);
