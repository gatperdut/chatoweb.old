'use strict';

angular.module('chatoWeb')

.directive('itemTemplateCraftmanship', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/item-templates/parts/craftmanship.html',
    scope: {
      model: '=',
      type: '@'
    },
    controller: ['$scope', function($scope) {

    }]
  };
}]);
