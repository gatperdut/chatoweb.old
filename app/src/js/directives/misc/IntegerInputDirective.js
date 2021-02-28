'use strict';

angular.module('chatoWeb')

.directive('integerInput', function () {
  return {
    require: 'ngModel',
    link: function (scope, element, attr, ngModelCtrl) {
      function fromUser(text) {
        if (!text) {
          ngModelCtrl.$setViewValue(0);
          ngModelCtrl.$render();
          return 0;
        }
        else {
          if (_.isNumber(text)) {
            text = text.toString();
          }
          var transformedInput = text.replace(/[^0-9]/g, '');

          if (transformedInput !== text) {
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
          }
          return Number(transformedInput);
        }
      }            
      ngModelCtrl.$parsers.push(fromUser);
    }
  };
});