'use strict';

angular.module('chatoWeb')

.service('VariableSetTemplateUtilsService', [function() {

  var empty = function(mandatoryCraftmanship) {
    var result = {
      material_type: null,
      has_craftmanship: mandatoryCraftmanship
    };

    return result;
  };

  return {

    empty: empty

  };

}]);
