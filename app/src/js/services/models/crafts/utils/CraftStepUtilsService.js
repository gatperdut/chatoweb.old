'use strict';

angular.module('chatoWeb')

.service('CraftStepUtilsService', ['CraftItemResultUtilsService', function(CraftItemResultUtilsService) {

  var empty = function() {
    return {
      echo_first: null,
      echo_third: null,
      hasTest: false,
      delay: 10,
      craft_item_results:  []
    };
  };

  var auxiliarize = function(craftStep) {
    craftStep.hasTest = !!craftStep.craft_test;
    _.each(craftStep.craft_item_results, function(craftItemResult) {
      CraftItemResultUtilsService.auxiliarize(craftItemResult);
    });
  };

  var filter = function(craftSteps) {
    return _.reject(craftSteps, function(craftStep) {
      return !!craftStep._destroy;
    });
  };

  return {

    empty: empty,

    auxiliarize: auxiliarize,

    filter: filter

  };

}]);