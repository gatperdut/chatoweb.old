'use strict';

angular.module('chatoWeb')

.service('ItemTemplateCommonUtilsService', ['WornTemplateUtilsService', 'VariableSetTemplateUtilsService', 'InventoryTemplateUtilsService', function(WornTemplateUtilsService, VariableSetTemplateUtilsService, InventoryTemplateUtilsService) {

  var empty = function(wearable, mandatoryCraftmanship) {
    var result = {
      short_desc: '',
      long_desc: '',
      full_desc: '',
      kwords: [],
      variable_set_template: VariableSetTemplateUtilsService.empty(mandatoryCraftmanship),
      inventory_template: null
    };

    if (wearable) {
      result = _.extend(result, WornTemplateUtilsService.empty());
    }

    InventoryTemplateUtilsService.buildAux(result);

    return result;
  };

  return {

    empty: empty

  };

}]);
