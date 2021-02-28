'use strict';

angular.module('chatoWeb')

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(false);
  $locationProvider.hashPrefix('');

  $urlRouterProvider
  .when('/', '/home')
  .otherwise('/');

  $stateProvider.state('app', {
    abstract: true,
    controller: 'AppController',
    templateUrl: '/html/layout/main.html'
  })

  .state('app.home', {
    controller: 'HomeController',
    url: '/home',
    templateUrl: '/html/views/both/home/main.html',
    resolve: {
      announcements: ['AnnouncementCache', function(AnnouncementCache) {
        return AnnouncementCache.initialized.promise;
      }]
    }
  })

  .state('app.documentation', {
    controller: 'DocumentationController',
    url: '/documentation',
    templateUrl: '/html/views/both/documentation/main.html'
  })

  .state('app.public', {
    abstract: true,
    controller: 'PublicController',
    templateUrl: '/html/views/public/main.html'
  })
  .state('app.public.signup', {
    controller: 'SignupController',
    url: '/signup',
    templateUrl: '/html/views/public/signup/main.html'
  })
  .state('app.public.login', {
    controller: 'LoginController',
    url: '/login',
    templateUrl: '/html/views/public/login/main.html'
  })

  .state('app.private', {
    abstract: true,
    controller: 'PrivateController',
    templateUrl: '/html/views/private/main.html',
    resolve: {
      constants: ['ConstantsCache', function(ConstantsCache) {
        return ConstantsCache.initialized.promise;
      }]
    }
  })

  .state('app.private.items', {
    templateUrl: '/html/views/private/items/main.html',
    url: '/items',
    controller: 'ItemsController'
  })

  .state('app.private.crafts', {
    templateUrl: '/html/views/private/crafts/main.html',
    url: '/crafts',
    controller: 'CraftsController'
  })

  .state('app.private.item_templates', {
    templateUrl: '/html/views/private/item-templates/main.html',
    url: '/item-templates',
    controller: 'ItemTemplatesController'
  })

  .state('app.private.characters', {
    templateUrl: '/html/views/private/characters/main.html',
    url: '/characters',
    controller: 'CharactersController'
  })

  .state('app.private.map', {
    templateUrl: '/html/views/private/map/main.html',
    url: '/map',
    controller: 'MapController',
    resolve: {
      superareas: ['SuperareaCache', function(SuperareaCache) {
        return SuperareaCache.initialized.promise;
      }],
      doors: ['DoorCache', function(DoorCache) {
        return DoorCache.initialized.promise;
      }]
    }
  })

}]);
