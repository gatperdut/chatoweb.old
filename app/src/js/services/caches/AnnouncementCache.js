'use strict';

angular.module('chatoWeb')

.service('AnnouncementCache', ['$q', '$http', function($q, $http) {

  var storage = {
    announcements: {}
  };

  var initialized = $q.defer();

  $http.get('/api/announcements.json').then(
    function(response) {
      storage.announcements = response.data;
      initialized.resolve();
    }
  );

  return {

    initialized: initialized,

    storage: storage

  };

}]);
