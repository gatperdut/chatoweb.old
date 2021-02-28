'use strict';

angular.module('chatoWeb')

.service('ArmorStatUtilsService', ['ConstantsCache', function(ConstantsCache) {

  var instantiate = function(itemTemplate) {
    var result = {
      armor_stat: {
        base: itemTemplate.armor_stat_template.base,
        level: ConstantsCache.storage.armorInfo.level_per_base[itemTemplate.armor_stat_template.base],
        maneuver_impediment: itemTemplate.armor_stat_template.maneuver_impediment,
        ranged_attack_impediment: itemTemplate.armor_stat_template.ranged_attack_impediment,
        body_parts: angular.copy(itemTemplate.armor_stat_template.body_parts),
        level_mod:    0,
        roll_mod:     0,
        critical_mod: 0
      }
    };

    return result;
  };

  var update = function(item) {
    item.armor_stat.level_mod    = 0;
    item.armor_stat.roll_mod     = 0;
    item.armor_stat.critical_mod = 0;

    if (item.variable_set.material) {
      item.armor_stat.level_mod    += ConstantsCache.storage.materials.armor_modifiers.level[item.variable_set.material];
      item.armor_stat.roll_mod     += ConstantsCache.storage.materials.armor_modifiers.roll[item.variable_set.material];
      item.armor_stat.critical_mod += ConstantsCache.storage.materials.armor_modifiers.critical[item.variable_set.material];
    }

    if (item.variable_set.craftmanship) {
      item.armor_stat.level_mod    += ConstantsCache.storage.craftmanships.armor_modifiers.level[item.variable_set.craftmanship];
      item.armor_stat.roll_mod     += ConstantsCache.storage.craftmanships.armor_modifiers.roll[item.variable_set.craftmanship];
      item.armor_stat.critical_mod += ConstantsCache.storage.craftmanships.armor_modifiers.critical[item.variable_set.craftmanship];
    }

    var maxLevelMod = ConstantsCache.storage.armorInfo.max_level_per_base[item.armor_stat.base] - item.armor_stat.level;
    var minLevelMod = ConstantsCache.storage.armorInfo.min_level_per_base[item.armor_stat.base] - item.armor_stat.level;

    if (item.armor_stat.level_mod > maxLevelMod) {
      item.armor_stat.level_mod = maxLevelMod;
    }

    if (item.armor_stat.level_mod < minLevelMod) {
      item.armor_stat.level_mod = minLevelMod;
    }
  };

  return {

    instantiate: instantiate,

    update: update

  };

}]);
        