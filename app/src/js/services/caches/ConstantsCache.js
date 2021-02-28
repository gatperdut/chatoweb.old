'use strict';

angular.module('chatoWeb')

.service('ConstantsCache', ['$q', '$http', function($q, $http) {

  var storage = {
    weaponInfo: {},
    armorInfo: {},
    fluids: []
  };

  var initialized = $q.defer();

  $q.all(
    [
      $http.get('/api/constants/weapons.json'),
      $http.get('/api/constants/armor.json'),
      $http.get('/api/constants/materials.json'),
      $http.get('/api/constants/craftmanships.json'),
      $http.get('/api/constants/fluids.json'),
      $http.get('/api/constants/ingredients.json'),
      $http.get('/api/constants/skills.json'),
      $http.get('/api/constants/skill_categories.json'),
      $http.get('/api/constants/attributes.json')
    ]
  ).then(
    function(response) {
      storage.weaponInfo      = response[0].data;
      storage.armorInfo       = response[1].data;
      storage.materials       = response[2].data;
      storage.craftmanships   = response[3].data
      storage.fluids          = response[4].data;
      storage.ingredients     = response[5].data;
      storage.skills          = response[6].data;
      storage.skillCategories = response[7].data;
      storage.attributes      = response[8].data;
      initialized.resolve();
    }
  );

  return {

    initialized: initialized,

    storage: storage

  };

}]);
