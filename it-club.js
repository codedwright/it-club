/*!
 * It-club v.2.0.0
 * Copyright (c) 2018 Foo.
 *
 * Author: Joseph Wright (joseph@codedwright.com).
 */

var app = angular.module('itclub', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ngMap']);
app.controller('AboutController', ['$scope', function($scope) {
	
}]);
app.controller('CalendarController', ['$scope', function($scope) {
	
}]);
app.controller('ContactController', ['$scope', function($scope) {
	
}]);
app.controller('EventsController', ['$scope', function($scope) {
	
}]);
app.controller('HomeController', ['$scope', '$http', 'NgMap', function($scope, $http, NgMap) {
    
    // https://ngmap.github.io/     
    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyANiFWCJ6jQBnnJVez5wBS7tbERHaWm330";
    NgMap.getMap().then(function(map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
    }); 
    $http.get("https://api.orgsync.com/api/v3/portals/139217/events.json?key=saQO-P_BwlyykPjd0Et9woSjp_IgtCbnK1NhHcCBdA0&per_page=100&upcoming=true").then((results) => {
        console.log(results.data);
        $scope.events = results.data.data;
    })
}]);
app.controller('NewsController', ['$scope', function($scope) {
	
}]);
app.controller('PhotosController', ['$scope', 'photos', '$routeParams', function($scope, photos, $routeParams) {
	photos.success(function(data) {
		$scope.detail = data[$routeParams.id];
		$scope.small = window.outerWidth < 700;
	});
}]);
//pull json from orgsync
app.factory('photos', ['$http', function($http) {
	return $http.get('https://api.unsplash.com/photos/?client_id=5badc84bef4c17ed1a47d6a12d01048984856830bb0ef6a9f446a0005378bd32')
	.success(function(data) {
		//console.log(data);
		data.splice(9, 1);
		return data;
	})
	.error(function(data) {
		console.log("Error: " + data);
		return data;
	});
}]);

app.config(['$locationProvider', '$routeProvider',
		function config($locationProvider, $routeProvider) {
			
			$routeProvider  
				.when('/', { 
					controller: 'HomeController',
					templateUrl: 'views/home.html',
				})
				.when('/about', { 
					controller: 'AboutController',
					templateUrl: 'views/about.html',
				})
				.when('/calendar', { 
					controller: 'CalendarController',
					templateUrl: 'views/calendar.html',
				})
				.when('/events', { 
					controller: 'EventsController',
					templateUrl: 'views/events.html',
				})
				.when('/news', { 
					controller: 'NewsController',
					templateUrl: 'views/news.html',
				})
				.when('/photos', { 
					controller: 'PhotosController',
					templateUrl: 'views/photos.html',
				})
				.when('/contact', { 
					controller: 'ContactController',
					templateUrl: 'views/contact.html',
				})
				.otherwise('/'); 
				
			$locationProvider.html5Mode(true);
		}
	]);
/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );
/**
 * borderMenu.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
(function() {

 	// http://stackoverflow.com/a/11381730/989439
	function mobilecheck() {
		var check = false;
		(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	}

	function init() {

		var menu = document.getElementById( 'bt-menu' ),
			trigger = document.querySelector( ' a.bt-menu-trigger' ),
			// triggerPlay only for demo 6
			triggerPlay = document.querySelector( 'a.bt-menu-trigger-out' ),
			// event type (if mobile use touch events)
			eventtype = mobilecheck() ? 'touchstart' : 'click',
			resetMenu = function() {
				classie.remove( menu, 'bt-menu-open' );
				classie.add( menu, 'bt-menu-close' );
			},
			closeClickFn = function( ev ) {
				resetMenu();
				overlay.removeEventListener( eventtype, closeClickFn );
			};

		var overlay = document.createElement('div');
		overlay.className = 'bt-overlay';
		menu.appendChild( overlay );

		trigger.addEventListener( eventtype, function( ev ) {
			ev.stopPropagation();
			ev.preventDefault();
			
			if( classie.has( menu, 'bt-menu-open' ) ) {
				resetMenu();
			}
			else {
				classie.remove( menu, 'bt-menu-close' );
				classie.add( menu, 'bt-menu-open' );
				overlay.addEventListener( eventtype, closeClickFn );
			}
		});

		if( triggerPlay ) {
			triggerPlay.addEventListener( eventtype, function( ev ) {
				ev.stopPropagation();
				ev.preventDefault();

				classie.remove( menu, 'bt-menu-close' );
				classie.add( menu, 'bt-menu-open' );
				overlay.addEventListener( eventtype, closeClickFn );
			});
		}

	}

	init();

})();
// $(document).ready(function(){
// 	// Add smooth scrolling to all links
// 	$("nav a, footer a[href='#top']").on('click', function(event) {

// 	// Make sure this.hash has a value before overriding default behavior
// 	if (this.hash !== "") {
// 			// Prevent default anchor click behavior
// 			event.preventDefault();
// 			// Store hash
// 			var hash = this.hash;
// 			// Using jQuery's animate() method to add smooth page scroll
// 			// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
// 			$('html, body').animate({
// 				scrollTop: $(hash).offset().top
// 			}, 800, function() {
// 			// Add hash (#) to URL when done scrolling (default click behavior)
// 			window.location.hash = hash;
// 		});
// 		} // End if
// 	});
// });

app.directive('smoothScroll', ['$log', '$timeout', '$window',
	function ($log, $timeout, $window) {
		/*
		  Retrieve the current vertical position
		  @returns Current vertical position
	  */

		var currentYPosition, elmYPosition, smoothScroll;
		currentYPosition = function () {
			if ($window.pageYOffset) {
				return $window.pageYOffset;
			}
			if ($window.document.documentElement && $window.document.documentElement.scrollTop) {
				return $window.document.documentElement.scrollTop;
			}
			if ($window.document.body.scrollTop) {
				return $window.document.body.scrollTop;
			}
			return 0;
		};
		/*
		  Get the vertical position of a DOM element
		  @param eID The DOM element id
		  @returns The vertical position of element with id eID
	  */

		elmYPosition = function (eID) {
			var elm, node, y;
			elm = document.getElementById(eID);
			if (elm) {
				y = elm.offsetTop;
				node = elm;
				while (node.offsetParent && node.offsetParent !== document.body) {
					node = node.offsetParent;
					y += node.offsetTop;
				}
				return y;
			}
			return 0;
		};
		/*
		  Smooth scroll to element with a specific ID without offset
		  @param eID The element id to scroll to
		  @param offSet Scrolling offset
	  */

		smoothScroll = function (eID, offSet) {
			var distance, i, leapY, speed, startY, step, stopY, timer, _results;
			startY = currentYPosition();
			stopY = elmYPosition(eID) - offSet;
			distance = (stopY > startY ? stopY - startY : startY - stopY);
			if (distance < 100) {
				scrollTo(0, stopY);
				return;
			}
			speed = Math.round(distance / 100);
			if (speed >= 20) {
				speed = 20;
			}
			step = Math.round(distance / 25);
			leapY = (stopY > startY ? startY + step : startY - step);
			timer = 0;
			if (stopY > startY) {
				i = startY;
				while (i < stopY) {
					setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
					leapY += step;
					if (leapY > stopY) {
						leapY = stopY;
					}
					timer++;
					i += step;
				}
				return;
			}
			i = startY;
			_results = [];
			while (i > stopY) {
				setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
				leapY -= step;
				if (leapY < stopY) {
					leapY = stopY;
				}
				timer++;
				_results.push(i -= step);
			}
			return _results;
		};
		return {
			restrict: 'A',
			link: function (scope, element, attr) {
				return element.bind('click', function () {
					var offset;
					if (attr.target) {
						offset = attr.offset || 100;
						$log.log('Smooth scroll: scrolling to', attr.target, 'with offset', offset);
						return smoothScroll(attr.target, offset);
					} else {
						return $log.warn('Smooth scroll: no target specified');
					}
				});
			}
		};
	}
])