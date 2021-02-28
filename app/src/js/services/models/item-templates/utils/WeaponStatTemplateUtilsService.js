'use strict';

angular.module('chatoWeb')

.service('WeaponStatTemplateUtilsService', ['ConstantsCache', 'MeleeStatTemplateUtilsService', 'RangedStatTemplateUtilsService', function(ConstantsCache, MeleeStatTemplateUtilsService, RangedStatTemplateUtilsService) {

  var empty = {
    melee: function() {
      var result = {
        weapon_stat_template: {
          grip: ConstantsCache.storage.weaponInfo.grips[0],
          base: ConstantsCache.storage.weaponInfo.melee_bases[0]
        }
      };
      result.weapon_stat_template = _.extend(result.weapon_stat_template, MeleeStatTemplateUtilsService.empty());
      return result;
    },
    ranged: function() {
      var result = {
        weapon_stat_template: {
          grip: ConstantsCache.storage.weaponInfo.grips[2],
          base: ConstantsCache.storage.weaponInfo.ranged_bases[0]
        }
      };
      result.weapon_stat_template = _.extend(result.weapon_stat_template, RangedStatTemplateUtilsService.empty());
      return result;
    }
  };

  return {

    empty: empty

  };

}]);