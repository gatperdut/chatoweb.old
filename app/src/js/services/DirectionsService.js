'use strict';

angular.module('chatoWeb')

.service('DirectionsService', [function() {

  var increment = {
    x: {
      n:  0,
      e:  1,
      s:  0,
      w: -1,
      u:  0,
      d:  0
    },
    y: {
      n: -1,
      e:  0,
      s:  1,
      w:  0,
      u:  0,
      d:  0
    },
    z: {
      n:  0,
      e:  0,
      s:  0,
      w:  0,
      u:  1,
      d: -1
    }
  };

  var list = {
    all:        ['n', 'e', 's', 'w', 'u', 'd'],
    sameLevel:  ['n', 'e', 's', 'w'],
    interLevel: ['u', 'd' ]
  };

  var name = function(dir) {
    switch(dir) {
      case 'n':
        return 'north';
      case 'e':
        return 'east';
      case 's':
        return 'south';
      case 'w':
        return 'west';
      case 'u':
        return 'up';
      case 'd':
        return 'down';
      default:
        console.error('Wrong direction for name!');
    }
  };

  var opposite = {
    simple: function(dir) {
      switch(dir) {
        case 'n':
          return 's';
        case 'e':
          return 'w';
        case 's':
          return 'n';
        case 'w':
          return 'e';
        case 'u':
          return 'd';
        case 'd':
          return 'u';
        default:
          console.error('Wrong direction for simple opposite!');
      }
    },
    name: function(dir) {
      switch(dir) {
        case 'n':
          return 'south';
        case 'e':
          return 'west';
        case 's':
          return 'north';
        case 'w':
          return 'east';
        case 'u':
          return 'down';
        case 'd':
          return 'uup';
        default:
          console.error('Wrong direction for simple opposite!');
      }
    },
    id: {
      room: function(dir) {
        switch(dir) {
          case 'n':
            return 'sr_id';
          case 'e':
            return 'wr_id';
          case 's':
            return 'nr_id';
          case 'w':
            return 'er_id';
          case 'u':
            return 'dr_id';
          case 'd':
            return 'ur_id';
          default:
            console.error('Wrong direction for opposite room id!');
        }
      },
      door: function(dir) {
        switch(dir) {
          case 'n':
            return 'sd_id';
          case 'e':
            return 'wd_id';
          case 's':
            return 'nd_id';
          case 'w':
            return 'ed_id';
          case 'u':
            return 'dd_id';
          case 'd':
            return 'ud_id';
          default:
            console.error('Wrong direction for opposite door id!');
        }
      }
    }
  };

  return {

    increment: increment,

    list: list,

    name: name,

    opposite: opposite


  };

}]);