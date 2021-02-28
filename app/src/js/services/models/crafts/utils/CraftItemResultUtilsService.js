'use strict';

angular.module('chatoWeb')

.service('CraftItemResultUtilsService', ['ItemTemplateService', function(ItemTemplateService) {

  var empty = function() {
    return {
      auxItemTemplate:    null,
      item_template_code: null,
      hasHowMany:         false,
      hasMaterialIngredientIndex: false
    };
  };

  var auxiliarize = function(craftItemResult) {
    if (craftItemResult.item_template_code) {
      ItemTemplateService.getByCode(craftItemResult.item_template_code).then(
        function(itemTemplate) {
          craftItemResult.auxItemTemplate = itemTemplate;
          craftItemResult.hasHowMany = !!craftItemResult.auxItemTemplate.stack;
        }
      );
    }
    craftItemResult.hasMaterialIngredientIndex = !!craftItemResult.material_ingredient_index;
  };

  var filter = function(craftItemResults) {
    return _.reject(craftItemResults, function(craftItemResult) {
      return !!craftItemResult._destroy;
    });
  };

  return {

    empty: empty,

    auxiliarize: auxiliarize,

    filter: filter

  };

}]);