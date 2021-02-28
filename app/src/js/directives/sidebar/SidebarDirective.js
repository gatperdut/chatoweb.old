'use strict';

angular.module('chatoWeb')

.directive('sidebar', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/sidebar/main.html',
    controller: ['$scope', 'InterfaceService', 'SystemService', function($scope, InterfaceService, SystemService) {

      $scope.InterfaceService = InterfaceService;

      $scope.SystemService = SystemService;

    }]
  };
}]);
