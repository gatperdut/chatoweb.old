'use strict';

angular.module('chatoWeb')

.service('StackUtilsService', [function() {

  var instantiate = function(itemTemplate) {
    return {
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
