'use strict';

angular.module('chatoWeb')

.service('SystemService', ['$q', '$http', function($q, $http) {

  var initialized = $q.defer();

  var storage = {
    info: ''
  };

  $http.get('/api/system/info.json').then(
    function(response) {
      storage.info = response.data;
      initialized.resolve();
    }
  );

  return {

    initialized: initialized,

    storage: storage

  };

}]);
