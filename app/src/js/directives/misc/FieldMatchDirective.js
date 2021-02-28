'use strict';

angular.module('chatoWeb')

.directive('fieldMatch',[ function() {
  return {
    require: 'ngModel',
    scope: {
      field: '=fieldMatch'
    },
    link: function(scope, elm, attrs, ngModel) {
      var fieldName = attrs.fieldMatchError || 'fieldNoMatch';

      ngModel.$validators[fieldName] = function(modelValue) {
        return ngModel.$isEmpty(modelValue) || modelValue === scope.field;
      };

      scope.$watch('field', function() {
        ngModel.$validate();
      });
    }
  };
}]);
