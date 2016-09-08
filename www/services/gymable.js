(function () {
    'use strict';
    
    angular.module('gymable', ['ionic'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    angular
        .module('gymable')
        .controller('GymableCtrl', GymableCtrl);

    GymableCtrl.$inject = ['$scope', 'Plates', 'STANDARD_BARS'];

    function GymableCtrl($scope, Plates, STANDARD_BARS) {
		var maxWeight = 500;
		
        var vm = this;
		
        vm.olympicWeight = STANDARD_BARS.OLYMPC;
        vm.ezWeight = STANDARD_BARS.EZ_CURL;
        vm.selectedBar;
		  vm.plateCounts;
		
		  vm.totalWeight;
		
        vm.findPlateCounts = findPlateCounts;
		  vm.changeBar = changeBar;
        
        vm.decreaseWeight = decreaseWeight;
        vm.increaseWeight = increaseWeight;
        
        init();

       function init() {
          vm.selectedBar = vm.olympicWeight;
          vm.totalWeight = 90; // starting weight 45x2 + olympic bar
          findPlateCounts();
       }

        function increaseWeight() {
           vm.totalWeight = parseInt(vm.totalWeight) + 1;
			  if (vm.totalWeight > maxWeight) {
              vm.totalWeight = maxWeight;
           }
			
           findPlateCounts();
        }
		
        function decreaseWeight() {
            vm.totalWeight = parseInt(vm.totalWeight) - 1;
			
			if (vm.totalWeight < vm.selectedBar) {
				vm.totalWeight = vm.selectedBar;
			}
			
            findPlateCounts();
        }
		
		function changeBar() {
			if (vm.totalWeight < vm.selectedBar) {
				vm.totalWeight = vm.selectedBar;	
			}
			
			findPlateCounts();
		}
		
        function findPlateCounts() {
            vm.plateCounts = Plates.findPlateCounts(vm.selectedBar, vm.totalWeight);
        }
    }
})();