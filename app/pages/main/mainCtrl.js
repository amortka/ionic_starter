'use strict';

/**
 *
 */
angular.module('app.main')

    .controller('MainCtrl', function ($ionicSideMenuDelegate, $timeout, Item) {
        var vm = this;

        vm.items = {};

        vm.toggleMenu = function() {
          $ionicSideMenuDelegate.toggleLeft();
        };

        vm.swipe = function(item) {
            $timeout(function() {
                //Item.removeItem(item);
                item.checked = true;
            }, 500);
        };

        vm.removeItem = function(item) {
            console.log('removing item');
            Item.removeItem(item);
            getItems();
        };

        vm.goForward = function() {
          console.log('go++');
        };

        vm.goBack = function() {
          console.log('go--');
        };

        function init() {
            getItems();
        }

        var getItems = function() {
            vm.items = Item.getItems();
        };

        init();
    });
