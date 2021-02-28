'use strict';

angular.module('chatoWeb')

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('APIInterceptor');
}]);
