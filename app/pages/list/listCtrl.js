'use strict';

/**
 *
 */
angular.module('app.list')

.controller('ListCtrl', function($ionicPopup, $cordovaBarcodeScanner) {
    var vm = this;

    document.addEventListener("deviceready", function() {
      vm.scan = function() {
        $cordovaBarcodeScanner
          .scan()
          .then(function(barcodeData) {
            var alertPopup = $ionicPopup.alert({
              title: 'Scaned',
              template: 'code is: ' + barcodeData.text + '<br/>' +  ', format:' + barcodeData.format
            });
            alertPopup.then(function(res) {
              console.log('Thank you for not eating my delicious ice cream cone');
            });
            // Success! Barcode data is here
          }, function(error) {
            // An error occurred
          });

      };
    });
  })
  .controller('ListSecondaryCtrl', function() {
    var vm = this;

    console.log('hello list secondary');
  });
