'use strict';

angular.module('chatoWeb')

.service('LidUtilsService', ['LockUtilsService', function(LockUtilsService) {

  var instantiate = function(parent) {
    if (!parent.inventory_template.lid_template) {
      return null;
    }

    return {
      open: parent.inventory_template.lid_template.open,
      lock: LockUtilsService.instantiate(parent)
    };
  };

  return {

    instantiate: instantiate

  };

}]);