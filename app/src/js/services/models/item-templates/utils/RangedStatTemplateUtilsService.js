'use strict';

angular.module('chatoWeb')

.service('RangedStatTemplateUtilsService', ['ConstantsCache', 'InventoryTemplateUtilsService', function(ConstantsCache, InventoryTemplateUtilsService) {

  var empty = function() {
    return {
      ranged_stat_template: {
        inventory_template: {
          parent_type: InventoryTemplateUtilsService.empty('RangedStat')
        },
        missile_type: ConstantsCache.storage.weaponInfo.missile_types[0],
        can_remain_loaded: false,
        ranges_suitability: ConstantsCache.storage.weaponInfo.missile_ranges
      }
    };
  };

  return {

    empty: empty

  };

}]);
