'use strict';

angular.module('chatoWeb')

.service('InventoryTemplateUtilsService', [function() {

  var empty = function(parentType) {
    return {
      parent_type: parentType
    };
  };

  var buildAux = function(parent) {
    parent.inv = {
      present: !!parent.inventory_template,
      lid: {
        present: !!parent.inventory_template && !!parent.inventory_template.lid_template,
        lock: {
          present: !!parent.inventory_template && !!parent.inventory_template.lid_template && !!parent.inventory_template.lid_template.lock_template
        }
      }
    }
  };

  return {

    empty: empty,

    buildAux: buildAux

  };

}]);