'use strict';

angular.module('chatoWeb')

.controller('ItemsController', ['$scope', 'ItemCache', 'ItemService', function($scope, ItemCache, ItemService) {

  $scope.ItemCache = ItemCache;

  $scope.remove = function(itemTemplate) {
    ItemService.destroy(itemTemplate);
  };

}]);