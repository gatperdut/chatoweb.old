'use strict';

angular.module('chatoWeb')

.service('WeaponStatUtilsService', ['ConstantsCache', 'MeleeStatUtilsService', 'RangedStatUtilsService', function(ConstantsCache, MeleeStatUtilsService, RangedStatUtilsService) {

  var common = function(weaponStatTemplate) {
    var result = {
      weapon_stat: {
        grip: weaponStatTemplate.grip,
        base: weaponStatTemplate.base,
        roll_mod:     0,
        critical_mod: 0
      }
    };

    return result;
  };

  var instantiate = {
    melee: function(itemTemplate) {
      var result = common(itemTemplate.weapon_stat_template);
      result.weapon_stat = _.extend(result.weapon_stat, MeleeStatUtilsService.instantiate(itemTemplate));
      return result;
    },
    ranged: function(itemTemplate) {
      var result = common(itemTemplate.weapon_stat_template);
      result.weapon_stat = _.extend(result.weapon_stat, RangedStatUtilsService.instantiate(itemTemplate));
      return result;
    }
  };

  var update = function(item) {
    item.weapon_stat.roll_mod     = 0;
    item.weapon_stat.critical_mod = 0;

    if (item.variable_set.material) {
      item.weapon_stat.roll_mod     += ConstantsCache.storage.materials.weapon_modifiers.roll[item.variable_set.material];
      item.weapon_stat.critical_mod += ConstantsCache.storage.materials.weapon_modifiers.critical[item.variable_set.material];
    }

    if (item.variable_set.craftmanship) {
      item.weapon_stat.roll_mod     += ConstantsCache.storage.craftmanships.weapon_modifiers.roll[item.variable_set.craftmanship];
      item.weapon_stat.critical_mod += ConstantsCache.storage.craftmanships.weapon_modifiers.critical[item.variable_set.craftmanship];
    }
  };

  return {

    instantiate: instantiate,

    update: update

  };

}]);