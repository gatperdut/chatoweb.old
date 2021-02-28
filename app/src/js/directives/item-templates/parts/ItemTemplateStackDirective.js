'use strict';

angular.module('chatoWeb')

.directive('itemTemplateStack', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/item-templates/parts/stack.html',
    scope: {
      model: '='
    },
    controller: ['$scope', function($scope) {

      $scope.model.current = $scope.model.max;

      $scope.change = function() {
        if ($scope.model.max < 0) {
          $scope.model.max = 0;
        }
        $scope.model.current = $scope.model.max;
      };

    }]
  };
}]);
