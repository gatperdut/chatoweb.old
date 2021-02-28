'use strict';

angular.module('chatoWeb')

.directive('itemCommon', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/items/parts/common.html',
    scope: {
      model: '='
    },
    controller: ['$scope', function($scope) {


    }]
  };
}]);
