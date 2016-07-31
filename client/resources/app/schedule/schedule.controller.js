(function(){
    angular
        .module('app.schedule')
        .controller('schedule', Schedule);

    Schedule.$inject = ['$rootScope', '$scope', 'service'];

    function Schedule($rootScope, $scope, service){
        var vm = this;

        /*********************************************************************/
        //  COMMERCIAL
        /*********************************************************************/
        service.getNumberOfDesks(function(numberOfDesks) {
            vm.numberOfDesks = numberOfDesks;
        });

        service.getNumberOfCommBathrooms(function(numberOfCommBathrooms) {
            vm.numberOfCommBathrooms = numberOfCommBathrooms;
        });

        service.getKitchBreak(function(kitchBreak) {
            vm.kitchBreak = kitchBreak;
        });

        service.getReception(function(reception) {
            vm.reception = reception;
        });

        vm.toggleKitchBreak = function(checked) {
            service.setKitchBreak(checked);

            service.getKitchBreak(function(response) {
                if (response) {
                    service.updateKitchBreakQuantity(1);
                } else {
                    service.updateKitchBreakQuantity(0);
                }
            });
        }

        vm.toggleReception = function(checked) {
            service.setReception(checked);

            service.getReception(function(response) {
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

        $scope.$watch('vm.numberOfCommBathrooms', function(newValue, oldValue){
            if (newValue !== oldValue){
                service.updateNumberOfCommBathrooms(newValue);
            }
        });

        /*********************************************************************/
        //  RESIDENTIAL
        /*********************************************************************/
        service.getNumberOfBedrooms(function(numberOfBedrooms) {
            vm.numberOfBedrooms = numberOfBedrooms;
        });

        service.getNumberOfResBathrooms(function(numberOfResBathrooms) {
            vm.numberOfResBathrooms = numberOfResBathrooms;
        });

        service.getNumberOfAdditionalRooms(function(numberOfAdditionalRooms) {
            vm.numberOfAdditionalRooms = numberOfAdditionalRooms;
        });

        service.getKitchDineLiving(function(kitchDineLiving) {
            vm.kitchDineLiving = kitchDineLiving;
        });

        vm.toggleKitchDineLiving = function(checked) {
            service.setKitchDineLiving(checked);

            service.getKitchDineLiving(function(response) {
                if (response) {
                    service.updateKitchDineLivingQuantity(1);
                } else {
                    service.updateKitchDineLivingQuantity(0);
                }
            });
        }

        $scope.$watch('vm.numberOfBedrooms', function(newValue, oldValue){
            if (newValue !== oldValue){
                service.updateNumberOfBedrooms(newValue);
            }
        });

        $scope.$watch('vm.numberOfResBathrooms', function(newValue, oldValue){
            if (newValue !== oldValue){
                service.updateNumberOfResBathrooms(newValue);
            }
        });

        $scope.$watch('vm.numberOfAdditionalRooms', function(newValue, oldValue){
            if (newValue !== oldValue){
                service.updateNumberOfAdditionalRooms(newValue);
            }
        });

        /*********************************************************************/
        //  BOTH COMMERCIAL AND RESIDENTIAL
        /*********************************************************************/
        service.getRadioSelected(function(radioSelected) {
            vm.radioSelected = radioSelected;
        });

        service.getQuote(function(quote) {
            vm.quote = quote;
        });

        vm.selectedRadioButton = function(radioSelection) {
            service.setRadioSelected(radioSelection);
        }

        $rootScope.$on('updateTotalPrice', function() {
            service.calculateTotal(function(quote) {
                vm.quote = quote;
            });
        });

        $rootScope.$on('updateScheduleController', function() {
            service.getRadioSelected(function(radioSelected) {
                if (radioSelected == 'Commercial') {
                    service.getKitchBreak(function(kitchBreak) {
                        vm.kitchBreak = kitchBreak;
                    });

                    service.getReception(function(reception) {
                        vm.reception = reception;
                    });
                } else if (radioSelected == 'Residential') {
                    service.getKitchDineLiving(function(kitchDineLiving) {
                        vm.kitchDineLiving = kitchDineLiving;
                    });
                } else {
                    console.log('vm.radioSelected does not contain a valid value.');
                }

                vm.radioSelected = radioSelected;
                service.getQuote(function(quote) {
                    vm.quote = quote;
                });
            });
        });
    }
}());
