'use strict';

angular.module('chatoWeb')

.controller('CharactersController', ['$scope', 'YourCharactersCache', 'CharacterService', 'NotiService', function($scope, YourCharactersCache, CharacterService, NotiService) {

  $scope.character = CharacterService.empty();

  $scope.YourCharactersCache = YourCharactersCache;

  $scope.submit = function() {
    CharacterService.create($scope.character);
  };

}]);