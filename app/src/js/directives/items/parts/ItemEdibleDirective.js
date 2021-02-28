'use strict';

angular.module('chatoWeb')

.directive('itemEdible', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/items/parts/edible.html',
    scope: {
      model: '='
    },
    controller: ['$scope', 'ItemService', 'ItemUtilsService', function($scope, ItemService, ItemUtilsService) {

    }]
  };
}]);
