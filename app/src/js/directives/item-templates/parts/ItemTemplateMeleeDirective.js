'use strict';

angular.module('chatoWeb')

.directive('itemTemplateMelee', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/item-templates/parts/melee.html',
    scope: {
      model: '='
    },
    controller: ['$scope', function($scope) {

    }]
  };
}]);
