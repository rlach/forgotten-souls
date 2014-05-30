'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', 'game', function($scope, game) {
	game.start();
	$scope.decks = game.decks;
	$scope.treasureTrack = game.treasureTrack;
	
	$scope.reset = function() {
		game.reset();
	}
  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }]);
