'use strict';

angular.module('chatoWeb')

.service('CraftmanshipUtilsService', [function() {

  var validDesc = function(desc) {
    return desc && desc.indexOf('$craftmanship') >= 0;
  };

  return {

    validDesc: validDesc

  };

}]);