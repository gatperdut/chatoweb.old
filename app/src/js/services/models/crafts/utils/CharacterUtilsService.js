'use strict';

angular.module('chatoWeb')

.service('CharacterUtilsService', ['UtilsService', function(UtilsService) {

  var attributize = function(character) {
    var result = angular.copy(character);

    UtilsService.attributize(result, 'attribute_set');
    UtilsService.attributize(result, 'skill_set');

    return result;
  };

  return {

    attributize: attributize

  };

}]);