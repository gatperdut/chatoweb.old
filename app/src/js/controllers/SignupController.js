'use strict';

angular.module('chatoWeb')

.controller('SignupController', ['$scope', 'PlayerService', 'NotiService', 'InterfaceService', function($scope, PlayerService, NotiService, InterfaceService) {

  $scope.player = PlayerService.empty.signup();

  $scope.InterfaceService = InterfaceService;

  $scope.submit = function() {
    PlayerService.signup($scope.player).then(
      function(response) {
        NotiService.s('Account created.');
        InterfaceService.goTo.public.login();
      },
      function(response) {
        NotiService.e('Failed to create account.');
      }
    );
  };

}]);