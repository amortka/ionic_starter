'use strict';

/**
 *
 */
angular.module('app.list')

    .controller('ListCtrl', function () {
        var vm = this;

        console.log('hello ListCtrl', this);
    })
    .controller('ListSecondaryCtrl', function () {
        var vm = this;

        console.log('hello list secondary');
    });
