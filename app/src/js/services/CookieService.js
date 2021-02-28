'use strict';

angular.module('chatoWeb')

.service('CookieService', ['$cookies', function($cookies) {

  var get = function(name) {
    return $cookies.getObject(name);
  };

  var save = function(name, data) {
    var expiryDate = moment().add(7, 'days').toDate();
    $cookies.putObject(name, data, { 'expires': expiryDate });
  };

  var del = function(name) {
    $cookies.remove(name);
  };

  return {

    get: get,

    save: save,

    del: del

  };

}]);