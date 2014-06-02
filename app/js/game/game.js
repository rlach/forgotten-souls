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

		var defaults = {
			decks: {
				peril: [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
				monster: [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
				exploration: [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
			},
			treasureTrack: {
				wounds: 0,
				fatigue: 0,
				fate: 0,
				doom: 0,
				players: 2
			}
		};

		var service = {
			decks: {},
			drawPile: {
				peril: [],
				monster: [],
				exploration: []
			},
			treasureTrack: {},
			start: function() {
				service.reset();

				if($cookies.treasureTrack !== undefined) {
					service.treasureTrack = angular.fromJson($cookies.treasureTrack);
				}

				if($cookies.decks !== undefined) {
					service.decks = angular.fromJson($cookies.decks);
				}

				if($cookies.drawPile !== undefined) {
					service.drawPile = angular.fromJson($cookies.drawPile);
				}

				$scope.treasureTrack = service.treasureTrack;
				$scope.decks = service.decks;
				$scope.drawPile = service.drawPile;

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

				$scope.$watch('drawPile', function(newValue, oldValue) {
					if($scope.drawPile !== undefined) {
						$cookies.drawPile = angular.toJson($scope.drawPile);
					}
				}, true);
			},
			reset: function() {
				//angular.extend(this.decks, defaults.decks);
				angular.copy(defaults.decks,this.decks);
				emptyPile(this.drawPile.peril);
				emptyPile(this.drawPile.monster);
				emptyPile(this.drawPile.exploration);
				//angular.extend(this.treasureTrack, defaults.treasureTrack);
				angular.copy(defaults.treasureTrack, this.treasureTrack);

				shuffle(this.decks.peril);
				shuffle(this.decks.monster);
				prepareExplorationDeck(this.decks);
			},
			shuffle: function(deck) {
				if(typeof deck === 'string') {
					try {
						//angular.extend(this.decks[deck], defaults.decks[deck]);
						angular.copy(defaults.decks[deck], this.decks[deck]);
						shuffle(this.decks[deck]);
						emptyPile(this.drawPile[deck]);
					}
					catch(err) {
						$log.error("ERROR in shuffle deck", err);
					}
				}
			},
			draw: function(deck) {
				if(typeof deck === 'string') {
					try {
						if(this.decks[deck].length === 0) {
							if(deck === 'exploration') { 
								return;
							}
							this.shuffle(deck);
						}
						var drawnCard = this.decks[deck].shift();
						this.drawPile[deck].unshift(drawnCard);
					}
					catch(err) {
						$log.error("ERROR in draw deck", err);
					}
				}
			}
		};

		function prepareExplorationDeck(targetDecks) {
			var explorationTail = [ '05', '06', '07', '08', '09', '10', '11', '12'];
			shuffle(explorationTail);
			var explorationA = explorationTail.slice(0, 3);
			explorationA.push('02');
			var explorationB = explorationTail.slice(3, 6);
			explorationB.push('03');
			var explorationC = explorationTail.slice(6, 8);
			explorationC.push('04');
			shuffle(explorationA);
			shuffle(explorationB);
			shuffle(explorationC);
			var explorationComplete = ['01'];
			explorationComplete = explorationComplete.concat(explorationA);
			explorationComplete = explorationComplete.concat(explorationB);
			explorationComplete = explorationComplete.concat(explorationC);
			targetDecks.exploration = explorationComplete;
		}

		function emptyPile(array) {
			array.length = 0;
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
