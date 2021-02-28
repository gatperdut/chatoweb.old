'use strict';

angular.module('chatoWeb')

.service('SuperareaUtilsService', [function() {

  var title = function(superarea) {
    if (!superarea) {
      return '';
    }
    return superarea.name + ' (' + superarea.id + ')';
  };

  return {

    title: title

  };

}]);