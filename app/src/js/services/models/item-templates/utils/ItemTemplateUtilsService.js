'use strict';

angular.module('chatoWeb')

.service('ItemTemplateUtilsService', ['ItemTemplateCommonUtilsService', 'WeaponStatTemplateUtilsService', 'ArmorStatTemplateUtilsService', 'StackTemplateUtilsService', 'EdibleTemplateUtilsService', 'VesselTemplateUtilsService', 'UtilsService', function(ItemTemplateCommonUtilsService, WeaponStatTemplateUtilsService, ArmorStatTemplateUtilsService, StackTemplateUtilsService, EdibleTemplateUtilsService, VesselTemplateUtilsService, UtilsService) {

  var empty = {
    plain: function() {
      var result = ItemTemplateCommonUtilsService.empty(true, false);
      return result;
    },
    weapon: {
      melee: function() {
        var result = ItemTemplateCommonUtilsService.empty(true, true);
        result = _.extend(result, WeaponStatTemplateUtilsService.empty.melee());
        return result;
      },
      ranged: function() {
        var result = ItemTemplateCommonUtilsService.empty(true, true);
        result = _.extend(result, WeaponStatTemplateUtilsService.empty.ranged());
        return result;
      },
    },
    armor: function() {
      var result = ItemTemplateCommonUtilsService.empty(true, true);
      result = _.extend(result, ArmorStatTemplateUtilsService.empty());
      return result;
    },
    stack: function() {
      var result = ItemTemplateCommonUtilsService.empty(false, false);
      result = _.extend(result, StackTemplateUtilsService.empty());
      return result;
    },
    edible: function() {
      var result = ItemTemplateCommonUtilsService.empty(false, false);
      result = _.extend(result, EdibleTemplateUtilsService.empty());
      return result;
    },
    vessel: function() {
      var result = ItemTemplateCommonUtilsService.empty(true, false);
      result = _.extend(result, VesselTemplateUtilsService.empty());
      return result;
    }
  };

  var attributize = function(itemTemplate) {
    var result = angular.copy(itemTemplate);

    UtilsService.attributize(result, 'armor_stat_template');
    UtilsService.attributize(result, 'weapon_stat_template');
    UtilsService.attributize(result, 'weapon_stat_template_attributes.melee_stat_template');
    UtilsService.attributize(result, 'weapon_stat_template_attributes.ranged_stat_template');
    UtilsService.attributize(result, 'weapon_stat_template_attributes.ranged_stat_template_attributes.inventory_template');
    UtilsService.attributize(result, 'food');
    UtilsService.attributize(result, 'drink');
    UtilsService.attributize(result, 'utils');
    UtilsService.attributize(result, 'variable_set_template');
    UtilsService.attributize(result, 'inventory_template');
    UtilsService.attributize(result, 'inventory_template_attributes.lid_template');
    UtilsService.attributize(result, 'inventory_template_attributes.lid_template_attributes.lock_template');

    return result;
  };

  var whatIs = function(itemTemplate) {
    if (itemTemplate.weapon_stat_template) {
      if (itemTemplate.weapon_stat_template.melee_stat_template) {
        return 'melee';
      }
      if (itemTemplate.weapon_stat_template.ranged_stat_template) {
        return 'ranged';
      }
    }

    if (itemTemplate.armor_stat_template) {
      return 'armor';
    }

    if (itemTemplate.food) {
      return 'edible';
    }

    if (itemTemplate.stack) {
      return 'stack';
    }

    if (itemTemplate.drink) {
      return 'vessel';
    }

    return 'plain';
  };

  var title = function(itemTemplate) {
    return '[' + itemTemplate.code + '] ' + itemTemplate.short_desc;
  }

  return {

    empty: empty,

    attributize: attributize,

    whatIs: whatIs,

    title: title

  };

}]);