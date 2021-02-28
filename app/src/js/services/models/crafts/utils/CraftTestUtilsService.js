'use strict';

angular.module('chatoWeb')

.service('CraftTestUtilsService', ['ConstantsCache', function(ConstantsCache) {

  var empty = function() {
    return {
      skill:    ConstantsCache.storage.skills.all[0],
      modifier: 0
    };
  };

  return {

    empty: empty

  };

}]);