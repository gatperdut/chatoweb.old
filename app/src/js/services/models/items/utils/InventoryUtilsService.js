'use strict';

angular.module('chatoWeb')

.service('InventoryUtilsService', ['LidUtilsService', function(LidUtilsService) {

  var instantiate = function(parent, parentType) {
    if (!parent.inventory_template) {
      return null;
    }

    var result = {
      parent_type: parentType,
      lid: LidUtilsService.instantiate(parent)
    };

    return result;
  };

  return {

    instantiate: instantiate

  };

}]);