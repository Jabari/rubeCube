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
	//var color = document.querySelector('.front_face').background;
	var color = document.getElementsByClassName('front_face').background;
	console.log("color: " + color);
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
//'center': square_row[$index] === 'middle'
	
	//var cube = document.getElementById('cube');
	var cube = document.querySelector('#cube');
	var center = document.querySelectorAll('.center');
	setTimeout(function() {
		center.addEventListener("mouseover", function(e) {
			console.log(e);
			var x = e.x * .5;
			var y = e.y * .5;
			cube.style.webkitTransform = "rotateX(-" + y + "deg) rotateY(-" + x + "deg)";
		}, false);
	},10);
	
	var randomRGB = function() {
		top_face.style.background = 'orange';
 		cube.style.background = 'orange';
 	}

})
.controller('colorGen', function($scope) {
	var color = 255;
	var red = green = blue = Math.random() * color;
	console.log(red, green, blue);
	var top, front, bottom, back, left, right;

	top_face = document.getElementsByClassName('top_face');
	
	var randomRGB = "rgb(" + red + ", " + green + ", " + blue +")";
 	top = document.querySelectorAll('.top_face');
 	top1 = document.querySelector('.top_face');
 	left = document.querySelector('.left_face');
 	right = document.querySelector('.right_face');
	var int = 1;
	$scope.randomRGB = function(int) {

		int = int / 2;
		red = green = blue = Math.random() * color;
		randomRGB = "rgb(" + red + ", " + green + ", " + blue +")";
		console.log(int, randomRGB);
		//red = green = blue = Math.random() * color;
		
		top.style.background = "rgb(" + red + ", 0 ,0)";
		front.style.background = invert();
		left.style.background = "rgb(0, " + green + ", 0)";
		right.style.background = "rgb(0, 0, " + blue + ")";

	}
	function randomColor() {
		var color;
		color = Math.floor(Math.random() * 0x1000000); // integer between 0x0 and 0xFFFFFF
		color = color.toString(16);                    // convert to hex
		color = ("000000" + color).slice(-6);          // pad with leading zeros
		color = "#" + color;                           // prepend #
		return color;
	}
	function invertColor(hexTripletColor) {
	    var color = hexTripletColor;
	    color = color.substring(1);           // remove #
	    color = parseInt(color, 16);          // convert to integer
	    color = 0xFFFFFF ^ color;             // invert three bytes
	    color = color.toString(16);           // convert to hex
	    color = ("000000" + color).slice(-6); // pad with leading zeros
	    color = "#" + color;                  // prepend #
	    return color;
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