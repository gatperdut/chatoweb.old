'use strict';

angular.module('chatoWeb')

.directive('itemTemplatePicker', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/html/directives/item-templates/picker.html',
    scope: {
      model: '=',
      change: '&'
    },
    controller: ['$scope', '$timeout', 'ItemTemplateUtilsService', 'ItemTemplateService', function($scope, $timeout, ItemTemplateUtilsService, ItemTemplateService) {

      $scope.ItemTemplateUtilsService = ItemTemplateUtilsService;

      $scope.aux = {
        list: [],
        model: null
      };

      $scope.select = function() {
        $scope.model = $scope.aux.model;
        $timeout(function() {
          if ($scope.change) {
            $scope.change();
          }
        });
      };

      $scope.query = function(query) {
        var promise;
        if (!query) {
          return;
        }
        return ItemTemplateService.search(query).then(
          function(response) {
            $scope.aux.list = response.data ? response.data : [];
          }
        );
      };

    }]
  };
}]);
