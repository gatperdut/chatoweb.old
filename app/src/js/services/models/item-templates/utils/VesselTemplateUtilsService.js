'use strict';

angular.module('chatoWeb')

.service('VesselTemplateUtilsService', ['ConstantsCache', function(ConstantsCache) {

  var empty = function() {
    var result = {
      drink: {
        current: 4,
        max: 4,
        fluid: ConstantsCache.storage.fluids[0]
      }
    };

    return result;
  };

  return {

    empty: empty

  };

}]);
