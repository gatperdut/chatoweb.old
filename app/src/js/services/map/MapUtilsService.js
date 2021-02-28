'use strict';

angular.module('chatoWeb')

.service('MapUtilsService', ['DirectionsService', 'DoorUtilsService', 'RoomUtilsService', function(DirectionsService, DoorUtilsService, RoomUtilsService) {

  var emptyData = function() {
    return {
      rooms    : null,
      visited  : null,
      nodes    : null,
      edges    : null,
      level: {
        highest : null,
        lowest  : null
      },
      data : null,
      flatData: {
        nodes: null,
        edges: null
      }
    };
  };

  var buildData = emptyData();

  var reset = function(data, rooms) {
    data.rooms     = rooms;
    data.visited   = [];
    data.nodes     = {};
    data.edges     = {};
    data.level.highest = 0;
    data.level.lowest  = 0;
    data.data = {};
    data.flatData.nodes = [];
    data.flatData.edges = {};
  };

  var can = {
    remove: function(room) {
      if (!room) {
        return false;
      }

      var linkRoom = false;
      _.each(DirectionsService.list.all, function(dir) {
        var adjRoomId = RoomUtilsService.connection(room, dir);
        if (adjRoomId && !find.room.id(adjRoomId)) {
          linkRoom = true;
        }
      });

      if (linkRoom) {
        return false;
      }

      var doorFound = false
      _.each(DirectionsService.list.all, function(dir) {
        if (RoomUtilsService.doorConnection(room, dir)) {
          doorFound = true;
        }
      });
      if (doorFound) {
        return false;
      }

      var tmpData = emptyData();
      reset(tmpData, angular.copy(buildData.rooms));

      _.each(DirectionsService.list.all, function(dir) {
        var r = find.room.id(RoomUtilsService.connection(room, dir), tmpData);
        if (!!r) {
          r[DirectionsService.opposite.id.room(dir)] = null;
        }
      });

      tmpData.rooms = _.reject(tmpData.rooms, function(r) {
        return r.id == room.id;
      });

      if (tmpData.rooms.length) {
        mapRoom(tmpData.rooms[0], tmpData, 0, 0, 0);
      }


      return tmpData.flatData.nodes.length == (buildData.flatData.nodes.length - 1);
    },
    disconnect: function(room, dir) {
      if (RoomUtilsService.doorConnection(room, dir)) {
        return false;
      }

      var adjRoomId = RoomUtilsService.connection(room, dir);
      if (!adjRoomId) {
        return false;
      }

      var tmpData = emptyData();
      reset(tmpData, angular.copy(buildData.rooms));

      var r = find.room.id(adjRoomId, tmpData);
      if (!r) {
        return true;
      }

      var edge = find.edge.between(room.id, r.id);
      if (edge && edge.door) {
        return false;
      }

      r[DirectionsService.opposite.id.room(dir)] = null;

      var thisRoom = find.room.id(room.id, tmpData);
      if (thisRoom) {
        thisRoom[dir + 'r_id'] = null;
      }

      mapRoom(tmpData.rooms[0], tmpData, 0, 0, 0);

      return tmpData.flatData.nodes.length == buildData.flatData.nodes.length;
    }
  };


  var map = function(rooms) {
    reset(buildData, rooms);
    mapRoom(rooms[0], buildData, 0, 0, 0);

    _.each(_.keys(buildData.nodes), function(level) {
      var nodes = new vis.DataSet(buildData.nodes[level]);
      var edges = new vis.DataSet(buildData.edges[level]); 

      //buildData.flatData.nodes = _.extend(buildData.flatData.nodes, nodes._data);
      buildData.flatData.edges = _.extend(buildData.flatData.edges, edges._data);

      buildData.data[level] = {
        nodes: nodes,
        edges: edges
      }
    });
  };

  var mapRoom = function(room, data, x, y, z) {
    if (!data.nodes[z]) {
      data.nodes[z] = [];
    }
    if (!data.edges[z]) {
      data.edges[z] = [];
    }
    if (z > data.level.highest) {
      data.level.highest = z;
    }
    if (z < data.level.lowest) {
      data.level.lowest = z;
    }

    var newNode = {
      id:    room.id,
      label: (room.title.length < 15 ? room.title : room.title.replace(/(.{15})/g,"$1\n")) + '\n         (' + room.id + ')',
      x: x * 150,
      y: y * 150,
      z: z
    };
    data.nodes[z].push(newNode);
    data.flatData.nodes.push(newNode);

    _.each(DirectionsService.list.all, function(dir) {
      var adjRoomId = RoomUtilsService.connection(room, dir);
      if (!adjRoomId) {
        return;
      }
      var adjRoom = find.room.id(adjRoomId, data);
      if (adjRoom) {
        var door = DoorUtilsService.between(room.id, adjRoom.id);
        data.edges[z].push({
          id: room.id + '_to_' + adjRoom.id,
          from: room.id,
          to: adjRoom.id,
          door: door,
          color: door ? 'red' : 'blue',
          width: 2,
          selectionWidth: 4
        });
      }
    });

    data.visited.push(room.id);
    
    _.each(DirectionsService.list.all, function(dir) {
      var adjRoomId = RoomUtilsService.connection(room, dir);
      if (_.includes(data.visited, adjRoomId)) {
        return;
      }
      var adjRoom = find.room.id(adjRoomId, data);
      if (adjRoom) {
        mapRoom(adjRoom, data, x + DirectionsService.increment.x[dir], y + DirectionsService.increment.y[dir], z + DirectionsService.increment.z[dir]);
      }
      else if (adjRoomId) {
        newNode.color = {
          background: 'lightpink',
          border: 'black'
        };
      }
    });
  };

  var find = {
    room: {
      id: function(id, data) {
        if (!data) {
          data = buildData;
        }
        return _.findWhere(data.rooms, { id: id })
      }
    },
    node: {
      id: function(id, data) {
        if (!data) {
          data = buildData;
        }
        return _.findWhere(data.flatData.nodes, { id: id });
      },
      coordinates: function(room, dir, data) {
        if (!room) {
          return null;
        }

        if (!data) {
          data = buildData;
        }

        var roomNode = find.node.id(room.id, data);

        if (!roomNode) {
          return null;
        }

        return _.findWhere(data.flatData.nodes,
          {
            x: roomNode.x + DirectionsService.increment.x[dir] * 150,
            y: roomNode.y + DirectionsService.increment.y[dir] * 150,
            z: roomNode.z + DirectionsService.increment.z[dir]
          }
        );
      }
    },
    edge: {
      id: function(_id, data) {
        if (!data) {
          data = buildData;
        }

        return data.flatData.edges[_id];
      },
      between: function(id1, id2, data) {
        if (!data) {
          data = buildData;
        }

        var result = _.find(data.flatData.edges, function(edge) {
          return edge.from == id1 && edge.to == id2
                 ||
                 edge.from == id2 && edge.to == id1;
        });
        return result;
      }
    }
  };

  var options = {
    nodes: {
      shape: 'square',
      borderWidthSelected: 4
    },
    edges: {
      smooth: false
    },
    physics: false,
    interaction: {
      selectConnectedEdges: false,
      dragNodes: false,
      zoomView: true,
      dragView: true
    }
  };

  return {

    buildData: buildData,

    can: can,

    map: map,

    options: options,

    find: find

  };

}]);
