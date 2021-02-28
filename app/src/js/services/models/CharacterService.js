'use strict';

angular.module('chatoWeb')

.service('CharacterService', ['$http', 'CharacterUtilsService', 'AuthService', 'NotiService', function($http, CharacterUtilsService, AuthService, NotiService) {

  var empty = function() {
    return {
      name: '',
      short_desc: '',
      long_desc: '',
      full_desc: '',
      kwords: [],
      player_id: AuthService.storage.player.id,
      gender: 'male',
      active: true
    };
  };

  var yours = function() {
    return $http.get('/api/characters/yours.json')
  };

  var previous = function() {
    return $http.get('/api/characters/previous.json')
  };

  var create = function(character) {
    character = CharacterUtilsService.attributize(character);
    return $http.post('/api/characters.json', { character: character }).then(
      function() {
        NotiService.s('Character created.');
      },
      function() {
        NotiService.e('Nope.')
      }
    );
  };

  var update = function(character) {
    character = CharacterUtilsService.attributize(character);
    return $http.put('/api/characters/' + character.id + '.json', { character: character }).then(
      function() {
        NotiService.s('Character updated.');
      },
      function() {
        NotiService.e('Nope.')
      }
    );
  };

  return {

    empty: empty,

    yours: yours,

    previous: previous,

    create: create,

    update: update

  };

}]);