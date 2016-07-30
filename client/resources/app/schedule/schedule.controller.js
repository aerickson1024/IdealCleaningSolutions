(function(){
    angular
        .module('app.schedule')
        .controller('schedule', Schedule);

    Schedule.$inject = ['$rootScope', '$scope', 'service'];

    function Schedule($rootScope, $scope, service){
        var vm = this;

        // Load data from service when controller is instantiated
        service.getRadioSelected(function(radioSelected) {
            vm.radioSelected = radioSelected;
        });

        service.getNumberOfDesks(function(numberOfDesks) {
            vm.numberOfDesks = numberOfDesks;
        });

        service.getNumberOfBathrooms(function(numberOfBathrooms) {
            vm.numberOfBathrooms = numberOfBathrooms;
        });

        service.getKitchBathBox(function(kitchBathBox) {
            vm.kitchBathBox = kitchBathBox;
        });

        service.getReceptionBox(function(receptionBox) {
            vm.receptionBox = receptionBox;
        });

        service.getQuote(function(quote) {
            vm.quote = quote;
        });

        vm.selectedRadioButton = function(radioSelection){
            service.setRadioSelected(radioSelection);
        }

        vm.toggleKitchBathBox = function(checked){
            service.setKitchBathBox(checked);

            service.getKitchBathBox(function(response) {
                if (response) {
                    service.updateKitchBreakQuantity(1);
                } else {
                    service.updateKitchBreakQuantity(0);
                }
            });
        }

        vm.toggleReceptionBox = function(checked){
            service.setReceptionBox(checked);

            service.getReceptionBox(function(response) {
                if (response) {
                    service.updateReceptionQuantity(1);
                } else {
                    service.updateReceptionQuantity(0);
                }
            });
        }

        $scope.$watch('vm.numberOfDesks', function(newValue, oldValue){
            if (newValue !== oldValue){
                service.updateNumberOfDesks(newValue);
            }
        });

        $scope.$watch('vm.numberOfBathrooms', function(newValue, oldValue){
            if (newValue !== oldValue){
                service.updateNumberOfBathrooms(newValue);
            }
        });

        $rootScope.$on('updateTotalPrice', function() {
            service.calculateTotal(function(quote) {
                vm.quote = quote;
            });
        });

        $rootScope.$on('updateScheduleController', function() {
            service.getRadioSelected(function(radioSelected) {
                vm.radioSelected = radioSelected;
            });

            service.getNumberOfDesks(function(numberOfDesks) {
                vm.numberOfDesks = numberOfDesks;
            });

            service.getNumberOfBathrooms(function(numberOfBathrooms) {
                vm.numberOfBathrooms = numberOfBathrooms;
            });

            service.getKitchBathBox(function(kitchBathBox) {
                vm.kitchBathBox = kitchBathBox;
            });

            service.getReceptionBox(function(receptionBox) {
                vm.receptionBox = receptionBox;
            });

            service.getQuote(function(quote) {
                vm.quote = quote;
            });
        });
    }
}());
