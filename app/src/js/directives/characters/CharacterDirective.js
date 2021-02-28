'use strict';

angular.module('chatoWeb')

.directive('character', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/characters/main.html',
    scope: {
      model: '='
    },
    controller: ['$scope', 'AttributeSetUtilsService', 'SkillSetUtilsService', 'CharacterService', 'ConstantsCache', function($scope, AttributeSetUtilsService, SkillSetUtilsService, CharacterService, ConstantsCache) {

      $scope.AttributeSetUtilsService = AttributeSetUtilsService;

      $scope.SkillSetUtilsService = SkillSetUtilsService;

      $scope.ConstantsCache = ConstantsCache;

      $scope.sliderOptions = {
        attribute: {
          floor: 1,
          ceil:  100,
          hideLimitLabels: true
        },
        skill: {
          floor: 0,
          ceil:  30,
          hideLimitLabels: true
        }
      };

      $scope.submit = function() {
        CharacterService.update($scope.model);
      };

    }]
  };
}]);
