'use strict';

angular.module('chatoWeb')

.service('MeleeStatUtilsService', [function() {

  var instantiate = function(itemTemplate) {
    return {
      melee_stat: {
        sheathed_desc: itemTemplate.weapon_stat_template.melee_stat_template.sheathed_desc
      }
    };
  };

  return {

    instantiate: instantiate

  };

}]);
