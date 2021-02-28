'use strict';

angular.module('chatoWeb')

.directive('itemInventory', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/items/parts/inventory.html',
    scope: {
      model: '='
    },
    controller: ['$scope', function($scope) {

    }]
  };
}]);
