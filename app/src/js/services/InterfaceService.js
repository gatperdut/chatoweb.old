'use strict';

angular.module('chatoWeb')

.service('InterfaceService', ['$state', '$timeout', '$window', function($state, $timeout, $window) {

  var sidebar = {
    active: true,
    toggle: function() {
      this.active = !this.active;
    }
  };

  var publicURLs = [
    '/login',
    '/signup'
  ];

  var isIn = {
    public: function(url) {
      return _.any(publicURLs, function(publicURL) {
        return publicURL == url;
      });
    },
    home: function() {
      return $state.is('app.home');
    },
    documentation: function() {
      return $state.is('app.documentation');
    },
    items: function() {
      return $state.is('app.private.items');
    },
    crafts: function() {
      return $state.is('app.private.crafts');
    },
    itemTemplates: function() {
      return $state.is('app.private.item_templates');
    },
    characters: function() {
      return $state.is('app.private.characters');
    },
    map: function() {
      return $state.is('app.private.map');
    }
  };

  var goTo = {
    public: {
      login: function() {
        return $state.go('app.public.login', {});
      },
      signup: function() {
        return $state.go('app.public.signup', {});
      }
    },
    home: function() {
      return $state.go('app.home');
    },
    documentation: function() {
      return $state.go('app.documentation');
    },
    items: function() {
      return $state.go('app.private.items');
    },
    crafts: function() {
      return $state.go('app.private.crafts');
    },
    itemTemplates: function() {
      return $state.go('app.private.item_templates');
    },
    characters: function() {
      return $state.go('app.private.characters');
    },
    map: function() {
      return $state.go('app.private.map');
    }
  };

  var reload = function() {
    $timeout(function() {
      $window.location.reload(true);
    }, 100);
  };

  return {

    sidebar: sidebar,

    isIn: isIn,

    goTo: goTo,

    reload: reload

  };

}]);