'use strict';

angular.module('chatoWeb')

.service('LockUtilsService', [function() {

  var instantiate = function(parent) {
    if (!parent.inventory_template.lid_template.lock_template) {
      return null;
    }
    return {
      parent_type: 'Lid',
      locked: parent.inventory_template.lid_template.lock_template.locked
    };
  };

  return {

    instantiate: instantiate

  };

}]);