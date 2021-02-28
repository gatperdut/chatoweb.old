'use strict';

angular.module('chatoWeb')

.service('CraftIngredientUtilsService', ['$q', 'ItemTemplateService', 'ConstantsCache', function($q, ItemTemplateService, ConstantsCache) {

  var empty = function() {
    return {
      auxItemTemplates:    [],
      item_template_codes: [],
      location:   ConstantsCache.storage.ingredients.locations[0],
      usage_type: ConstantsCache.storage.ingredients.usage_types[0],
      how_many:   1
    };
  };

  var auxiliarize = function(craftIngredient) {
    craftIngredient.auxItemTemplates = [];
    var calls = [];
    _.each(craftIngredient.item_template_codes, function(itemTemplateCode) {
      calls.push(ItemTemplateService.getByCode(itemTemplateCode));
    });
    $q.all(calls).then(
      function(response) {
        _.each(craftIngredient.item_template_codes, function(itemTemplateCode, index) {
          craftIngredient.auxItemTemplates.push(response[index]);
        })
      }
    );
  };

  var filter = function(craftIngredients) {
    return _.reject(craftIngredients, function(ingredient) {
      return !!ingredient._destroy;
    });
  };

  return {

    empty: empty,

    auxiliarize: auxiliarize,

    filter: filter

  };

}]);