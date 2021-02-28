'use strict';

angular.module('chatoWeb')

.service('NotiService', ['Notification', function(Notification) {

  var s = function(message) {
    Notification.primary(message);
  };

  var e = function(message) {
    Notification.error(message);
  };


  return {

    s: s,

    e: e

  };

}]);
