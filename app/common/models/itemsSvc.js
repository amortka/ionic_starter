'use strict';
angular.module('app.services', [])
    .factory('Item', function ($http) {

        var items = [
            {name: 'banana', qty: 1},
            {name: 'apple', qty: 2},
            {name: 'potato', qty: 78},
            {name: 'eggs', qty: 12},
            {name: 'fish', qty: 2},
            {name: 'milk', qty: 2}
        ];

        var getItems = function () {
            return items;
        };

        var removeItem = function (item) {
            _.remove(items, item);
        };

        var addItem = function(item) {
            items.push(item);
        };

        return {
            getItems: getItems,
            addItem: addItem,
            removeItem: removeItem
        }
    });
