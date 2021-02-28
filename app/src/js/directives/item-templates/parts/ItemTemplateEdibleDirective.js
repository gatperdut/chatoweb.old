'use strict';

angular.module('chatoWeb')

.directive('itemTemplateEdible', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/item-templates/parts/edible.html',
    scope: {
      model: '='
    },
    controller: ['$scope', function($scope, ItemTemplateUtilsService) {

    }]
  };
}]);
