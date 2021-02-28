'use strict';

angular.module('chatoWeb')

.directive('itemTemplateRanged', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/item-templates/parts/ranged.html',
    scope: {
      model: '='
    },
    controller: ['$scope', 'ConstantsCache', function($scope, ConstantsCache) {

      $scope.ConstantsCache = ConstantsCache;

      $scope.dnd = {
        selected: null,
        list: _.map($scope.model.weapon_stat_template.ranged_stat_template.ranges_suitability, function(range) {
          return {
            label: range
          };
        })
      };

      $scope.refreshModel = function() {
        $scope.model.weapon_stat_template.ranged_stat_template.ranges_suitability = _.map($scope.dnd.list, function(item) {
          return item.label;
        });
      };

    }]
  };
}]);
