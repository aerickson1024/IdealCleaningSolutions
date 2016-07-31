(function(){
    angular
        .module('app.schedule')
        .service('service', Service);

    Service.$inject = ['$rootScope'];

    function Service($rootScope){
        var self = this;
        var radioSelected = '';

        /*********************************************************************/
        //  COMMERCIAL
        /*********************************************************************/
        var numberOfDesks = '';
        var numberOfCommBathrooms = '';
        var kitchBreak = false;
        var reception = false;
        var commercialQuote = {
            services: {
                numberOfDesks: {
                    name: 'Number of Desks',
                    quantity: 0,
                    costOfService: 29.99,
                    totalPrice: 0
                },
                numberOfCommBathrooms: {
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

        self.getNumberOfDesks = function(callback) {
            callback(numberOfDesks);
        }

        self.getNumberOfCommBathrooms = function(callback) {
            callback(numberOfCommBathrooms);
        }

        self.getKitchBreak = function(callback) {
            callback(kitchBreak);
        }

        self.getReception = function(callback) {
            callback(reception);
        }

        self.setKitchBreak = function(value) {
            kitchBreak = value;
            $rootScope.$broadcast('updateScheduleController');
        }

        self.setReception = function(value) {
            reception = value;
            $rootScope.$broadcast('updateScheduleController');
        }

        self.updateNumberOfDesks = function(number) {
            numberOfDesks = number;
            commercialQuote.services['numberOfDesks'].quantity = number;
            $rootScope.$broadcast('updateTotalPrice');
        }

        self.updateNumberOfCommBathrooms = function(number) {
            numberOfCommBathrooms = number;
            commercialQuote.services['numberOfCommBathrooms'].quantity = number;
            $rootScope.$broadcast('updateTotalPrice');
        }

        self.updateKitchBreakQuantity = function(number) {
            commercialQuote.services['kitchBreak'].quantity = number;

            $rootScope.$broadcast('updateScheduleController');
            $rootScope.$broadcast('updateTotalPrice');
        }

        self.updateReceptionQuantity = function(number) {
            commercialQuote.services['reception'].quantity = number;

            $rootScope.$broadcast('updateScheduleController');
            $rootScope.$broadcast('updateTotalPrice');
        }

        /*********************************************************************/
        //  RESIDENTIAL
        /*********************************************************************/
        var numberOfBedrooms = '';
        var numberOfResBathrooms = '';
        var numberOfAdditionalRooms = '';
        var kitchDineLiving = false;
        var residentialQuote = {
            services: {
                numberOfBedrooms: {
                    name: 'Number of Bedrooms',
                    quantity: 0,
                    costOfService: 25.00,
                    totalPrice: 0
                },
                numberOfResBathrooms: {
                    name: 'Number of Bathrooms',
                    quantity: 0,
                    costOfService: 25.00,
                    totalPrice: 0
                },
                numberOfAdditionalRooms: {
                    name: 'Additional Rooms',
                    quantity: 0,
                    costOfService: 20.00,
                    totalPrice: 0
                },
                kitchDineLiving: {
                    name: 'Kitchen / Dining / Living Room',
                    quantity: 0,
                    costOfService: 60.00,
                    totalPrice: 0
                }
            },
            total: 0
        };

        self.getNumberOfBedrooms = function(callback) {
            callback(numberOfBedrooms);
        }

        self.getNumberOfResBathrooms = function(callback) {
            callback(numberOfResBathrooms);
        }

        self.getNumberOfAdditionalRooms = function(callback) {
            callback(numberOfAdditionalRooms);
        }

        self.getKitchDineLiving = function(callback) {
            callback(kitchDineLiving);
        }

        self.setKitchDineLiving = function(value) {
            kitchDineLiving = value;
            $rootScope.$broadcast('updateScheduleController');
        }

        self.updateNumberOfBedrooms = function(number) {
            numberOfBedrooms = number;
            residentialQuote.services['numberOfBedrooms'].quantity = number;
            $rootScope.$broadcast('updateTotalPrice');
        }

        self.updateNumberOfResBathrooms = function(number) {
            numberOfResBathrooms = number;
            residentialQuote.services['numberOfResBathrooms'].quantity = number;
            $rootScope.$broadcast('updateTotalPrice');
        }

        self.updateNumberOfAdditionalRooms = function(number) {
            numberOfAdditionalRooms = number;
            residentialQuote.services['numberOfAdditionalRooms'].quantity = number;
            $rootScope.$broadcast('updateTotalPrice');
        }

        self.updateKitchDineLivingQuantity = function(number) {
            residentialQuote.services['kitchDineLiving'].quantity = number;

            $rootScope.$broadcast('updateScheduleController');
            $rootScope.$broadcast('updateTotalPrice');
        }

        /*********************************************************************/
        //  COMMERCIAL AND RESIDENTIAL
        /*********************************************************************/
        self.getRadioSelected = function(callback) {
            callback(radioSelected);
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
            $rootScope.$broadcast('updateScheduleController');
        }

        self.calculateTotal = function(callback){
            if (radioSelected == 'Commercial') {
                commercialQuote.services.numberOfDesks.totalPrice =
                    commercialQuote.services.numberOfDesks.quantity *
                    commercialQuote.services.numberOfDesks.costOfService;
                commercialQuote.services.numberOfCommBathrooms.totalPrice =
                    commercialQuote.services.numberOfCommBathrooms.quantity *
                    commercialQuote.services.numberOfCommBathrooms.costOfService;
                commercialQuote.services.kitchBreak.totalPrice =
                    commercialQuote.services.kitchBreak.quantity *
                    commercialQuote.services.kitchBreak.costOfService;
                commercialQuote.services.reception.totalPrice =
                    commercialQuote.services.reception.quantity *
                    commercialQuote.services.reception.costOfService;

                commercialQuote.total =
                    commercialQuote.services.numberOfDesks.totalPrice +
                    commercialQuote.services.numberOfCommBathrooms.totalPrice +
                    commercialQuote.services.kitchBreak.totalPrice +
                    commercialQuote.services.reception.totalPrice;
                callback(commercialQuote);
            } else if (radioSelected == 'Residential') {
                residentialQuote.services.numberOfBedrooms.totalPrice =
                    residentialQuote.services.numberOfBedrooms.quantity *
                    residentialQuote.services.numberOfBedrooms.costOfService;
                residentialQuote.services.numberOfResBathrooms.totalPrice =
                    residentialQuote.services.numberOfResBathrooms.quantity *
                    residentialQuote.services.numberOfResBathrooms.costOfService;
                residentialQuote.services.numberOfAdditionalRooms.totalPrice =
                    residentialQuote.services.numberOfAdditionalRooms.quantity *
                    residentialQuote.services.numberOfAdditionalRooms.costOfService;
                residentialQuote.services.kitchDineLiving.totalPrice =
                    residentialQuote.services.kitchDineLiving.quantity *
                    residentialQuote.services.kitchDineLiving.costOfService;

                residentialQuote.total =
                    residentialQuote.services.numberOfBedrooms.totalPrice +
                    residentialQuote.services.numberOfResBathrooms.totalPrice +
                    residentialQuote.services.numberOfAdditionalRooms.totalPrice +
                    residentialQuote.services.kitchDineLiving.totalPrice;
                callback(residentialQuote);
            } else {
                console.log('radioSelected must be selected before total can be calculated');
            }
        }
    }
}());
