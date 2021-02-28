'use strict';

angular.module('chatoWeb')

.service('UtilsService', [function() {

  var findIndex = function(array, id) {
    var index = _.findIndex(array, function(item) {
      return item.id == id;
    });
    if (index < 0) {
      console.error('UtilsService: could not find the element.');
    }
    return index;
  }

  var replace = function(array, substitute) {
    var index = findIndex(array, substitute.id);
    array[index] = substitute;
  };

  var remove = function(array, id) {
    var index = findIndex(array, id);
    array.splice(index, 1);
  };

  var attributize = function(model, propertyPath) {
    var propertyNames = propertyPath.split('.');
    var lastPropertyName = propertyNames.pop();

    var tmp = model;
    var broken = false;
    _.each(propertyNames, function(propertyName) {
      if (tmp[propertyName]) {
        tmp = tmp[propertyName];
      }
      else {
        broken = true;
      }
    })

    if (broken) {
      return;
    }

    if (!tmp[lastPropertyName]) {
      return;
    }

    tmp[lastPropertyName + '_attributes'] = angular.copy(tmp[lastPropertyName]);
    delete tmp[lastPropertyName];
  };

  return {

    replace: replace,

    remove: remove,

    attributize: attributize

  };

}]);



