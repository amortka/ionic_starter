'use strict';

/**
 * ...
 * @module main
 */
angular.module('app.list', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('app.list', {
      url: 'list',
      views: {
        'tab-chats': {
          templateUrl: 'pages/list/list.tmpl.html',
          controller: 'ListCtrl',
          controllerAs: 'listCtrl'
        }
      }
    });
});
