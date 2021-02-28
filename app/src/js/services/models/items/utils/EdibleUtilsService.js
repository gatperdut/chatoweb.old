'use strict';

angular.module('chatoWeb')

.service('EdibleUtilsService', [function() {

  var instantiate = function(itemTemplate) {
    return {
      food: {
        current: itemTemplate.food.max,
        max: itemTemplate.food.max
      },
      stack: {
        current: itemTemplate.stack.max,
        max: itemTemplate.stack.max
      }
    };
  };

  return {

    instantiate: instantiate

  };

}]);
