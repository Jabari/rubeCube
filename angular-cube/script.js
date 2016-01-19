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
		console.log(a, b, c);
		return a, b, c;
	}

	$scope.randomHex = function(){
		var color = Math.floor(Math.random * 1000000);
		var color = "#" + color;
		console.log(color);
		return color;
	}

	var top, front, bottom, back, left, right;
	
 	top = document.querySelectorAll('.top-face');
 	bottom = document.querySelectorAll('.bottom-face');
 	front = document.querySelectorAll('.front-face');	
 	back = document.querySelectorAll('.back-face');
 	left = document.querySelectorAll('.left-face');
 	right = document.querySelectorAll('.right-face');
 	var sidesArr = [top, bottom, front, back, left, right];

 	var changeColors = function() {
 		var i = 0;
 		var len = sidesArr.length;
 		for (i; i < len; i++) {
 			top.style.backgroundColor = 
 		}
 	}

	// $scope.randomRGB = function(int) {
	// 	top = randomColor();
	// 	front = randomColor();
	// 	bottom = randomColor();
	// 	back = randomColor();
	// 	left = randomColor();
	// 	right = randomColor();
	// 	for (i = 0; i < top.length, i++) {
	// 		top.style.backgroundColor = randomColor();
	// 		top.style.backgroundColor = randomColor();
	// 		top.style.backgroundColor = randomColor();
	// 		top.style.backgroundColor = randomColor();
	// 		top.style.backgroundColor = randomColor();
	// 		top.style.backgroundColor = randomColor();
	// 	}

	// 	int = int / 2;
	// 	red = green = blue = Math.random() * color;
	// 	randomRGB = "rgb(" + red + ", " + green + ", " + blue +")";
	// 	console.log(int, randomRGB);
	// 	//red = green = blue = Math.random() * color;
		
	// 	top.style.backgroundColor = "rgb(" + red + ", 0 ,0)";
	// 	front.style.background = invert();
	// 	left.style.background = "rgb(0, " + green + ", 0)";
	// 	right.style.background = "rgb(0, 0, " + blue + ")";

	// }
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
	$.map(movementsMap, function(n){
	    return n+4;
	});
	// So on LM-left, "utl" => "btl"
 //    * Where "utl" class is .utl {-webkit-transform:rotateX(90deg)   translate3d(50px,-100px,0)}
 //    * and "btl" class is:  .btl {-webkit-transform:rotateX(-180deg) translate3d(50px,-250px,150px)}
 //    *
	var movementsMap = {
        'LM-left':{
            "utl":"btl","ucl":"bcl","ubl":"bbl","ftl":"utl","fcl":"ucl","fbl":"ubl","dtl":"ftl",
            "dcl":"fcl","dbl":"fbl","btl":"dtl","bcl":"dcl","bbl":"dbl","ltl":"lbl","lcl":"lbc",
            "lbl":"lbr","ltc":"lcl","lbc":"lcr","ltr":"ltl","lcr":"ltc","lbr":"ltr","lcc":"lcc"
        },
        "LM-right":{
            "utl":"ftl","ucl":"fcl","ubl":"fbl","ftl":"dtl","fcl":"dcl","fbl":"dbl","dtl":"btl",
            "dcl":"bcl","dbl":"bbl","btl":"utl","bcl":"ucl","bbl":"ubl","ltl":"ltr","lcl":"ltc",
            "lbl":"ltl","ltc":"lcr","lbc":"lcl","ltr":"lbr","lcr":"lbc","lbr":"lbl","lcc":"lcc"
        },
        'RM-right':{
            "utr":"ftr","ucr":"fcr","ubr":"fbr","ftr":"dtr","fcr":"dcr","fbr":"dbr","dtr":"btr",
            "dcr":"bcr","dbr":"bbr","btr":"utr","bcr":"ucr","bbr":"ubr","rtl":"rbl","rcl":"rbc",
            "rbl":"rbr","rtc":"rcl","rcc":"rcc","rbc":"rcr","rtr":"rtl","rcr":"rtc","rbr":"rtr"
        },
        'RM-left':{
            "utr":"btr","ucr":"bcr","ubr":"bbr","ftr":"utr","fcr":"ucr","fbr":"ubr","dtr":"ftr",
            "dcr":"fcr","dbr":"fbr","btr":"dtr","bcr":"dcr","bbr":"dbr","rtl":"rtr","rcl":"rtc",
            "rbl":"rtl","rtc":"rcr","rbc":"rcl","rtr":"rbr","rcr":"rbc","rbr":"rbl","rcc":"rcc"
        },
        'CM-right':{
            "utc":"ftc","ucc":"fcc","ubc":"fbc","ftc":"dtc",
            "fcc":"dcc","fbc":"dbc","dtc":"btc","dcc":"bcc",
            "dbc":"bbc","btc":"utc","bcc":"ucc","bbc":"ubc"
        },
        'CM-left':{
            "utc":"btc","ucc":"bcc","ubc":"bbc","ftc":"utc",
            "fcc":"ucc","fbc":"ubc","dtc":"ftc","dcc":"fcc",
            "dbc":"fbc","btc":"dtc","bcc":"dcc","bbc":"dbc"
        },
        'UE-left':{
            "rtl":"ftl","rtc":"ftc","rtr":"ftr","ftl":"ltl","ftc":"ltc","ftr":"ltr","ltl":"bbr",
            "ltc":"bbc","ltr":"bbl","bbr":"rtl","bbc":"rtc","bbl":"rtr","utl":"utr","ucl":"utc",
            "ubl":"utl","utc":"ucr","ubc":"ucl","utr":"ubr","ucr":"ubc","ubr":"ubl","ucc":"ucc"
        },
        'UE-right':{
            "ltl":"ftl","ltc":"ftc","ltr":"ftr","ftl":"rtl","ftc":"rtc","ftr":"rtr","rtl":"bbr",
            "rtc":"bbc","rtr":"bbl","bbr":"ltl","bbc":"ltc","bbl":"ltr","utl":"ubl","ucl":"ubc",
            "ubl":"ubr","utc":"ucl","ucc":"ucc","ubc":"ucr","utr":"utl","ucr":"utc","ubr":"utr"
        },
        'CE-right':{
            "fcl":"rcl","fcc":"rcc","fcr":"rcr","lcl":"fcl",
            "lcc":"fcc","lcr":"fcr","bcl":"lcr","bcc":"lcc",
            "bcr":"lcl","rcl":"bcr","rcc":"bcc","rcr":"bcl"
        },
        'CE-left':{
            "fcl":"lcl","fcc":"lcc","fcr":"lcr","rcl":"fcl",
            "rcc":"fcc","rcr":"fcr","bcl":"rcr","bcc":"rcc",
            "bcr":"rcl","lcl":"bcr","lcc":"bcc","lcr":"bcl"
        },
        'DE-left':{
            "fbl":"lbl","fbc":"lbc","fbr":"lbr","lbl":"btr","lbc":"btc","lbr":"btl","btr":"rbl",
            "btc":"rbc","btl":"rbr","rbl":"fbl","rbc":"fbc","rbr":"fbr","dtl":"dbl","dcl":"dbc",
            "dbl":"dbr","dtc":"dcl","dcc":"dcc","dbc":"dcr","dtr":"dtl","dcr":"dtc","dbr":"dtr"
        },
        'DE-right':{
            "fbl":"rbl","fbc":"rbc","fbr":"rbr","rbl":"btr","rbc":"btc","rbr":"btl","btr":"lbl",
            "btc":"lbc","btl":"lbr","lbl":"fbl","lbc":"fbc","lbr":"fbr","dtl":"dtr","dcl":"dtc",
            "dbl":"dtl","dtc":"dcr","dbc":"dcl","dtr":"dbr","dcr":"dbc","dbr":"dbl","dcc":"dcc"
        },
        'FS-left':{
            "ubl":"lbr","ubc":"lcr","ubr":"ltr","lbr":"dtr","lcr":"dtc","ltr":"dtl","dtl":"rbl",
            "dtc":"rcl","dtr":"rtl","rbl":"ubr","rcl":"ubc","rtl":"ubl","ftl":"fbl","fcl":"fbc",
            "fbl":"fbr","ftc":"fcl","fcc":"fcc","fbc":"fcr","ftr":"ftl","fcr":"ftc","fbr":"ftr"
        },
        'FS-right':{
            "ubl":"rtl","ubc":"rcl","ubr":"rbl","lbr":"ubl","lcr":"ubc","ltr":"ubr","dtl":"ltr",
            "dtc":"lcr","dtr":"lbr","rbl":"dtl","rcl":"dtc","rtl":"dtr","ftl":"ftr","fcl":"ftc",
            "fbl":"ftl","ftc":"fcr","fbc":"fcl","ftr":"fbr","fcr":"fbc","fbr":"fbl","fcc":"fcc"
            
        },
        'CS-left':{
            "ucl":"lbc","ucc":"lcc","ucr":"ltc","ltc":"dcl",
            "lcc":"dcc","lbc":"dcr","dcl":"rbc","dcc":"rcc",
            "dcr":"rtc","rbc":"ucr","rcc":"ucc","rtc":"ucl"
        
        },
        'CS-right':{
            "lbc":"ucl","lcc":"ucc","ltc":"ucr","dcl":"ltc",
            "dcc":"lcc","dcr":"lbc","rbc":"dcl","rcc":"dcc",
            "rtc":"dcr","ucr":"rbc","ucc":"rcc","ucl":"rtc"
        },
        'BS-right':{
            "utl":"rtr","utc":"rcr","utr":"rbr","rtr":"dbr","rcr":"dbc","rbr":"dbl","dbr":"lbl",
            "dbc":"lcl","dbl":"ltl","lbl":"utl","lcl":"utc","ltl":"utr","btl":"bbl","bcl":"bbc",
            "bbl":"bbr","btc":"bcl","bcc":"bcc","bbc":"bcr","btr":"btl","bcr":"btc","bbr":"btr"
        },
        'BS-left':{
            "rtr":"utl","rcr":"utc","rbr":"utr","dbr":"rtr","dbc":"rcr","dbl":"rbr","lbl":"dbr",
            "lcl":"dbc","ltl":"dbl","utl":"lbl","utc":"lcl","utr":"ltl","btl":"btr","bcl":"btc",
            "bbl":"btl","btc":"bcr","bbc":"bcl","btr":"bbr","bcr":"bbc","bbr":"bbl","bcc":"bcc"
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