'use strict';

angular.module('chatoWeb')

.controller('AppController', ['$scope', 'InterfaceService', 'RealtimeService', function($scope, InterfaceService, RealtimeService) {

  // RealtimeService is injected so it gets initialized. It's not really used in the Ctrl.

  $scope.InterfaceService = InterfaceService;

}]);