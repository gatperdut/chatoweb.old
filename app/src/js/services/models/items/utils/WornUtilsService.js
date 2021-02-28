'use strict';

angular.module('chatoWeb')

.service('WornUtilsService', [function() {

  var instantiate = function(itemTemplate) {
    return {
      slot: 'void',
      possible_slots: angular.copy(itemTemplate.possible_slots)
    };
  };

  return {

    instantiate: instantiate

  };

}]);
