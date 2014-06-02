'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', 'game', function($scope, game) {
	game.start();
	$scope.decks = game.decks;
	$scope.treasureTrack = game.treasureTrack;
	$scope.drawPile = game.drawPile;
	
	$scope.draw = function(deck) {
		game.draw(deck);
	}
	
	$scope.shuffle = function(deck) {
		game.shuffle(deck);
	}
	
	$scope.getLink = function(deck) {
		if($scope.drawPile[deck].length === 0) {
			return 'img/blank.png';
		} else {
			return 'img/fs/' + deck + $scope.drawPile[deck][0] + '.png';
		}
	}
	
	$scope.reset = function() {
		game.reset();
	}
  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }]);
