'use strict';

angular.module('chatoWeb')

.service('LockTemplateUtilsService', [function() {

  var empty = function(parentType) {
    return {
      parent_type: parentType
    };
  };

  return {

    empty: empty

  };

}]);