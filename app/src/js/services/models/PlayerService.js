'use strict';

angular.module('chatoWeb')

.service('PlayerService', ['$http', function($http) {

  var empty = {
    signup: function() {
      return {
        username: '',
        password: '',
        password_confirmation: '',
        setting_attributes: {
          ansi_coloring: false
        }
      };
    },
    login: function() {
      return {
        username: '',
        password: ''
      };
    }
  };

  var signup = function(player) {
    return $http.post('/api/players.json', { player: player });
  };

  return {

    empty: empty,

    signup: signup

  };

}]);