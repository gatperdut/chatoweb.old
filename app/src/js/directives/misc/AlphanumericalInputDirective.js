'use strict';

angular.module('chatoWeb')

.directive('alphanumericalInput', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attr, ngModelCtrl) {
      function modifyInput(input) {
        if (input) {
          var transformedInput = input.replace(/[^0-9\S.]/g, '');
          if (transformedInput !== input) {
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
          }
          return transformedInput;
        }
        return undefined;
      };
      ngModelCtrl.$parsers.push(modifyInput);
    }
  };
});