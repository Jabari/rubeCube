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

	$scope.square_row = ["upper", "middle", "lower"];
	$scope.square_col = ["left", "middle", "right"];
	// 
	$scope.configSize = function(size) {
		$scope.cube = document.querySelector('#cube');
		
		for(i = 0; i < size; i++) {
			$scope.cube.innerHTML += '<square></square>'
			for(i = 0, len = arr.length; i < len; i++) {

			}
			
		}
		
	}
//$index == 1 || $scope.size ? '' : this.classList += ' center'
//$index == 1 || 3 ? '' : this.classList += ' center'
//if ($index !== 1 || 3) this.classList += ' center'
	$scope.addCenterClass = function(index) {
		var center = this;
		console.log(center);

		if ($scope.square_row[index] === "middle") {
			//this.classList.add('center');
			center.classList += ' center';
		}
	}
	//var cube = document.getElementById('cube');
	var cube = document.querySelector('#cube');
	var center = document.querySelector('.center');
	// center.addEventListener("drag", function(e) {
	// 	console.log(e);
	// 	var x = e.x * .5;
	// 	var y = e.y * .5;
	// 	cube.style.webkitTransform = "rotateX(-" + y + "deg) rotateY(-" + x + "deg)";
	// })
	
})
.controller('colorGen', function($scope) {
	var Color = 255;
	$scope.randomRGB = function() {
		
		var red, green, blue = Color();


	}
})
.directive('square', function($parse) {
    return {
      restrict: 'E',
      replace: true,
      translude: false,
      template: '<div class="square"></div>'
    }
})