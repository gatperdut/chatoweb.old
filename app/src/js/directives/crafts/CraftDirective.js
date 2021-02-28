'use strict';

angular.module('chatoWeb')

.directive('craft', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/crafts/main.html',
    scope: {
      model: '='
    },
    controller: ['$scope', 'CraftUtilsService', 'CraftIngredientUtilsService', 'CraftStepUtilsService', 'CraftTestUtilsService', 'ItemTemplateUtilsService', 'CraftItemResultUtilsService', 'CraftValidityService', 'FireModalService', 'ConstantsCache', 'NotiService', function($scope, CraftUtilsService, CraftIngredientUtilsService, CraftStepUtilsService, CraftTestUtilsService, ItemTemplateUtilsService, CraftItemResultUtilsService, CraftValidityService, FireModalService, ConstantsCache, NotiService) {

      $scope.zero = 0;

      $scope.CraftUtilsService = CraftUtilsService;

      $scope.ItemTemplateUtilsService = ItemTemplateUtilsService;

      $scope.ConstantsCache = ConstantsCache;

      $scope.CraftValidityService = CraftValidityService;

      $scope.CraftIngredientUtilsService = CraftIngredientUtilsService;

      $scope.CraftStepUtilsService = CraftStepUtilsService;

      $scope.CraftItemResultUtilsService = CraftItemResultUtilsService;

      $scope.partials = {
        names:       '/html/directives/crafts/names.html',
        ingredients: '/html/directives/crafts/ingredients.html',
        steps: {
          main:      '/html/directives/crafts/steps/main.html',
          echoes:    '/html/directives/crafts/steps/echoes.html',
          check:     '/html/directives/crafts/steps/check.html',
          results:   '/html/directives/crafts/steps/results.html'
        }
      };

      $scope.add = {
        ingredient: {
          one: function() {
            var length = CraftIngredientUtilsService.filter($scope.model.craft_ingredients).length;
            $scope.model.craft_ingredients.splice(length, 0, CraftIngredientUtilsService.empty());
            NotiService.s('Ingredient added at the end of the list.');
          },
          itemTemplate: function(craftIngredient) {
            FireModalService.open.itemTemplate.picker().then(
              function(itemTemplate) {
                var found = false;

                _.each(craftIngredient.auxItemTemplates, function(auxItemTemplate) {
                  if (auxItemTemplate.code == itemTemplate.code) {
                    found = true;
                  }
                });

                if (found) {
                  return;
                }
                craftIngredient.auxItemTemplates.push(itemTemplate);
                craftIngredient.item_template_codes.push(itemTemplate.code);
              }
            );
          }
        },
        step: {
          one: function() {
            var length = CraftStepUtilsService.filter($scope.model.craft_steps).length;
            $scope.model.craft_steps.splice(length, 0, CraftStepUtilsService.empty());
            NotiService.s('Step added at the end of the list.');
          },
          result: {
            one: function(craftStep) {
              var length = CraftItemResultUtilsService.filter(craftStep.craft_item_results).length;
              craftStep.craft_item_results.splice(length, 0, CraftItemResultUtilsService.empty());
            },
            itemTemplate: function(craftItemResult) {
              FireModalService.open.itemTemplate.picker().then(
                function(itemTemplate) {
                  craftItemResult.auxItemTemplate = itemTemplate;
                  $scope.toggle.craftItemResult.itemTemplate($scope.model, craftItemResult);
                }
              );
            }
          }
        }
      };

      $scope.remove = {
        ingredient: {
          one: function(index) {
            var ingredient = $scope.model.craft_ingredients[index];
            if (ingredient.id) {
              ingredient._destroy = true;
              var removedIngredient = $scope.model.craft_ingredients.splice(index, 1);
              $scope.model.craft_ingredients.push(removedIngredient[0]);
            }
            else {
              $scope.model.craft_ingredients.splice(index, 1);
            }
          },
          itemTemplate: function(craftIngredient, index) {
            craftIngredient.auxItemTemplates.splice(index, 1);
            craftIngredient.item_template_codes.splice(index, 1);
          }
        },
        step: {
          one: function(index) {
            var step = $scope.model.craft_steps[index];
            if (step.id) {
              step._destroy = true
              var removedStep = $scope.model.craft_steps.splice(index, 1);
              $scope.model.craft_steps.push(removedStep[0])
            }
            else {
              $scope.model.craft_steps.splice(index, 1);
            }
          },
          result: function(craftStep, index) {
            var result = craftStep.craft_item_results[index];
            if (result.id) {
              result._destroy = true;
              var removedResult = craftStep.craft_item_results.splice(index, 1);
              craftStep.craft_item_results.push(removedResult[0]);
            }
            else {
              craftStep.craft_item_results.splice(index, 1);
            }
          }
        }
      };

      $scope.toggle = {
        craftStep: {
          hasTest: function(craftStep) {
            if (!craftStep.hasTest) {
              delete craftStep.craft_test;
              craftStep.fail_first = null,
              craftStep.fail_third = null;
            }
            else {
              craftStep.craft_test = CraftTestUtilsService.empty();
            }
          }
        },
        craftItemResult: {
          _craftmanship: function(craft, craftItemResult) {
            var itemTemplate = craftItemResult.auxItemTemplate;

            if (itemTemplate.variable_set_template.has_craftmanship) {
              var craftIngredient = CraftIngredientUtilsService.filter(craft.craft_ingredients)[craftItemResult.material_ingredient_index - 1];

              if (craftItemResult.hasMaterialIngredientIndex &&
                  CraftValidityService.materialIndex.withinBounds(craft, craftItemResult) &&
                  craftIngredient &&
                  craftIngredient.auxItemTemplates.length &&
                  !craftIngredient.auxItemTemplates[0].has_craftmanship)
              {
                craftItemResult.auxBaseOn = 'skill';
                craftItemResult.skill = ConstantsCache.storage.skills.all[0];
              }
              else {
                craftItemResult.auxBaseOn = 'inherit';
                craftItemResult.skill = null;
              }
            } else {
              delete craftItemResult.auxBaseOn;
              delete craftItemResult.skill;
            }
          },
          ingredientMaterialIndex: function(craft, craftItemResult) {
            $scope.toggle.craftItemResult._craftmanship(craft, craftItemResult);
          },
          itemTemplate: function(craft, craftItemResult) {
            var itemTemplate = craftItemResult.auxItemTemplate;
            
            craftItemResult.item_template_code = itemTemplate.code;
            if (itemTemplate.stack) {
              craftItemResult.how_many   = 1;
              craftItemResult.hasHowMany = true;
            }
            else {
              delete craftItemResult.how_many;
              craftItemResult.hasHowMany = false;
            }

            if (itemTemplate.variable_set_template.material_type) {
              craftItemResult.material_ingredient_index = CraftIngredientUtilsService.filter($scope.model.craft_ingredients).length > 0 ? 1 : null;
              craftItemResult.hasMaterialIngredientIndex = true;
            }
            else {
              delete craftItemResult.material_ingredient_index;
              craftItemResult.hasMaterialIngredientIndex = false;
            }

            $scope.toggle.craftItemResult._craftmanship(craft, craftItemResult);
          },
          baseOn: function(craftItemResult) {
            if (craftItemResult.auxBaseOn == 'inherit') {
              delete craftItemResult.skill;
            }
            else {
              craftItemResult.skill = ConstantsCache.storage.skills.all[0];
            }
          } 
        }
      };

    }]
  };
}]);
