'use strict';

(function () {
    //var _ = require('lodash');
    
    describe('Plates Service Tests', function () {
        var Plates, STANDARD_BARS, STANDARD_WEIGHTS, MICRO_WEIGHTS;
        var actual;
        
        beforeEach(module('gymable'));
        
        beforeEach(inject(function (_Plates_, _STANDARD_BARS_, _STANDARD_WEIGHTS_, _MICRO_WEIGHTS_) {
            Plates = _Plates_;
            STANDARD_BARS = _STANDARD_BARS_;
            STANDARD_WEIGHTS = _STANDARD_WEIGHTS_;
            MICRO_WEIGHTS = _MICRO_WEIGHTS_;
        }));

        it('should return an empty count given less than minimum ezCurl', function () {
            actual = Plates.findEzCurlCount(STANDARD_BARS.EZ_CURL + MICRO_WEIGHTS.ONE_QUARTER);
            expect(actual).toEqual({});
        });
        
        it('should return an empty count given NaN and ezCurl', function () {
            actual = Plates.findEzCurlCount(NaN)
            expect(actual).toEqual({});
        });
        
        it('should return an empty count given null arg and ezCurl', function () {
            actual = Plates.findEzCurlCount(null);
            expect(actual).toEqual({});
        });
        
        it('should return an empty count given undefined arg and ezCurl', function () {
            actual = Plates.findEzCurlCount(undefined);
            expect(actual).toEqual({});
        });
        
        it('should return an empty count given ezCurl', function () {
            var weight = STANDARD_BARS.EZ_CURL;
            assertEzCurlPlates(weight, {});
        });
        
        it('should return an empty count given olympic', function () {
            var weight = STANDARD_BARS.OLYMPC;
            assertOlympicPlates(weight, {});
        });

        /*
        .25 -> empty
        .5 -> .25
        1 -> .5
        1.25 -> either .5 or .75
        1.5 -> .75
        1.75 -> .75 or 1
        2 -> 1
        2.5 -> 1 + .25
        5 -> 2.5
        10 -> 5
        15 -> 5 + 2.5
        20 -> 10
        25 -> 10 + 2.5
        30 -> 10 + 5
        35 -> 10 + 5 + 2.5 
        40 -> 20
        41 -> 20 + .5
        41.25 -> 20 + .5 or 20 + .75
        41.5 -> 20 + .75
        41.75 -> 20 + .75 or 20 + 1
        45 -> 20 + 2.5
        50 -> 20 + 5
        55 -> 20 + 5 + 2.5
        60 -> 20 + 10
        65 -> 20 + 10 +2.5
        70 -> 35
        75 -> 35 + 2.5
        80 -> 35 + 5
        85 -> 35 + 5 + 2.5
        90 -> 45
        95 -> 45 + 2.5
        100 -> 45 + 5
        160 -> 45 + 35
        180 -> 45*4
        190 -> 45*4 + 2.5
        
        */
        
        /*
        it('should return empty given .25', function () {
            assertEzCurlPlates(.25, {});
        });
        
        
        it('should return a count given .5', function () {
            var expected = {
                            parseInt(MICRO_WEIGHTS.ONE_QUARTER): 2
                           };

            assertEzCurlPlates(.5, expected);
        });

        
        it('should return a count given 1', function () {
            var expected = {
                            MICRO_WEIGHTS.ONE_HALF: 2
                           };
                  
            assertEzCurlPlates(1, expected);
        });
         */
		
		it('should return a count given 90 and Olympic', function () {
            var weight = STANDARD_BARS.OLYMPC + 90;
			var expected = { 45: 2 };
			
            assertOlympicPlates(weight, expected);
        });

		it('should return a count given 95 and Olympic', function () {
            var weight = STANDARD_BARS.OLYMPC + 95;
			var expected = { 45: 2,
						     2.5: 2};
			
            assertOlympicPlates(weight, expected);
        });
		
		it('should return a count given 180 and Olympic', function () {
            var weight = STANDARD_BARS.OLYMPC + 180;
			var expected = { 45: 4};
			
            assertOlympicPlates(weight, expected);
        });
		
		it('should return a count given 185 total', function () {
            var weight = 185;
			var expected = { 45: 2, 25:2, .5:2};
			
            assertOlympicPlates(weight, expected);
        });
       
		it('should return a count given 190 total', function () {
         var weight = 190;
			var expected = { 45: 2, 25:2, 2.5:2, .5:2};
			
            assertOlympicPlates(weight, expected);
        });
       
		it('should return a count given 130 total', function () {
         var weight = 130;
			var expected = { 35: 2, 5:2, 2.5:2, .5:2};
			
            assertOlympicPlates(weight, expected);
        });
       
		it('should return a count given 125 total', function () {
         var weight = 125;
			var expected = { 35: 2, 5:2, .5:2};
			
            assertOlympicPlates(weight, expected);
        });
       
		it('should return a count given 72 total', function () {
            var weight = 72;
			var expected = { 1: 2, 10: 2, 0.5: 2, 2.5: 2 };
			
            assertOlympicPlates(weight, expected);
        });
        
        function assertEzCurlPlates(weight, expected) {
            actual = Plates.findEzCurlCount(weight);
			console.log(JSON.stringify(actual, null, 4));
            expect(actual).toEqual(expected);
        }
        
        function assertOlympicPlates(weight, expected) {
            actual = Plates.findOlympicCount(weight);
			console.log(JSON.stringify(actual, null, 4));
            expect(actual).toEqual(expected);
        }
		
    });
    
   


}());
    