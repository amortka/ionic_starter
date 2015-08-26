'use strict';

angular.module('app.components')
    .directive('dragOut', function ($ionicGesture) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                $ionicGesture.on('swipe', function(event) {
                    event.stopPropagation();
                    console.log('swiped', event)
                }, element);

            }
        };
    });
