'use strict';

angular.module('app.components', [])
.directive('hideTabs', function($rootScope) {
    return {
        restrict: 'A',
        link: function($scope) {
            console.log('hello world13');



            var events = [
                '$ionicView.loaded',
                '$ionicView.enter',
                '$ionicView.leave',
                '$ionicView.beforeEnter',
                '$ionicView.beforeLeave',
                '$ionicView.afterEnter',
                '$ionicView.afterLeave',
                '$ionicView.unloaded'
            ];

            //_.forEach(events, function(event) {
            //    $scope.$on(event, function(e) {
            //        console.log('hideTabs:: event', event, 'fired!', e);
            //    });
            //});
            $scope.$on('$ionicView.beforeEnter', function() {
                console.log('$ionicView.beforeEnter');
                $rootScope.hideTabs = true;
            });

            $scope.$on('$ionicView.leave', function() {
                console.log('$ionicView.leave');
                $rootScope.hideTabs = false;
            });
        }
    };
});