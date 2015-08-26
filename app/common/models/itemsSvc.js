'use strict';
angular.module('app.services', [])
    .factory('Item', function ($http) {

        var items = [
          { name: 'banana', qty: 1 },
          { name: 'apple',  qty: 2 },
          { name: 'milk', qty: 1},
          { name: 'eggs', qty: 13},
          { name: 'ham', qty: 2},
          { name: 'semi-fat milk', qty: 2}
        ];

        var getItems = function () {
            return items;
        };

        var removeItem = function(item) {
            //_.remove(items, item);
            var foundItem = _.find(items, {name: item.name});
            foundItem.qty--;
            if (foundItem.qty <= 0) {
              _.remove(items, {name: item.name});
            }
            console.log(foundItem);
        };

        return {
            getItems: getItems,
            removeItem: removeItem
        }
    });
