'use strict';

/**
 *
 */
angular.module('app.list')

    .controller('ListCtrl', function ($scope) {
        console.log('hello ListCtrl', this);
        var vm = this;

        vm.hello = 'list!';
        vm.refresh = function () {
            console.log('trying to refresh');
        }
    })
    .controller('ListSecondaryCtrl', function ($scope) {
        console.log('hello list secondary');
        var vm = this;

        vm.hello = 'list!';
    });
