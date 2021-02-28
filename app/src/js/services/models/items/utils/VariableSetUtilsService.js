'use strict';

angular.module('chatoWeb')

.service('VariableSetUtilsService', [function() {

  var instantiate = function(itemTemplate) {
    if (!itemTemplate.variable_set_template) {
      return null;
    }

    var result = {
      material_type: itemTemplate.variable_set_template.material_type,
      material: null,
      has_craftmanship: itemTemplate.variable_set_template.has_craftmanship,
      craftmanship: null
    };

    return result;
  };

  return {

    instantiate: instantiate

  };

}]);
