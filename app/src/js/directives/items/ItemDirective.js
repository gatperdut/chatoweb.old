'use strict';

angular.module('chatoWeb')

.directive('item', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/items/main.html',
    scope: {
      model: '='
    },
    controller: ['$scope', '$compile', '$element', 'ItemUtilsService', function($scope, $compile, $element, ItemUtilsService) {

      var type = ItemUtilsService.whatIs($scope.model);

      var directiveName = 'item-' + type;

      var el = $compile('<' + directiveName + ' model="model"></' + directiveName + '>')( $scope );
      $element[0].append(el[0]);

    }]
  };
}]);
