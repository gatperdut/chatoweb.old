'use strict';

angular.module('chatoWeb')

.controller('CraftsController', ['$scope', 'CraftCache', 'CraftService', 'CraftUtilsService', 'FireModalService', function($scope, CraftCache, CraftService, CraftUtilsService, FireModalService) {

  $scope.CraftCache = CraftCache;

  $scope.CraftUtilsService = CraftUtilsService;

  $scope.create = function() {
    var craft = CraftUtilsService.empty();
    FireModalService.open.craft(craft);
  };

  $scope.remove = function(craft) {
    CraftService.destroy(craft);
  };

  $scope.edit = function(craft) {
    FireModalService.open.craft(craft);
  };

}]);