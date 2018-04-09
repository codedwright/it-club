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