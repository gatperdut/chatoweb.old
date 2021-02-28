'use strict';

angular.module('chatoWeb')

.controller('ItemTemplatesController', ['$scope', 'ItemTemplateCache', 'ItemTemplateService', 'FireModalService', function($scope, ItemTemplateCache, ItemTemplateService, FireModalService) {

  $scope.ItemTemplateCache = ItemTemplateCache;

  $scope.create = {
    itemTemplate: function() {
      FireModalService.open.itemTemplate.create();
    },
    item: function(itemTemplate) {
      FireModalService.open.item(itemTemplate);
    }
  };

  $scope.remove = function(itemTemplate) {
    ItemTemplateService.destroy(itemTemplate);
  };

  $scope.edit = function(itemTemplate) {
    FireModalService.open.itemTemplate.edit(itemTemplate);
  };

}]);