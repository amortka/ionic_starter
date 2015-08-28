'use strict';

/**
 *
 */
angular.module('app.list')

    .controller('ListCtrl', function ($ionicPopup, $cordovaBarcodeScanner, Item) {
        var vm = this;
        console.log('hello ListCtrl', this);


        vm.showAlert = function (barcodeData) {
            var alertPopup = $ionicPopup.alert({
                title: 'Code:',
                template: barcodeData
            });
            alertPopup.then(function (res) {
                console.log('Thanks!');
            });
        };

        document.addEventListener("deviceready", function () {

            vm.scan = function () {
                console.log('scan!');

                $cordovaBarcodeScanner
                    .scan()
                    .then(function (barcodeData) {
                        if (!barcodeData.cancelled) {
                            vm.showAlert('Added to list: ' + barcodeData.text);
                            Item.addItem({name: barcodeData.text, qty: 1});
                        } else {
                            vm.showAlert('Cancelled!');
                            console.log('cancelled...');
                        }
                    }, function (error) {
                        // An error occurred
                    });
            };
        })

    })
    .controller('ListSecondaryCtrl', function () {
        var vm = this;

        console.log('hello list secondary');
    });
