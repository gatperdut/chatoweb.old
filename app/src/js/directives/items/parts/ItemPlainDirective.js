'use strict';

angular.module('chatoWeb')

.directive('itemPlain', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/items/parts/plain.html',
    scope: {
      model: '='
    },
    controller: ['$scope', 'ItemService', 'ItemUtilsService', function($scope, ItemService, ItemUtilsService) {

    }]
  };
}]);
