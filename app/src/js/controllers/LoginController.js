'use strict';

angular.module('chatoWeb')

.controller('LoginController', ['$scope', 'InterfaceService', 'PlayerService', 'AuthService', 'NotiService', function($scope, InterfaceService, PlayerService, AuthService, NotiService) {

  $scope.player = PlayerService.empty.login();

  $scope.InterfaceService = InterfaceService;

  $scope.submit = function() {
    AuthService.login.password($scope.player, true).then(
      function() {
        NotiService.s('Welcome.');
        InterfaceService.goTo.map();
      },
      function() {
        NotiService.e('Nope.')
      }
    );
  };

}]);