'use strict';

angular.module('chatoWeb')

.service('ItemCommonUtilsService', ['WornUtilsService', 'InventoryUtilsService', 'VariableSetUtilsService', function(WornUtilsService, InventoryUtilsService, VariableSetUtilsService) {

  var instantiate = function(itemTemplate) {
    var result = {
      short_desc: angular.copy(itemTemplate.short_desc),
      long_desc:  angular.copy(itemTemplate.long_desc),
      full_desc:  angular.copy(itemTemplate.full_desc),
      kwords:     angular.copy(itemTemplate.kwords),
      item_template_id: itemTemplate.id,
      material: null,
      variable_set: VariableSetUtilsService.instantiate(itemTemplate),
      inventory: InventoryUtilsService.instantiate(itemTemplate, 'Item')
    };

    result = _.extend(result, WornUtilsService.instantiate(itemTemplate));

    return result;
  };

  return {

    instantiate: instantiate

  };

}]);
