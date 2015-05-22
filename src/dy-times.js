/* global angular */
!(function() {
	'use strict';
	
	angular
		.module('dyTimes', [])
		.directive('dyTimes', dyTimesDirective);
		
		dyTimesDirective.$inject = ['$animate'];
		function dyTimesDirective($animate) {
			return {
				terminal: true,
				transclude: 'element',
				restrict: 'A',
				link: dyTimesLink
			};
			
			function dyTimesLink($scope, $element, $attr, ctrl, $transclude) {
				var previousNode = $element[0];
				var times = window.parseInt($attr.dyTimes, 10);
				var i;
				
				if (times > 0) {
					for (i = 0; i < times; i += 1) {
						$transclude(dyTimesTransclude);
					}
				} else {
					
				}
				
				function dyTimesTransclude(clone, newScope) {
					clone[clone.length++] = document.createComment(' end dyTimes: ' + $attr.dyTimes + ' ');
					$animate.enter(clone, null, angular.element(previousNode));
					previousNode = clone;
				}
			}
		}	
}());