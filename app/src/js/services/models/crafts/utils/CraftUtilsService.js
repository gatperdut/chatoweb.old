'use strict';

angular.module('chatoWeb')

.service('CraftUtilsService', ['UtilsService', 'CraftStepUtilsService', 'CraftIngredientUtilsService', 'CraftItemResultUtilsService', function(UtilsService, CraftStepUtilsService, CraftIngredientUtilsService, CraftItemResultUtilsService) {

  var empty = function() {
    return {
      category:          null,
      name:              null,
      craft_ingredients: [],
      craft_steps:       []
    };
  };

  var attributize = function(craft) {
    var result = angular.copy(craft);

    UtilsService.attributize(result, 'craft_ingredients');
    UtilsService.attributize(result, 'craft_steps');
    _.each(CraftStepUtilsService.filter(result.craft_steps_attributes), function(craftStep) {
      UtilsService.attributize(craftStep, 'craft_test');  
      UtilsService.attributize(craftStep, 'craft_item_results');
    });

    return result;
  };

  var auxiliarize = function(craft) {
    _.each(craft.craft_ingredients, function(craftIngredient) {
      CraftIngredientUtilsService.auxiliarize(craftIngredient);
    });

    _.each(craft.craft_steps, function(craftStep) {
      CraftStepUtilsService.auxiliarize(craftStep);
    })
  };

  var title = function(craft) {
    return craft.category + ' ' + craft.name;
  };

  var echoReferences = {
    ingredientIndex: function(echo) {
      if (!echo) {
        return [];
      }
      var matches = echo.match(/\$[0-9]+/g);
      if (!matches) {
        return [];
      }
      return _.map(matches, function(m) {
        return m.substring(1);
      });
    },
    crafterOrPronoun: function(echo) {
      if (!echo) {
        return null;
      }

      return _.union(echo.match(/\$crafter/g), echo.match(/\$pronoun/g));
    },
    crafter: function(echo) {
      if (!echo) {
        return null;
      }
      return echo.match(/\$crafter/g);
    },
    result: function(echo) {
      if (!echo) {
        return [];
      }
      var matches = echo.match(/\$result[0-9]+/g);
      if (!matches) {
        return [];
      }
      return _.map(matches, function(m) {
        return m.substring(7);
      });
    },
    anythingElse: function(echo) {
      if (!echo) {
        return [];
      }
      return echo.match(/\$((?!([0-9]+|crafter|pronoun|result[0-9]+)).)*$/gm);
    }
  };

  var ingredientIndexes = function(craft) {
    var result = [];
    _.each(CraftIngredientUtilsService.filter(craft.craft_ingredients), function(craftIngredient, index) {
      result.push(index + 1);
    });

    return result;
  };

  var resultIndexes = function(craftStep) {
    var result = [];
    _.each(CraftItemResultUtilsService.filter(craftStep.craft_item_results), function(craftItemResult, index) {
      result.push(index + 1);
    });

    return result;
  };

  return {

    empty: empty,

    auxiliarize: auxiliarize,

    attributize: attributize,

    title: title,

    echoReferences: echoReferences,

    ingredientIndexes: ingredientIndexes,

    resultIndexes: resultIndexes

  };

}]);