var app = angular.module('rubeCube', [])
.controller('sizeGen', function($scope, $timeout) {
	$scope.size = 3;

	$scope.dec = function() {
		if ($scope.size > 2) {
			$scope.size--;
		} else {
			$scope.size = 2;
		}

	}

	$scope.inc = function() {

		if ($scope.size < 11) {
			$scope.size++;
		} else {
			$scope.size = 11;
		}

	}
	$scope.onDragDown = function($event) {
		console.log('swipe');
	}
	$scope.swipe = function($event) {
	    console.log($event);
	  };
	var el = '#cube';
	var styleProp = 'backgroundColor';
	$scope.prepare = function(el,styleProp) {
		var x = document.querySelector(el);
		if (x.currentStyle)
			var y = x.currentStyle[styleProp];
		else if (window.getComputedStyle)
			var y = document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
		alert(y);
	}

	
	$scope.square_row = ["upper", "middle", "lower"];

	$scope.square_col = ["left", "middle", "right"];

	$scope.onSwipeLeft = function() {
		console.log('left');
	}
	$scope.onDragDown = function() {
		console.log('down');
	}
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
	var square = document.querySelectorAll('.square');
	// for(var i = 0, length = square.length; i < length; i++) {
	// 	square[i].addEventListener("drag", function(e) {
	// 		console.log(e);
	// 		var x = e.x * .5;
	// 		var y = e.y * .5;
	// 		console.log('drag');
	// 		cube.style.webkitTransform = "rotateX(-" + y + "deg) rotateY(-" + x + "deg)";
	// 	}, false);
	// }
	//$timeout(function() {
		cube.addEventListener("drag", function(e) {
			console.log(e);
			var x = e.x * .3;
			var y = e.y * .3;
			cube.style.webkitTransform = "rotateX(-" + y + "deg) rotateY(-" + x + "deg)";
		}, false);
	//},1000);
	//document.querySelector('.front_face').style.backgroundColor = "#ffffff";
	var randomRGB = function() {
		top_face.style.background = 'orange';
 		cube.style.background = 'orange';
 	}

})
.controller('colorGen', function($scope) {

	$scope.randomRGB = function(){
		var value = 255;
		var a = Math.floor(Math.random() * value);
		var b = Math.floor(Math.random() * value);
		var c = Math.floor(Math.random() * value);
		var d = Math.random();
		console.log(a, b, c);
		return a, b, c, d;
	}

	$scope.randomHex = function(){
		var color = Math.floor(Math.random() * 1000000);
		var color = "#" + color;
		console.log(color);
		return color;
	}
	
	var top, front, bottom, back, left, right, sidesArr, square;
	
	//var randomRGB = "rgb(" + red + ", " + green + ", " + blue +")";
 	top = document.querySelectorAll('.top-face');
 	bottom = document.querySelectorAll('.bottom-face');
 	front = document.querySelectorAll('.front-face');	
 	back = document.querySelectorAll('.back-face');
 	left = document.querySelectorAll('.left-face');
 	right = document.querySelectorAll('.right-face');

 	sidesArr = [top, bottom, front, back, left, right];
 	square = $('square');
 	console.log(square);
 	

	$scope.changeColor = function() {
		var i, len, side;
		
		for (i = 0, len = sidesArr.length; i < len; i++) {
			side = sidesArr[i];
			for (i = 0; i < side.length; i++) {
				side[i].style.backgroundColor = randomColor();
			}
		}

		//red = green = blue = Math.random() * color;
		//randomRGB = "rgb(" + red + ", " + green + ", " + blue +")";
		//console.log(int, randomRGB);
		//red = green = blue = Math.random() * color;
		
		// top.style.backgroundColor = "rgb(" + red + ", 0 ,0)";
		// front.style.background = invert();
		// left.style.background = "rgb(0, " + green + ", 0)";
		// right.style.background = "rgb(0, 0, " + blue + ")";

	}
	var randomColor = function() {
		var color;
		color = Math.floor(Math.random() * 0x1000000); // integer between 0x0 and 0xFFFFFF
		color = color.toString(16);                    // convert to hex
		color = ("000000" + color).slice(-6);          // pad with leading zeros
		color = "#" + color;                           // prepend #
		console.log(color);
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
.controller('cubeLogic', function($scope) {
	var move = {
	    face: 'F',
	    plane: 'S',
	    rotation: 'right'
	};

	
 	squares = document.getElementsByClassName('square');
 	//squares = document.querySelectorAll('.square');
 	console.log(squares);
	$('.switch').on('click', function() {
	  switchClass('L-clock');
	});

	function switchClass(mv) {
		$.map(movementsMap[mv], function(v, k){
			//mv = movement e.g., LM-left, etc
			k = k.split("."); //keys
			v = v.split("."); //values
			console.log(k);
			console.log(v);
			var square;
			for (var i in squares) {				
				square = squares[i];
				

				if ( square.classList.contains(k[1]) && square.classList.contains(k[2]) && square.classList.contains(k[3]) ) {
					//console.log("true");
					console.log(square.classList);
					square.className = "";
					square.className = v.join(" ") + " square";
					console.log(square.classList);
					console.log("move new square")
					return
				} else {
					console.log("false");					
				}
				
				
			}
		  	//console.log(k + " --> " + v);
			
	  	});
	}
	// 
	var movementsMap = {
        'L-clock':{
            ".top_face.upper.left_col":".back_face.upper.left_col",".top_face.middle.left_col":".back_face.middle.left_col",".top_face.lower.left_col":".back_face.lower.left_col",".front_face.upper.left_col":".top_face.upper.left_col",".front_face.middle.left_col":".top_face.middle.left_col",".front_face.lower.left_col":".top_face.lower.left_col",".bottom_face.upper.left_col":".front_face.upper.left_col",
            ".bottom_face.middle.left_col":".front_face.middle.left_col",".bottom_face.lower.left_col":".front_face.lower.left_col",".back_face.upper.left_col":".bottom_face.upper.left_col",".back_face.middle.left_col":".bottom_face.middle.left_col",".back_face.lower.left_col":".bottom_face.lower.left_col",".left_face.upper.left_col":".left_face.lower.left_col",".left_face.middle.left_col":".left_face.lower.middle_col",
            ".left_face.lower.left_col":".left_face.lower.right_col",".left_face.upper.middle_col":".left_face.middle.left_col",".left_face.lower.middle_col":".left_face.middle.right_col",".left_face.upper.right_col":".left_face.upper.left_col",".left_face.middle.right_col":".left_face.upper.middle_col",".left_face.lower.right_col":".left_face.upper.right_col",".left_face.middle.middle_col":".left_face.middle.middle_col"
        },
        "L-counter":{
            ".top_face.upper.left_col":".front_face.upper.left_col",".top_face.middle.left_col":".front_face.middle.left_col",".top_face.lower.left_col":".front_face.lower.left_col",".front_face.upper.left_col":".bottom_face.upper.left_col",".front_face.middle.left_col":".bottom_face.middle.left_col",".front_face.lower.left_col":".bottom_face.lower.left_col",".bottom_face.upper.left_col":".back_face.upper.left_col",
            ".bottom_face.middle.left_col":".back_face.middle.left_col",".bottom_face.lower.left_col":".back_face.lower.left_col",".back_face.upper.left_col":".top_face.upper.left_col",".back_face.middle.left_col":".top_face.middle.left_col",".back_face.lower.left_col":".top_face.lower.left_col",".left_face.upper.left_col":".left_face.upper.right_col",".left_face.middle.left_col":".left_face.upper.middle_col",
            ".left_face.lower.left_col":".left_face.upper.left_col",".left_face.upper.middle_col":".left_face.middle.right_col",".left_face.lower.middle_col":".left_face.middle.left_col",".left_face.upper.right_col":".left_face.lower.right_col",".left_face.middle.right_col":".left_face.lower.middle_col",".left_face.lower.right_col":".left_face.lower.left_col",".left_face.middle.middle_col":".left_face.middle.middle_col"
        },
        'R-counter':{
            ".top_face.upper.right_col":".front_face.upper.right_col",".top_face.middle.right_col":".front_face.middle.right_col",".top_face.lower.right_col":".front_face.lower.right_col",".front_face.upper.right_col":".bottom_face.upper.right_col",".front_face.middle.right_col":".bottom_face.middle.right_col",".front_face.lower.right_col":".bottom_face.lower.right_col",".bottom_face.upper.right_col":".back_face.upper.right_col",
            ".bottom_face.middle.right_col":".back_face.middle.right_col",".bottom_face.lower.right_col":".back_face.lower.right_col",".back_face.upper.right_col":".top_face.upper.right_col",".back_face.middle.right_col":".top_face.middle.right_col",".back_face.lower.right_col":".top_face.lower.right_col",".right_face.upper.left_col":".right_face.lower.left_col",".right_face.middle.left_col":".right_face.lower.middle_col",
            ".right_face.lower.left_col":".right_face.lower.right_col",".right_face.upper.middle_col":".right_face.middle.left_col",".right_face.middle.middle_col":".right_face.middle.middle_col",".right_face.lower.middle_col":".right_face.middle.right_col",".right_face.upper.right_col":".right_face.upper.left_col",".right_face.middle.right_col":".right_face.upper.middle_col",".right_face.lower.right_col":".right_face.upper.right_col"
        },
        'RM-counter':{
            ".top_face.upper.right_col":".back_face.upper.right_col",".top_face.middle.right_col":".back_face.middle.right_col",".top_face.lower.right_col":".back_face.lower.right_col",".front_face.upper.right_col":".top_face.upper.right_col",".front_face.middle.right_col":".top_face.middle.right_col",".front_face.lower.right_col":".top_face.lower.right_col",".bottom_face.upper.right_col":".front_face.upper.right_col",
            ".bottom_face.middle.right_col":".front_face.middle.right_col",".bottom_face.lower.right_col":".front_face.lower.right_col",".back_face.upper.right_col":".bottom_face.upper.right_col",".back_face.middle.right_col":".bottom_face.middle.right_col",".back_face.lower.right_col":".bottom_face.lower.right_col",".right_face.upper.left_col":".right_face.upper.right_col",".right_face.middle.left_col":".right_face.upper.middle_col",
            ".right_face.lower.left_col":".right_face.upper.left_col",".right_face.upper.middle_col":".right_face.middle.right_col",".right_face.lower.middle_col":".right_face.middle.left_col",".right_face.upper.right_col":".right_face.lower.right_col",".right_face.middle.right_col":".right_face.lower.middle_col",".right_face.lower.right_col":".right_face.lower.left_col",".right_face.middle.middle_col":".right_face.middle.middle_col"
        },
        'CM-right':{
            ".top_face.upper.middle_col":".front_face.upper.middle_col",".top_face.middle.middle_col":".front_face.middle.middle_col",".top_face.lower.middle_col":".front_face.lower.middle_col",".front_face.upper.middle_col":".bottom_face.upper.middle_col",
            ".front_face.middle.middle_col":".bottom_face.middle.middle_col",".front_face.lower.middle_col":".bottom_face.lower.middle_col",".bottom_face.upper.middle_col":".back_face.upper.middle_col",".bottom_face.middle.middle_col":".back_face.middle.middle_col",
            ".bottom_face.lower.middle_col":".back_face.lower.middle_col",".back_face.upper.middle_col":".top_face.upper.middle_col",".back_face.middle.middle_col":".top_face.middle.middle_col",".back_face.lower.middle_col":".top_face.lower.middle_col"
        },
        'CM-left':{
            ".top_face.upper.middle_col":".back_face.upper.middle_col",".top_face.middle.middle_col":".back_face.middle.middle_col",".top_face.lower.middle_col":".back_face.lower.middle_col",".front_face.upper.middle_col":".top_face.upper.middle_col",
            ".front_face.middle.middle_col":".top_face.middle.middle_col",".front_face.lower.middle_col":".top_face.lower.middle_col",".bottom_face.upper.middle_col":".front_face.upper.middle_col",".bottom_face.middle.middle_col":".front_face.middle.middle_col",
            ".bottom_face.lower.middle_col":".front_face.lower.middle_col",".back_face.upper.middle_col":".bottom_face.upper.middle_col",".back_face.middle.middle_col":".bottom_face.middle.middle_col",".back_face.lower.middle_col":".bottom_face.lower.middle_col"
        },
        'UE-left':{
            ".right_face.upper.left_col":".front_face.upper.left_col",".right_face.upper.middle_col":".front_face.upper.middle_col",".right_face.upper.right_col":".front_face.upper.right_col",".front_face.upper.left_col":".left_face.upper.left_col",".front_face.upper.middle_col":".left_face.upper.middle_col",".front_face.upper.right_col":".left_face.upper.right_col",".left_face.upper.left_col":".back_face.lower.right_col",
            ".left_face.upper.middle_col":".back_face.lower.middle_col",".left_face.upper.right_col":".back_face.lower.left_col",".back_face.lower.right_col":".right_face.upper.left_col",".back_face.lower.middle_col":".right_face.upper.middle_col",".back_face.lower.left_col":".right_face.upper.right_col",".top_face.upper.left_col":".top_face.upper.right_col",".top_face.middle.left_col":".top_face.upper.middle_col",
            ".top_face.lower.left_col":".top_face.upper.left_col",".top_face.upper.middle_col":".top_face.middle.right_col",".top_face.lower.middle_col":".top_face.middle.left_col",".top_face.upper.right_col":".top_face.lower.right_col",".top_face.middle.right_col":".top_face.lower.middle_col",".top_face.lower.right_col":".top_face.lower.left_col",".top_face.middle.middle_col":".top_face.middle.middle_col"
        },
        'UE-right':{
            ".left_face.upper.left_col":".front_face.upper.left_col",".left_face.upper.middle_col":".front_face.upper.middle_col",".left_face.upper.right_col":".front_face.upper.right_col",".front_face.upper.left_col":".right_face.upper.left_col",".front_face.upper.middle_col":".right_face.upper.middle_col",".front_face.upper.right_col":".right_face.upper.right_col",".right_face.upper.left_col":".back_face.lower.right_col",
            ".right_face.upper.middle_col":".back_face.lower.middle_col",".right_face.upper.right_col":".back_face.lower.left_col",".back_face.lower.right_col":".left_face.upper.left_col",".back_face.lower.middle_col":".left_face.upper.middle_col",".back_face.lower.left_col":".left_face.upper.right_col",".top_face.upper.left_col":".top_face.lower.left_col",".top_face.middle.left_col":".top_face.lower.middle_col",
            ".top_face.lower.left_col":".top_face.lower.right_col",".top_face.upper.middle_col":".top_face.middle.left_col",".top_face.middle.middle_col":".top_face.middle.middle_col",".top_face.lower.middle_col":".top_face.middle.right_col",".top_face.upper.right_col":".top_face.upper.left_col",".top_face.middle.right_col":".top_face.upper.middle_col",".top_face.lower.right_col":".top_face.upper.right_col"
        },
        'CE-right':{
            ".front_face.middle.left_col":".right_face.middle.left_col",".front_face.middle.middle_col":".right_face.middle.middle_col",".front_face.middle.right_col":".right_face.middle.right_col",".left_face.middle.left_col":".front_face.middle.left_col",
            ".left_face.middle.middle_col":".front_face.middle.middle_col",".left_face.middle.right_col":".front_face.middle.right_col",".back_face.middle.left_col":".left_face.middle.right_col",".back_face.middle.middle_col":".left_face.middle.middle_col",
            ".back_face.middle.right_col":".left_face.middle.left_col",".right_face.middle.left_col":".back_face.middle.right_col",".right_face.middle.middle_col":".back_face.middle.middle_col",".right_face.middle.right_col":".back_face.middle.left_col"
        },
        'CE-left':{
            ".front_face.middle.left_col":".left_face.middle.left_col",".front_face.middle.middle_col":".left_face.middle.middle_col",".front_face.middle.right_col":".left_face.middle.right_col",".right_face.middle.left_col":".front_face.middle.left_col",
            ".right_face.middle.middle_col":".front_face.middle.middle_col",".right_face.middle.right_col":".front_face.middle.right_col",".back_face.middle.left_col":".right_face.middle.right_col",".back_face.middle.middle_col":".right_face.middle.middle_col",
            ".back_face.middle.right_col":".right_face.middle.left_col",".left_face.middle.left_col":".back_face.middle.right_col",".left_face.middle.middle_col":".back_face.middle.middle_col",".left_face.middle.right_col":".back_face.middle.left_col"
        },
        'DE-left':{
            ".front_face.lower.left_col":".left_face.lower.left_col",".front_face.lower.middle_col":".left_face.lower.middle_col",".front_face.lower.right_col":".left_face.lower.right_col",".left_face.lower.left_col":".back_face.upper.right_col",".left_face.lower.middle_col":".back_face.upper.middle_col",".left_face.lower.right_col":".back_face.upper.left_col",".back_face.upper.right_col":".right_face.lower.left_col",
            ".back_face.upper.middle_col":".right_face.lower.middle_col",".back_face.upper.left_col":".right_face.lower.right_col",".right_face.lower.left_col":".front_face.lower.left_col",".right_face.lower.middle_col":".front_face.lower.middle_col",".right_face.lower.right_col":".front_face.lower.right_col",".bottom_face.upper.left_col":".bottom_face.lower.left_col",".bottom_face.middle.left_col":".bottom_face.lower.middle_col",
            ".bottom_face.lower.left_col":".bottom_face.lower.right_col",".bottom_face.upper.middle_col":".bottom_face.middle.left_col",".bottom_face.middle.middle_col":".bottom_face.middle.middle_col",".bottom_face.lower.middle_col":".bottom_face.middle.right_col",".bottom_face.upper.right_col":".bottom_face.upper.left_col",".bottom_face.middle.right_col":".bottom_face.upper.middle_col",".bottom_face.lower.right_col":".bottom_face.upper.right_col"
        },
        'DE-right':{
            ".front_face.lower.left_col":".right_face.lower.left_col",".front_face.lower.middle_col":".right_face.lower.middle_col",".front_face.lower.right_col":".right_face.lower.right_col",".right_face.lower.left_col":".back_face.upper.right_col",".right_face.lower.middle_col":".back_face.upper.middle_col",".right_face.lower.right_col":".back_face.upper.left_col",".back_face.upper.right_col":".left_face.lower.left_col",
            ".back_face.upper.middle_col":".left_face.lower.middle_col",".back_face.upper.left_col":".left_face.lower.right_col",".left_face.lower.left_col":".front_face.lower.left_col",".left_face.lower.middle_col":".front_face.lower.middle_col",".left_face.lower.right_col":".front_face.lower.right_col",".bottom_face.upper.left_col":".bottom_face.upper.right_col",".bottom_face.middle.left_col":".bottom_face.upper.middle_col",
            ".bottom_face.lower.left_col":".bottom_face.upper.left_col",".bottom_face.upper.middle_col":".bottom_face.middle.right_col",".bottom_face.lower.middle_col":".bottom_face.middle.left_col",".bottom_face.upper.right_col":".bottom_face.lower.right_col",".bottom_face.middle.right_col":".bottom_face.lower.middle_col",".bottom_face.lower.right_col":".bottom_face.lower.left_col",".bottom_face.middle.middle_col":".bottom_face.middle.middle_col"
        },
        'FS-left':{
            ".top_face.lower.left_col":".left_face.lower.right_col",".top_face.lower.middle_col":".left_face.middle.right_col",".top_face.lower.right_col":".left_face.upper.right_col",".left_face.lower.right_col":".bottom_face.upper.right_col",".left_face.middle.right_col":".bottom_face.upper.middle_col",".left_face.upper.right_col":".bottom_face.upper.left_col",".bottom_face.upper.left_col":".right_face.lower.left_col",
            ".bottom_face.upper.middle_col":".right_face.middle.left_col",".bottom_face.upper.right_col":".right_face.upper.left_col",".right_face.lower.left_col":".top_face.lower.right_col",".right_face.middle.left_col":".top_face.lower.middle_col",".right_face.upper.left_col":".top_face.lower.left_col",".front_face.upper.left_col":".front_face.lower.left_col",".front_face.middle.left_col":".front_face.lower.middle_col",
            ".front_face.lower.left_col":".front_face.lower.right_col",".front_face.upper.middle_col":".front_face.middle.left_col",".front_face.middle.middle_col":".front_face.middle.middle_col",".front_face.lower.middle_col":".front_face.middle.right_col",".front_face.upper.right_col":".front_face.upper.left_col",".front_face.middle.right_col":".front_face.upper.middle_col",".front_face.lower.right_col":".front_face.upper.right_col"
        },
        'FS-right':{
            ".top_face.lower.left_col":".right_face.upper.left_col",".top_face.lower.middle_col":".right_face.middle.left_col",".top_face.lower.right_col":".right_face.lower.left_col",".left_face.lower.right_col":".top_face.lower.left_col",".left_face.middle.right_col":".top_face.lower.middle_col",".left_face.upper.right_col":".top_face.lower.right_col",".bottom_face.upper.left_col":".left_face.upper.right_col",
            ".bottom_face.upper.middle_col":".left_face.middle.right_col",".bottom_face.upper.right_col":".left_face.lower.right_col",".right_face.lower.left_col":".bottom_face.upper.left_col",".right_face.middle.left_col":".bottom_face.upper.middle_col",".right_face.upper.left_col":".bottom_face.upper.right_col",".front_face.upper.left_col":".front_face.upper.right_col",".front_face.middle.left_col":".front_face.upper.middle_col",
            ".front_face.lower.left_col":".front_face.upper.left_col",".front_face.upper.middle_col":".front_face.middle.right_col",".front_face.lower.middle_col":".front_face.middle.left_col",".front_face.upper.right_col":".front_face.lower.right_col",".front_face.middle.right_col":".front_face.lower.middle_col",".front_face.lower.right_col":".front_face.lower.left_col",".front_face.middle.middle_col":".front_face.middle.middle_col"
            
        },
        'CS-left':{
            ".top_face.middle.left_col":".left_face.lower.middle_col",".top_face.middle.middle_col":".left_face.middle.middle_col",".top_face.middle.right_col":".left_face.upper.middle_col",".left_face.upper.middle_col":".bottom_face.middle.left_col",
            ".left_face.middle.middle_col":".bottom_face.middle.middle_col",".left_face.lower.middle_col":".bottom_face.middle.right_col",".bottom_face.middle.left_col":".right_face.lower.middle_col",".bottom_face.middle.middle_col":".right_face.middle.middle_col",
            ".bottom_face.middle.right_col":".right_face.upper.middle_col",".right_face.lower.middle_col":".top_face.middle.right_col",".right_face.middle.middle_col":".top_face.middle.middle_col",".right_face.upper.middle_col":".top_face.middle.left_col"
        
        },
        'CS-right':{
            ".left_face.lower.middle_col":".top_face.middle.left_col",".left_face.middle.middle_col":".top_face.middle.middle_col",".left_face.upper.middle_col":".top_face.middle.right_col",".bottom_face.middle.left_col":".left_face.upper.middle_col",
            ".bottom_face.middle.middle_col":".left_face.middle.middle_col",".bottom_face.middle.right_col":".left_face.lower.middle_col",".right_face.lower.middle_col":".bottom_face.middle.left_col",".right_face.middle.middle_col":".bottom_face.middle.middle_col",
            ".right_face.upper.middle_col":".bottom_face.middle.right_col",".top_face.middle.right_col":".right_face.lower.middle_col",".top_face.middle.middle_col":".right_face.middle.middle_col",".top_face.middle.left_col":".right_face.upper.middle_col"
        },
        'BS-right':{
            ".top_face.upper.left_col":".right_face.upper.right_col",".top_face.upper.middle_col":".right_face.middle.right_col",".top_face.upper.right_col":".right_face.lower.right_col",".right_face.upper.right_col":".bottom_face.lower.right_col",".right_face.middle.right_col":".bottom_face.lower.middle_col",".right_face.lower.right_col":".bottom_face.lower.left_col",".bottom_face.lower.right_col":".left_face.lower.left_col",
            ".bottom_face.lower.middle_col":".left_face.middle.left_col",".bottom_face.lower.left_col":".left_face.upper.left_col",".left_face.lower.left_col":".top_face.upper.left_col",".left_face.middle.left_col":".top_face.upper.middle_col",".left_face.upper.left_col":".top_face.upper.right_col",".back_face.upper.left_col":".back_face.lower.left_col",".back_face.middle.left_col":".back_face.lower.middle_col",
            ".back_face.lower.left_col":".back_face.lower.right_col",".back_face.upper.middle_col":".back_face.middle.left_col",".back_face.middle.middle_col":".back_face.middle.middle_col",".back_face.lower.middle_col":".back_face.middle.right_col",".back_face.upper.right_col":".back_face.upper.left_col",".back_face.middle.right_col":".back_face.upper.middle_col",".back_face.lower.right_col":".back_face.upper.right_col"
        },
        'BS-left':{
            ".right_face.upper.right_col":".top_face.upper.left_col",".right_face.middle.right_col":".top_face.upper.middle_col",".right_face.lower.right_col":".top_face.upper.right_col",".bottom_face.lower.right_col":".right_face.upper.right_col",".bottom_face.lower.middle_col":".right_face.middle.right_col",".bottom_face.lower.left_col":".right_face.lower.right_col",".left_face.lower.left_col":".bottom_face.lower.right_col",
            ".left_face.middle.left_col":".bottom_face.lower.middle_col",".left_face.upper.left_col":".bottom_face.lower.left_col",".top_face.upper.left_col":".left_face.lower.left_col",".top_face.upper.middle_col":".left_face.middle.left_col",".top_face.upper.right_col":".left_face.upper.left_col",".back_face.upper.left_col":".back_face.upper.right_col",".back_face.middle.left_col":".back_face.upper.middle_col",
            ".back_face.lower.left_col":".back_face.upper.left_col",".back_face.upper.middle_col":".back_face.middle.right_col",".back_face.lower.middle_col":".back_face.middle.left_col",".back_face.upper.right_col":".back_face.lower.right_col",".back_face.middle.right_col":".back_face.lower.middle_col",".back_face.lower.right_col":".back_face.lower.left_col",".back_face.middle.middle_col":".back_face.middle.middle_col"
        }
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