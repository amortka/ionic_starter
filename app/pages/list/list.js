'use strict';

/**
 * ...
 * @module main
 */
angular.module('app.list', [])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.list', {
                url: 'list',
                views: {
                    'tab-chats': {
                        templateUrl: 'pages/list/list.tmpl.html',
                        controller: 'ListCtrl as listCtrl'
                    }
                }
            })
            .state('app.list-secondary', {
                url: '/list-secondary',
                views: {
                    'tab-chats': {
                        templateUrl: 'pages/list/list-secondary.tmpl.html',
                        controller: 'ListSecondaryCtrl as listSecondaryCtrl'
                    }
                }
            });
    });
