'use strict';

angular.module('chatoWeb')

.service('MapTransitionService', [function() {

  var transition = {
    area: {
      id: null,
      set: function(id) {
        transition.area.id = id;
      }
    },
    room: {
      id: null,
      set: function(id) {
        transition.room.id = id;
      }
    },
    edge: {
      id: null,
      set: function(id) {
        transition.edge.id = id;
      }
    }
  };


  return {

    transition: transition

  }
}]);