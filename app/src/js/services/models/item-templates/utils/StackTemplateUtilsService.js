'use strict';

angular.module('chatoWeb')

.service('StackTemplateUtilsService', [function() {

  var empty = function() {
    return {
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
