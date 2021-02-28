'use strict';

angular.module('chatoWeb')

.service('ArmorStatTemplateUtilsService', ['ConstantsCache', function(ConstantsCache) {

  var empty = function() {
    var result = {
      armor_stat_template: {
        base: null,
        maneuver_impediment: ConstantsCache.storage.armorInfo.maneuver_impediments[0],
        ranged_attack_impediment: ConstantsCache.storage.armorInfo.ranged_attack_impediments[0],
        body_parts: []
      }
    };

    return result;
  };

  return {

    empty: empty

  };

}]);
        