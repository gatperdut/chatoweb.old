'use strict';

angular.module('chatoWeb')

.service('PromiseService', [function() {

  var reject = function(deferred) {
    deferred.reject();
    deferred.promise.then(angular.noop, angular.noop);
  };


  return {

    reject: reject

  };

}]);
