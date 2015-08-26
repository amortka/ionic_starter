'use strict';
angular.module('app.services', [])
    .factory('Item', function ($http) {

        var items = [{
            name: 'banana',
            qty: 1
        }, {
            name: 'apple',
            qty: 2
        }, {
            name: 'potato',
            qty: 78
        }];

        var getItems = function () {
            return items;
        };

        var removeItem = function(item) {
            _.remove(items, item);
        };

        return {
            getItems: getItems,
            removeItem: removeItem
        }
    });
