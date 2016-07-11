(function(){
    angular
        .module('app.schedule')
        .controller('schedule', Schedule);

    Schedule.$inject = ['$scope', 'service'];

    function Schedule($scope, service){
        var vm = this;
        vm.radioSelected = '';
        vm.checkBox = false;
        vm.quote = {
            services: {
                numberOfDesks: {
                    name: 'Number of Desks',
                    quantity: 0,
                    costOfService: 29.99,
                    totalPrice: 0
                },
                numberOfBathrooms: {
                    name: 'Number of Bathrooms',
                    quantity: 0,
                    costOfService: 24.99,
                    totalPrice: 0
                },
                options: {
                    name: 'Options',
                    quantity: 0,
                    costOfService: 19.99,
                    totalPrice: 0
                }
            },
            total: 0
        };

        vm.selectedRadioButon = function(radioSelection){
            vm.radioSelected = radioSelection;
        }

        vm.toggleCheckBox = function(checked){
            vm.checkBox = checked;

            if (vm.checkBox){
                vm.quote.services.options.quantity = 1;
            } else {
                vm.quote.services.options.quantity = 0;
            }

            service.calculateTotal(vm.quote, function(total){
                vm.quote.total = total;
            });
        }

        $scope.$watch('vm.numberOfDesks', function(newValue, oldValue){
            if (newValue !== oldValue){
                vm.quote.services.numberOfDesks.quantity = newValue;
                service.calculateTotal(vm.quote, function(total){
                    vm.quote.total = total;
                });
            }
        });

        $scope.$watch('vm.numberOfBathrooms', function(newValue, oldValue){
            if (newValue !== oldValue){
                vm.quote.services.numberOfBathrooms.quantity = newValue;
                service.calculateTotal(vm.quote, function(total){
                    vm.quote.total = total;
                });
            }
        });
    }
}());
