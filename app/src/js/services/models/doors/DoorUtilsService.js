'use strict';

angular.module('chatoWeb')

.service('DoorUtilsService', ['DoorCache', 'OrientationsService', function(DoorCache, OrientationsService) {

  var between = function(id1, id2) {
    var door = null;
    var temp;
    var hash;
    _.each(OrientationsService.list, function(orientation) {
      hash = {};
      hash[orientation[0]] = id1;
      hash[orientation[1]] = id2;
      temp = _.findWhere(DoorCache.storage.doors, hash);
      if (!!temp && !door) {
        door = temp;
      }
    });

    return door;
  };

  return {

    between: between

  };

}]);