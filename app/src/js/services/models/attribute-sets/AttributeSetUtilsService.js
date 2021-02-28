'use strict';

angular.module('chatoWeb')

.service('AttributeSetUtilsService', ['ConstantsCache', function(ConstantsCache) {

  var attributes = [
    'str',
    'dex',
    'con',
    'int',
    'wil',
    'agi',
    'pow'
  ];

  var find = function(value) {
    var result = null;
    var found  = false;

    _.each(ConstantsCache.storage.attributes, function(attribute) {
      if (attribute.limit >= value) {
        if (!found) {
          result = attribute;
        }
        found = true;
      }
    });

    return result;
  };

  return {

    attributes: attributes,

    find: find

  };

}]);