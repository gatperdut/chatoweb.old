'use strict';

angular.module('chatoWeb')

.service('AreaCache', ['$q', '$http', 'SuperareaCache', 'AreaService', 'UtilsService', 'MapTransitionService', function($q, $http, SuperareaCache, AreaService, UtilsService, MapTransitionService) {

  var storage = {
    areas: []
  };

  var initialized = $q.defer();

  var updated = $q.defer();

  var selection = {
    current: null,
    superarea: function() {
      if (!selection.current) {
        return null;
      }
      return _.find(SuperareaCache.storage.superareas, { id: selection.current.superarea_id });
    },
    select: {
      object: function(area) {
        selection.current = area;
        updated.notify();
      },
      id: function(id, roomId) {
        selection.current = _.findWhere(storage.areas, { id: id });
        updated.notify(roomId);
      }
    }
  };

  var init = function(superareaId) {
    console.log('[AreaCache] initialized.');
    AreaService.query().then(
      function(response) {
        storage.areas = response.data;
        var areaId;
        if (superareaId) {
          areaId = _.where(storage.areas, { superarea_id: superareaId })[0].id;
          MapTransitionService.transition.area.set(areaId);
        }
        else {
          areaId = storage.areas[0].id;
        }
        selection.select.id(areaId);
        initialized.resolve();
      }
    );
  };

  SuperareaCache.initialized.promise.then(init);

  SuperareaCache.updated.promise.then(null, null, function(superareaId) {
    init(superareaId);
  });

  var areaEvent = {
    created: function(area) {
      storage.areas.push(area);
      updated.notify();
    },
    updated: function(area) {
      UtilsService.replace(storage.areas, area);
      updated.notify();
    },
    deleted: function(area) {
      UtilsService.remove(storage.areas, area.id);
      selection.select.object(storage.areas[0]);
    }
  };


  var presence = {
    any: function() {
      return storage.areas.length > 0;
    }
  };

  return {

    initialized: initialized,

    updated: updated,

    storage: storage,

    selection: selection,

    areaEvent: areaEvent

  };

}]);