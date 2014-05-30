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
				peril: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
				monster: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
				exploration: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
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
			},
			reset: function() {
				shuffle(this.decks.peril);
				shuffle(this.decks.monster);
				prepareExplorationDeck(this.decks);
			}
		};

		if($cookies.treasureTrack !== undefined) {
			service.treasureTrack = angular.fromJson($cookies.treasureTrack);
		}

		if($cookies.decks !== undefined) {
			service.decks = angular.fromJson($cookies.decks);
		}

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

		function prepareExplorationDeck(targetDecks) {
			var explorationTail = [ 5, 6, 7, 8, 9, 10, 11, 12];
			shuffle(explorationTail);
			var explorationA = explorationTail.slice(0, 3);
			explorationA.push(2);
			var explorationB = explorationTail.slice(3, 6);
			explorationB.push(3);
			var explorationC = explorationTail.slice(6, 8);
			explorationC.push(4);
			shuffle(explorationA);
			shuffle(explorationB);
			shuffle(explorationC);
			var explorationComplete = [1];
			explorationComplete = explorationComplete.concat(explorationA);
			explorationComplete = explorationComplete.concat(explorationB);
			explorationComplete = explorationComplete.concat(explorationC);
			targetDecks.exploration = explorationComplete;
		}

		function shuffle(array) {
			var counter = array.length, temp, index;

				// While there are elements in the array
				while (counter > 0) {
					// Pick a random index
					index = Math.floor(Math.random() * counter);

					// Decrease counter by 1
					counter--;

					// And swap the last element with it
					temp = array[counter];
					array[counter] = array[index];
					array[index] = temp;
				}

				return array;
			}

			return service;
		}
		]);
