'use strict';
angular.module('app.services', [])
    .factory('Item', function ($http) {

        var items = [
<<<<<<< HEAD
          { name: 'banana', qty: 1 },
          { name: 'apple',  qty: 2 },
          { name: 'milk', qty: 1},
          { name: 'eggs', qty: 13},
          { name: 'ham', qty: 2},
          { name: 'semi-fat milk', qty: 2}
=======
            {name: 'banana', qty: 1},
            {name: 'apple', qty: 2},
            {name: 'potato', qty: 78},
            {name: 'eggs', qty: 12},
            {name: 'fish', qty: 2},
            {name: 'milk', qty: 2}
>>>>>>> origin/develop
        ];

        var getItems = function () {
            return items;
        };

<<<<<<< HEAD
        var removeItem = function(item) {
            //_.remove(items, item);
            var foundItem = _.find(items, {name: item.name});
            foundItem.qty--;
            if (foundItem.qty <= 0) {
              _.remove(items, {name: item.name});
            }
            console.log(foundItem);
=======
        var removeItem = function (item) {
            _.remove(items, item);
>>>>>>> origin/develop
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
