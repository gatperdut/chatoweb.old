'use strict';

angular.module('chatoWeb')

.service('MaterialUtilsService', [function() {

  var validDesc = function(desc) {
    return desc && desc.indexOf('$material') >= 0;
  };

  return {

    validDesc: validDesc

  };

}]);