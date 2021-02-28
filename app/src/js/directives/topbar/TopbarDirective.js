'use strict';

angular.module('chatoWeb')

.directive('topbar', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/topbar/main.html',
    controller: ['$scope', 'AuthService', 'InterfaceService', function($scope, AuthService, InterfaceService) {

      $scope.AuthService = AuthService;

      $scope.InterfaceService = InterfaceService;

      $scope.username = function() {
        return AuthService.isAuthenticated() ? AuthService.storage.player.username : 'Anonymous';
      };

      $scope.showLinks = function() {
        return AuthService.isAuthenticated();
      };

    }]
  };
}]);
