'use strict';

angular.module('chatoWeb')

.directive('itemWorn', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/items/parts/worn.html',
    scope: {
      model: '='
    },
    controller: ['$scope', function($scope) {

    }]
  };
}]);
