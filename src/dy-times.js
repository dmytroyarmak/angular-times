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
				var previousNode = $element[0],
					blocks = [];
				
				$scope.$watch($attr.dyTimes, function dyTimesWatchAction(times) {
					var i, block;
					var delta = times - blocks.length;
					if (delta > 0) {
						for (i = 0; i < delta; i += 1) {
							$transclude(dyTimesTransclude);
						}
					} else {
						for (i = delta; i < 0; i += 1) {
							block = blocks.pop();
							block.clone.remove();
							block.scope.$destroy();
							previousNode = blocks.length ? blocks[blocks.length - 1].clone : $element[0];
						}
					}
				});
								
				function dyTimesTransclude(clone, newScope) {
					clone[clone.length++] = document.createComment(' end dyTimes: ' + $attr.dyTimes + ' ');
					$animate.enter(clone, null, angular.element(previousNode));
					previousNode = clone;
					blocks.push({
						clone: clone,
						scope: newScope
					});
				}
			}
		}	
}());