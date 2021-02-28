'use strict';

angular.module('chatoWeb')

.service('RealtimeReaction', ['SuperareaCache', 'AreaCache', 'RoomCache', 'DoorCache', 'ItemTemplateCache', 'ItemCache', 'CraftCache', function(SuperareaCache, AreaCache, RoomCache, DoorCache, ItemTemplateCache, ItemCache, CraftCache) {

  var actions = {
    superarea: {
      created: function(msg) {
        SuperareaCache.superareaEvent.created(msg.superarea);
      },
      updated: function(msg) {
        SuperareaCache.superareaEvent.updated(msg.superarea);
      },
      deleted: function(msg) {
        SuperareaCache.superareaEvent.deleted(msg.superarea);
      }
    },
    area: {
      created: function(msg) {
        AreaCache.areaEvent.created(msg.area);
      },
      updated: function(msg) {
        AreaCache.areaEvent.updated(msg.area);
      },
      deleted: function(msg) {
        AreaCache.areaEvent.deleted(msg.area);
      }
    },
    room: {
      created: function(msg) {
        RoomCache.roomEvent.created(msg.room);
      },
      updated: function(msg) {
        RoomCache.roomEvent.updated(msg.room);
      },
      deleted: function(msg) {
        RoomCache.roomEvent.deleted(msg.room);
      }
    },
    door: {
      created: function(msg) {
        DoorCache.doorEvent.created(msg.door);
      },
      updated: function(msg) {
        DoorCache.doorEvent.updated(msg.door);
      },
      deleted: function(msg) {
        DoorCache.doorEvent.deleted(msg.door);
      },
    },
    item_template: {
      created: function(msg) {
        ItemTemplateCache.itemTemplateEvent.created(msg.id);
      },
      updated: function(msg) {
        ItemTemplateCache.itemTemplateEvent.updated(msg.id);
      },
      deleted: function(msg) {
        ItemTemplateCache.itemTemplateEvent.deleted(msg.id);
      }
    },
    item: {
      created: function(msg) {
        ItemCache.itemEvent.created(msg.id);
      },
      deleted: function(msg) {
        ItemCache.itemEvent.deleted(msg.id);
      }
    },
    craft: {
      created: function(msg) {
        CraftCache.craftEvent.created(msg.id);
      },
      updated: function(msg) {
        CraftCache.craftEvent.updated(msg.id);
      },
      deleted: function(msg) {
        CraftCache.craftEvent.deleted(msg.id);
      },
    }
  };

  var handle = function(msg) {
    actions[msg.action][msg.subaction](msg);
  };


  return {

    handle: handle

  };

}]);
