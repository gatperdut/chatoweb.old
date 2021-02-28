'use strict';

angular.module('chatoWeb')

.directive('itemTemplateWorn', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/item-templates/parts/worn.html',
    scope: {
      model: '=',
      mandatory: '='
    },
    controller: ['$scope', 'ConstantsCache', function($scope, ConstantsCache) {

      $scope.ConstantsCache = ConstantsCache;

      $scope.zero = 0;

      $scope.slotsAux = {};
      _.each(ConstantsCache.storage.armorInfo.slots, function(slot) {
        $scope.slotsAux[slot] = _.include($scope.model.possible_slots, slot);
      });

      $scope.$watchCollection('slotsAux', function () {
        $scope.model.possible_slots = [];
        angular.forEach($scope.slotsAux, function (value, key) {
          if (value) {
            $scope.model.possible_slots.push(key);
          }
        });
      });

    }]
  };
}]);
