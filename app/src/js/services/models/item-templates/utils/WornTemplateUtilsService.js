'use strict';

angular.module('chatoWeb')

.service('WornTemplateUtilsService', [function() {

  var empty = function() {
    return {
      possible_slots: []
    };
  };

  return {

    empty: empty

  };

}]);
