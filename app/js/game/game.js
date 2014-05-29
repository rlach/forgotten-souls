'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngCookies'])
  .factory('game', [
		'$rootScope',
        '$log',
		'$cookies',
        function($scope, $log, $cookies) {
            'use strict';
			
            var service = {
                decks: {
                    peril: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    monster: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    exploration: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                },
				treasureTrack: {
					wounds: 0,
					fatigue: 0,
					fate: 0,
					doom: 0,
					players: 2
				},
				start: function() {
                    this.treasureTrack.wounds = this.treasureTrack.wounds + 1;
                }
            };
			
			if($cookies.treasureTrack !== undefined) {
				service.treasureTrack = angular.fromJson($cookies.treasureTrack);
			};
			
			if($cookies.decks !== undefined) {
				service.decks = angular.fromJson($cookies.decks);
			};
			
			$scope.treasureTrack = service.treasureTrack;
			$scope.decks = service.decks;
			
			$scope.$watch('treasureTrack', function(newValue, oldValue) {
				if($scope.treasureTrack !== undefined) {
					$cookies.treasureTrack = angular.toJson($scope.treasureTrack);
				}
			}, true);
			
			$scope.$watch('decks', function(newValue, oldValue) {
				if($scope.decks !== undefined) {
					$cookies.decks = angular.toJson($scope.decks);
				}
			}, true);

            return service;
        }
    ]);
