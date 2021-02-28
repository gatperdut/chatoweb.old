'use strict';

angular.module('chatoWeb')

.service('RangedStatUtilsService', ['ConstantsCache', 'InventoryUtilsService', function(ConstantsCache, InventoryUtilsService) {

  var instantiate = function(itemTemplate) {
    return {
      ranged_stat: {
        inventory: InventoryUtilsService.instantiate(itemTemplate.weapon_stat_template.ranged_stat_template, 'RangedStat'),
        missile_type: itemTemplate.weapon_stat_template.ranged_stat_template.missile_type,
        can_remain_loaded: itemTemplate.weapon_stat_template.ranged_stat_template.can_remain_loaded,
        ranges_suitability: itemTemplate.weapon_stat_template.ranged_stat_template.ranges_suitability
      }
    };
  };

  return {

    instantiate: instantiate

  };

}]);
