'use strict';

angular.module('chatoWeb')

.service('VesselUtilsService', ['ConstantsCache', function(ConstantsCache) {

  var instantiate = function(itemTemplate) {
    var result = {
      drink: {
        current: itemTemplate.drink.max,
        max: itemTemplate.drink.max,
        fluid: itemTemplate.drink.fluid
      }
    };

    return result;
  };

  return {

    instantiate: instantiate

  };

}]);
