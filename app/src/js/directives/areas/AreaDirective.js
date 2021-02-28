'use strict';

angular.module('chatoWeb')

.directive('area', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/areas/main.html',
    scope: {
      area: '='
    },
    controller: ['$scope', function($scope) {


    }]
  };
}]);
