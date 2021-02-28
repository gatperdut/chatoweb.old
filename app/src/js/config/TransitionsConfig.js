'use strict';

angular.module('chatoWeb')

.run(['$transitions', function($transitions) {

  $transitions.onStart({ to: 'app.private.**' }, function(transition) {
    var AuthService = transition.injector().get('AuthService');
    return AuthService.initialized.promise.then(
      function() {
        if (!AuthService.isAuthenticated()) {
          return transition.router.stateService.target('app.public.login');
        }
      }
    );
  });

  $transitions.onStart({ to: ['app.public.**', '!app.public.login'] }, function(transition) {
    var AuthService = transition.injector().get('AuthService');
    return AuthService.initialized.promise.then(
      function() {
        if (AuthService.isAuthenticated()) {
          return transition.router.stateService.target('app.private.characters');
        }
      }
    );
  });

}]);