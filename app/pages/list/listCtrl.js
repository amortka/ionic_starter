'use strict';

/**
 *
 */
angular.module('app.list')

    .controller('ListCtrl', function($scope) {
      console.log('hello list');
      var vm = this;
          
      vm.hello = 'list!';
    });
