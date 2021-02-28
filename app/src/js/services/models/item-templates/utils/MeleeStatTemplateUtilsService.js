'use strict';

angular.module('chatoWeb')

.service('MeleeStatTemplateUtilsService', [function() {

  var empty = function() {
    return {
      melee_stat_template: {
        sheathed_desc: ''
      }
    };
  };

  return {

    empty: empty

  };

}]);
