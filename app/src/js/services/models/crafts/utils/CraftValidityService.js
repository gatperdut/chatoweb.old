'use strict';

angular.module('chatoWeb')

.service('CraftValidityService', ['CraftUtilsService', 'CraftIngredientUtilsService', 'CraftStepUtilsService', 'CraftItemResultUtilsService', 'ConstantsCache', function(CraftUtilsService, CraftStepUtilsService, CraftIngredientUtilsService, CraftItemResultUtilsService, ConstantsCache) {

  var echo = {
    indexReferences: {
      noneInvalid: function(craftStep) {
        return _.union(
                 CraftUtilsService.echoReferences.anythingElse(craftStep.echo_first),
                 CraftUtilsService.echoReferences.anythingElse(craftStep.echo_third)
               );
      },
      nonRepeat: {
        withinStep: function(craftStep) {
          if (!craftStep.echo_first && !craftStep.echo_third) {
            return true;
          }

          var echoFirstRefs = CraftUtilsService.echoReferences.ingredientIndex(craftStep.echo_first);
          var echoThirdRefs = CraftUtilsService.echoReferences.ingredientIndex(craftStep.echo_third);

          return echoFirstRefs.length == _.uniq(echoFirstRefs).length &&
                 echoThirdRefs.length == _.uniq(echoThirdRefs).length;
        },
        withinCraft: function(craft) {
          var echoFirstRefs = [];
          var echoThirdRefs = [];
          
          _.each(CraftStepUtilsService.filter(craft.craft_steps), function(craftStep) {
            echoFirstRefs = echoFirstRefs.concat(CraftUtilsService.echoReferences.ingredientIndex(craftStep.echo_first));
            echoThirdRefs = echoThirdRefs.concat(CraftUtilsService.echoReferences.ingredientIndex(craftStep.echo_third));
          });

          return echoFirstRefs.length == _.uniq(echoFirstRefs).length &&
                 echoThirdRefs.length == _.uniq(echoThirdRefs).length;
        }
      },
      withinBounds: function(craft, craftStep) {
        if (!craftStep.echo_first && !craftStep.echo_third) {
          return true;
        }
        var ingredientsCount = CraftIngredientUtilsService.filter(craft.craft_ingredients).length;

        var echoFirstRefs = CraftUtilsService.echoReferences.ingredientIndex(craftStep.echo_first);
        var echoThirdRefs = CraftUtilsService.echoReferences.ingredientIndex(craftStep.echo_third);

        var echoRefs = _.union(echoFirstRefs, echoThirdRefs);

        var valid = true;
        _.each(echoRefs, function(echoRef) {
          if (echoRef < 1 || echoRef > ingredientsCount) {
            valid = false;
          }
        })

        return valid;
      },
      onceEach: function(craft) {
        if (!CraftStepUtilsService.filter(craft.craft_steps).length) {
          return true;
        }
        var echoRefs = [];
        
        _.each(CraftStepUtilsService.filter(craft.craft_steps), function(craftStep) {
          echoRefs = echoRefs.concat(CraftUtilsService.echoReferences.ingredientIndex(craftStep.echo_first));
        });

        return _.uniq(echoRefs).length == CraftIngredientUtilsService.filter(craft.craft_ingredients).length;
      },
      same: function(craftStep) {
        if (!craftStep.echo_first && !craftStep.echo_third) {
          return true;
        }
        var echoFirstRefs = CraftUtilsService.echoReferences.ingredientIndex(craftStep.echo_first);
        var echoThirdRefs = CraftUtilsService.echoReferences.ingredientIndex(craftStep.echo_third);

        var intersectionLength = _.intersection(echoFirstRefs, echoThirdRefs).length;

        return intersectionLength == echoFirstRefs.length &&
               intersectionLength == echoThirdRefs.length;
      },
      none: function(craftStep) {
        if (!craftStep.fail_first && !craftStep.fail_third) {
          return true;
        }

        var failFirstRefs = CraftUtilsService.echoReferences.ingredientIndex(craftStep.fail_first);
        var failThirdRefs = CraftUtilsService.echoReferences.ingredientIndex(craftStep.fail_third);

        return !failFirstRefs.length && !failThirdRefs.length;
      }
    },
    noCrafterOrPronounPresent: function(craftStep, echo) {
      if (!craftStep[echo]) {
        return true;
      }

      var echoMatches = CraftUtilsService.echoReferences.crafterOrPronoun(craftStep[echo]);

      return !echoMatches || echoMatches.length == 0;
    },
    crafterPresent: function(craftStep, echo) {
      if (!craftStep[echo]) {
        return true;
      }

      var echoMatches = CraftUtilsService.echoReferences.crafter(craftStep[echo]);

      return echoMatches && echoMatches.length == 1;
    },
    result: {
      present: function(craftStep) {
        var echoFirstRefs = CraftUtilsService.echoReferences.result(craftStep.echo_first);
        var echoThirdRefs = CraftUtilsService.echoReferences.result(craftStep.echo_third);

        var resultIndexes = CraftUtilsService.resultIndexes(craftStep);
        resultIndexes = _.map(resultIndexes, function(resultIndex) {
          return '' + resultIndex;
        });

        var intersectionFirstLength = _.intersection(echoFirstRefs, resultIndexes).length;
        var intersectionThirdLength = _.intersection(echoThirdRefs, resultIndexes).length;

        var differenceFirstLength = _.difference(echoFirstRefs, resultIndexes).length;
        var differenceThirdLength = _.difference(echoThirdRefs, resultIndexes).length;

        var desiredLength = CraftItemResultUtilsService.filter(craftStep.craft_item_results).length;;

        return intersectionFirstLength == desiredLength &&
               intersectionThirdLength == desiredLength &&
               differenceFirstLength   == 0             &&
               differenceThirdLength   == 0;
      },
      none: function(craftStep) {
        var failFirstRefs = CraftUtilsService.echoReferences.result(craftStep.fail_first);
        var failThirdRefs = CraftUtilsService.echoReferences.result(craftStep.fail_third);

        return failFirstRefs.length == 0 && failThirdRefs.length == 0;
      }
    }
  };

  var ingredient = {
    present: function(craftIngredient) {
      return !!craftIngredient.auxItemTemplates.length;
    },
    materialTypeMatches: function(craftIngredient) {
      if (!craftIngredient.auxItemTemplates.length) {
        return true;
      }

      var materialType = craftIngredient.auxItemTemplates[0].variable_set_template.material_type;
      var matching = true;

      _.each(craftIngredient.auxItemTemplates, function(auxItemTemplate) {
        if (auxItemTemplate.variable_set_template.material_type != materialType) {
          matching = false;
        }
      });
      return matching;
    }
  };

  var materialIndex = {
    needed: function(craftItemResult) {
      return !!(craftItemResult.auxItemTemplate && craftItemResult.auxItemTemplate.variable_set_template.material_type);
    },
    present: function(craft, craftItemResult) {
      if (!materialIndex.needed(craftItemResult)) {
        return true;
      }
      if (!craftItemResult.hasMaterialIngredientIndex) {
        return false;
      }

      return !!craftItemResult.material_ingredient_index;
    },
    withinBounds: function(craft, craftItemResult) {
      if (!materialIndex.needed(craftItemResult) || !materialIndex.present(craft, craftItemResult)) {
        return true;
      }
      var index = craftItemResult.material_ingredient_index;
      if (index == undefined) {
        return true;
      }
      return index <= CraftIngredientUtilsService.filter(craft.craft_ingredients).length;
    },
    hasAssociatedItemTemplate: function(craft, craftItemResult) {
      if (!materialIndex.needed(craft, craftItemResult) || !materialIndex.present(craft, craftItemResult) || !materialIndex.withinBounds(craft, craftItemResult)) {
        return true;
      }
      var index = craftItemResult.material_ingredient_index - 1;
      var ingredient = CraftIngredientUtilsService.filter(craft.craft_ingredients)[index];
      return ingredient.auxItemTemplates.length > 0;
    },
    hasAssociatedMaterial: function(craft, craftItemResult) {
      if (!materialIndex.needed(craft, craftItemResult) || !materialIndex.present(craft, craftItemResult) || !materialIndex.withinBounds(craft, craftItemResult) || !materialIndex.hasAssociatedItemTemplate(craft, craftItemResult)) {
        return true;
      }
      var index = craftItemResult.material_ingredient_index - 1;
      var ingredient = CraftIngredientUtilsService.filter(craft.craft_ingredients)[index];
      return !!ingredient.auxItemTemplates[0].variable_set_template.material_type;
    },
    materialMatches: function(craft, craftItemResult) {
      if (!materialIndex.needed(craftItemResult) || !materialIndex.present(craft, craftItemResult) || !materialIndex.withinBounds(craft, craftItemResult) || !materialIndex.hasAssociatedItemTemplate(craft, craftItemResult) || !materialIndex.hasAssociatedMaterial(craft, craftItemResult)) {
        return true;
      }

      var index = craftItemResult.material_ingredient_index - 1;
      var ingredient = CraftIngredientUtilsService.filter(craft.craft_ingredients)[index];
      
      if (!ingredient.auxItemTemplates.length) {
        return false;
      }

      var armorSources  = ConstantsCache.storage.materials.types.sources.armor;
      var weaponSources = ConstantsCache.storage.materials.types.sources.weapons;

      var virtualIngredientMaterialTypes = [ingredient.auxItemTemplates[0].variable_set_template.material_type];

      if (!ingredient.auxItemTemplates[0].armor_stat_template && craftItemResult.auxItemTemplate.armor_stat_template) {
        virtualIngredientMaterialTypes = armorSources[craftItemResult.auxItemTemplate.variable_set_template.material_type];
      }

      if (!ingredient.auxItemTemplates[0].weapon_stat_template && craftItemResult.auxItemTemplate.weapon_stat_template) {
        virtualIngredientMaterialTypes = weaponSources[craftItemResult.auxItemTemplate.variable_set_template.material_type];
      }

      return _.include(virtualIngredientMaterialTypes, ingredient.auxItemTemplates[0].variable_set_template.material_type);
    }
  };

  return {

    echo: echo,

    ingredient: ingredient,

    materialIndex: materialIndex

  };

}]);