(function() {
	'use strict';
	
    angular
        .module('gymable')
        .factory('Plates', Plates);
    
    Plates.$inject = ['STANDARD_WEIGHTS', 'STANDARD_BARS', 'MICRO_WEIGHTS'];
    
    function Plates(STANDARD_WEIGHTS, STANDARD_BARS, MICRO_WEIGHTS) {
        var minimumWeight = STANDARD_BARS.EZ_CURL + (2 * MICRO_WEIGHTS.ONE_QUARTER);
        
        var service = {
            findEzCurlCount: _.curry(findPlateCounts)(STANDARD_BARS.EZ_CURL),
            findOlympicCount: _.curry(findPlateCounts)(STANDARD_BARS.OLYMPC),
			findPlateCounts: findPlateCounts
		};
        
        return service;
        
        function findPlateCounts(bar, total) {
            if (_.isNull(total) ||
                _.isNaN(total) ||
                _.isUndefined(total) ||
                  isTotalLessThanMin(bar, total)) {
                    return {};
            }
            
			return mapCounts(findPlates((total -= bar), allPlates()));
        }
        
        function isTotalLessThanMin(bar, total) {
            return total < bar + (2*MICRO_WEIGHTS.ONE_QUARTER);  
        }
        
        function findPlates(weight, plates) {
			if (weight === 0) {
				return [];
			}
			
			var plate = _.first(plates);
			var doubledPlate = plate * 2;
			var result;
			if (weight >= doubledPlate) {
				weight -= doubledPlate;
				result = findPlates(weight, plates);
				result.push(plate);
				return result;
			}
			
			return findPlates(weight, _.rest(plates));
		}
		
		function mapCounts(weights) {
			return _(weights)
			        .countBy(function(n) { return n; })
			        .mapValues(function(n) { return n * 2; })
					.value();
		}
		
		function allPlates() {
			return _.union(_.values(MICRO_WEIGHTS), _.values(STANDARD_WEIGHTS))
			        .sort(function(a, b){return b-a});
		}
	}
                              
}());