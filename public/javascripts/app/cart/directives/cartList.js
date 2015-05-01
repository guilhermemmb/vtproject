'use strict';

angular.module('vtexApp').directive('cartList', ['cartService', function (cartService) {
	return {
		templateUrl: '/javascripts/app/cart/views/partials/cartList.html',
		restrict: 'E',
		scope: {
		},
		controllerAs: 'vm',
		controller: function ($scope) {
			var vm = this;

			vm.list = cartService.getItems();
			vm.total = 0;

			function getListSize() {
				return (Object.keys(vm.list).length);
			}
			vm.getListSize = getListSize;

			function onQuantityChange(item) {
				//dirty check
				if(!!parseInt(item.hours) === false) {
					item.hours = item.lastHoursValue;
					return;
				}

				item.lastHoursValue = item.hours;

				calculateTotal();
			}
			vm.onQuantityChange = onQuantityChange;

			function remove(item) {
				cartService.remove(item);
				calculateTotal();

			}
			vm.remove = remove;

			function calculateTotal() {
				var newTotal = 0;
				for(var element in vm.list) {
					if(vm.list.hasOwnProperty(element)) {
						var el = vm.list[element];
						newTotal += el.hours * el.value;
					}
				}

				vm.total = newTotal.toFixed(2);
			}

			(function () {
				calculateTotal();
			})();

		}
	}
}]);
