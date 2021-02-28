'use strict';

angular.module('chatoWeb')

.directive('itemTemplatePlain', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/item-templates/parts/plain.html',
    scope: {
      model: '='
    },
    controller: ['$scope', function($scope) {

    }]
  };
}]);
