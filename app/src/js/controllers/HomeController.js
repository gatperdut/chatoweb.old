'use strict';

angular.module('chatoWeb')

.controller('HomeController', ['$scope', 'AnnouncementCache', 'AuthService', 'InterfaceService', function($scope, AnnouncementCache, AuthService, InterfaceService) {

  $scope.AnnouncementCache = AnnouncementCache;

  $scope.InterfaceService = InterfaceService;

  $scope.AuthService = AuthService;

}]);