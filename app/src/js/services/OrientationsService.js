'use strict';

angular.module('chatoWeb')

.service('OrientationsService', [function() {

  var list = [
    ['nr_id', 'sr_id'],
    ['sr_id', 'nr_id'],

    ['er_id', 'wr_id'],
    ['wr_id', 'er_id'],

    ['ur_id', 'dr_id'],
    ['dr_id', 'ur_id']
  ];

  var doorIds = function(room1, room2) {
    var hash = {};

    var coords = {
      x: room1.x - room2.x,
      y: room1.y - room2.y,
      z: room1.z - room2.z
    };
    
    if (coords.x > 0) {
      hash.wr_id = room2.id;
      hash.er_id = room1.id;
    }
    if (coords.x < 0) {
      hash.wr_id = room1.id;
      hash.er_id = room2.id;
    }

    if (coords.y > 0) {
      hash.sr_id = room1.id;
      hash.nr_id = room2.id;
    }
    if (coords.y < 0) {
      hash.sr_id = room2.id;
      hash.nr_id = room1.id;
    }

    if (coords.z > 0) {
      hash.ur_id = room1.id;
      hash.dr_id = room2.id;
    }
    if (coords.z < 0) {
      hash.ur_id = room2.id;
      hash.dr_id = room1.id;
    }

    return hash;
  };

  return {

    list: list,

    doorIds: doorIds

  };

}]);