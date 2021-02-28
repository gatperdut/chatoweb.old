'use strict';

angular.module('chatoWeb')

.service('ItemUtilsService', ['ItemTemplateUtilsService', 'ItemCommonUtilsService', 'WeaponStatUtilsService', 'ArmorStatUtilsService', 'StackUtilsService', 'EdibleUtilsService', 'VesselUtilsService', 'UtilsService', function(ItemTemplateUtilsService, ItemCommonUtilsService, WeaponStatUtilsService, ArmorStatUtilsService, StackUtilsService, EdibleUtilsService, VesselUtilsService, UtilsService) {

  var instantiateInternal = {
    plain: function(itemTemplate) {
      var result = ItemCommonUtilsService.instantiate(itemTemplate);
      return result;
    },
    melee: function(itemTemplate) {
      var result = ItemCommonUtilsService.instantiate(itemTemplate);
      result = _.extend(result, WeaponStatUtilsService.instantiate.melee(itemTemplate));
      return result;
    },
    ranged: function(itemTemplate) {
      var result = ItemCommonUtilsService.instantiate(itemTemplate);
      result = _.extend(result, WeaponStatUtilsService.instantiate.ranged(itemTemplate));
      return result;
    },
    armor: function(itemTemplate) {
      var result = ItemCommonUtilsService.instantiate(itemTemplate);
      result = _.extend(result, ArmorStatUtilsService.instantiate(itemTemplate));
      return result;
    },
    stack: function(itemTemplate) {
      var result = ItemCommonUtilsService.instantiate(itemTemplate);
      result = _.extend(result, StackUtilsService.instantiate(itemTemplate));
      return result;
    },
    edible: function(itemTemplate) {
      var result = ItemCommonUtilsService.instantiate(itemTemplate);
      result = _.extend(result, EdibleUtilsService.instantiate(itemTemplate));
      return result;
    },
    vessel: function(itemTemplate) {
      var result = ItemCommonUtilsService.instantiate(itemTemplate);
      result = _.extend(result, VesselUtilsService.instantiate(itemTemplate));
      return result;
    }
  };

  var instantiate = function(itemTemplate) {
    return instantiateInternal[ItemTemplateUtilsService.whatIs(itemTemplate)](itemTemplate);
  };

  var attributize = function(itemTemplate) {
    var result = angular.copy(itemTemplate);

    UtilsService.attributize(result, 'armor_stat');
    UtilsService.attributize(result, 'weapon_stat');
    UtilsService.attributize(result, 'weapon_stat_attributes.melee_stat');
    UtilsService.attributize(result, 'weapon_stat_attributes.ranged_stat');
    UtilsService.attributize(result, 'weapon_stat_attributes.ranged_stat_attributes.inventory');
    UtilsService.attributize(result, 'food');
    UtilsService.attributize(result, 'drink');
    UtilsService.attributize(result, 'stack');
    UtilsService.attributize(result, 'variable_set');
    UtilsService.attributize(result, 'inventory');
    UtilsService.attributize(result, 'inventory_attributes.lid');
    UtilsService.attributize(result, 'inventory_attributes.lid_attributes.lock');

    return result;
  };

  var whatIs = function(item) {
    if (item.weapon_stat) {
      if (item.weapon_stat.melee_stat) {
        return 'melee';
      }
      if (item.weapon_stat.ranged_stat) {
        return 'ranged';
      }
    }

    if (item.armor_stat) {
      return 'armor';
    }

    if (item.food) {
      return 'edible';
    }

    if (item.drink) {
      return 'vessel';
    }

    return 'plain';
  };

  var resetDescs = function(item, original) {
    _.each(['short_desc', 'long_desc', 'full_desc'], function(desc) {
      var updatedDesc = original[desc];

      if (item.variable_set.material) {
        updatedDesc = updatedDesc.replace('$material', item.variable_set.material);
      }

      if (item.variable_set.has_craftmanship && item.variable_set.craftmanship) {
        updatedDesc = updatedDesc.replace('$craftmanship', item.variable_set.craftmanship);
      }

      item[desc] = updatedDesc;
    });
  };

  return {

    instantiate: instantiate,

    attributize: attributize,

    whatIs: whatIs,

    resetDescs: resetDescs

  };

}]);