'use strict';

/**
 *
 */
angular.module('app.main')

    .controller('MainCtrl', function ($timeout, Item) {
        var vm = this;

        vm.items = {};

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

        function init() {
            getItems();
        }

        var getItems = function() {
            vm.items = Item.getItems();
        };

        init();
    });
