(function(){
    angular
        .module('app.schedule')
        .service('service', Service);

    Service.$inject = ['$rootScope'];

    function Service($rootScope){
        var self = this;
        var radioSelected = '';
        var numberOfDesks = '';
        var numberOfBathrooms = '';
        var kitchBathBox = false;
        var receptionBox = false;
        var commercialQuote = {
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
                kitchBreak: {
                    name: 'Kitchen / Breakroom',
                    quantity: 0,
                    costOfService: 19.99,
                    totalPrice: 0
                },
                reception: {
                    name: 'Reception Area',
                    quantity: 0,
                    costOfService: 19.99,
                    totalPrice: 0
                }
            },
            total: 0
        };
        var residentialQuote = {
            services: {
                numberOfBathrooms: {
                    name: 'Number of Bathrooms',
                    quantity: 0,
                    costOfService: 24.99,
                    totalPrice: 0
                }
            },
            total: 0
        };

        self.getRadioSelected = function(callback) {
            callback(radioSelected);
        }

        self.getNumberOfDesks = function(callback) {
            callback(numberOfDesks);
        }

        self.getNumberOfBathrooms = function(callback) {
            callback(numberOfBathrooms);
        }

        self.getKitchBathBox = function(callback) {
            callback(kitchBathBox);
        }

        self.getReceptionBox = function(callback) {
            callback(receptionBox);
        }

        self.getQuote = function(callback) {
            if (radioSelected == 'Commercial') {
                callback(commercialQuote);
            } else if (radioSelected == 'Residential') {
                callback(residentialQuote);
            } else {
                console.log('no radio button was selected');
            }
        }

        self.setRadioSelected = function(value) {
            radioSelected = value;

            // if (value == 'Commercial') {
            //     quote
            // } else if (value == 'Residential') {
            //
            // } else {
            //     console.log('Invalid radio value selected');
            // }

            $rootScope.$broadcast('updateScheduleController');
        }

        self.setKitchBathBox = function(value) {
            kitchBathBox = value;
            $rootScope.$broadcast('updateScheduleController');
        }

        self.setReceptionBox = function(value) {
            receptionBox = value;
            $rootScope.$broadcast('updateScheduleController');
        }

        self.updateNumberOfDesks = function(number) {
            numberOfDesks = number;

            if (radioSelected == 'Commercial') {
                commercialQuote.services['numberOfDesks'].quantity = number;
            } else {
                console.log('updateNumberOfDesks: does not apply to residential');
            }

            $rootScope.$broadcast('updateScheduleController');
            $rootScope.$broadcast('updateTotalPrice');
        }

        self.updateNumberOfBathrooms = function(number) {
            numberOfBathrooms = number;

            if (radioSelected == 'Commercial') {
                commercialQuote.services['numberOfBathrooms'].quantity = number;
            } else {
                console.log('updateNumberOfBathrooms not yet implemented for residential yet');
            }

            $rootScope.$broadcast('updateScheduleController');
            $rootScope.$broadcast('updateTotalPrice');
        }

        self.updateKitchBreakQuantity = function(number) {

            if (radioSelected == 'Commercial') {
                commercialQuote.services['kitchBreak'].quantity = number;
            } else {
                console.log('updateKitchBreakQuantity: does not apply to residential');
            }

            $rootScope.$broadcast('updateScheduleController');
            $rootScope.$broadcast('updateTotalPrice');
        }

        self.updateReceptionQuantity = function(number) {
            if (radioSelected == 'Commercial') {
                commercialQuote.services['reception'].quantity = number;
            } else {
                console.log('updateReceptionQuantity: does not apply to residential');
            }

            $rootScope.$broadcast('updateScheduleController');
            $rootScope.$broadcast('updateTotalPrice');
        }

        self.calculateTotal = function(callback){
            if (radioSelected == 'Commercial') {
                commercialQuote.services.numberOfDesks.totalPrice =
                    commercialQuote.services.numberOfDesks.quantity *
                    commercialQuote.services.numberOfDesks.costOfService;
                commercialQuote.services.numberOfBathrooms.totalPrice =
                    commercialQuote.services.numberOfBathrooms.quantity *
                    commercialQuote.services.numberOfBathrooms.costOfService;
                commercialQuote.services.kitchBreak.totalPrice =
                    commercialQuote.services.kitchBreak.quantity *
                    commercialQuote.services.kitchBreak.costOfService;
                commercialQuote.services.reception.totalPrice =
                    commercialQuote.services.reception.quantity *
                    commercialQuote.services.reception.costOfService;

                commercialQuote.total =
                    commercialQuote.services.numberOfDesks.totalPrice +
                    commercialQuote.services.numberOfBathrooms.totalPrice +
                    commercialQuote.services.kitchBreak.totalPrice +
                    commercialQuote.services.reception.totalPrice;
                callback(commercialQuote);
            } else if (radioSelected == 'Residential') {
                console.log('calculateTotal not yet implemented for residential');
            } else {
                console.log('radioSelected must be selected before total can be calculated');
            }
        }
    }
}());
