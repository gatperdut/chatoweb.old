'use strict';

angular.module('chatoWeb')

.service('EdibleTemplateUtilsService', [function() {

  var empty = function() {
    return {
      food: {
        current: 4,
        max: 4
      },
      stack: {
        current: 1,
        max: 1
      }
    };
  };

  return {

    empty: empty

  };

}]);
