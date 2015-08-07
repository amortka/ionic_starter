'use strict';

/**
 * ...
 * @module main
 */
angular.module('app.main', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('app.main', {
      url: 'main',
      views: {
        'tab-dash': {
          templateUrl: 'pages/main/main.tmpl.html',
          controller: 'MainCtrl',
          controllerAs: 'mainCtrl'
        }
      }
    });
});
