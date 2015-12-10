var app = angular.module('rubeCube', [])
.controller('sizeGen', function($scope) {
	$scope.size = 3;

	$scope.dec = function() {
		if ($scope.size != 2) {
			$scope.size--;
		}
	}
	$scope.inc = function() {
		if ($scope.size != 11) {
			$scope.size++;
		}
	}
	//var cube = document.getElementById('cube');
	var cube = document.querySelector('#cube');
	var center = document.querySelector('.center');
	center.addEventListener("drag", function(e) {
		console.log(e);
		var x = e.x * .5;
		var y = e.y * .5;
		cube.style.webkitTransform = "rotateX(-" + y + "deg) rotateY(-" + x + "deg)";
	})
	
})
.controller('colorGen', function($scope) {
	var Color = 255;
	$scope.randomRGB = function() {
		
		var red, green, blue = Color();


	}
})