(function(){
    angular
        .module('app.schedule')
        .service('service', Service);

    Service.$inject = [];

    function Service(){
        this.calculateTotal = function(quote, callback){
            quote.services.numberOfDesks.totalPrice =
                quote.services.numberOfDesks.quantity *
                quote.services.numberOfDesks.costOfService;
            quote.services.numberOfBathrooms.totalPrice =
                quote.services.numberOfBathrooms.quantity *
                quote.services.numberOfBathrooms.costOfService;
            quote.services.options.totalPrice =
                quote.services.options.quantity *
                quote.services.options.costOfService;

            quote.total =
                quote.services.numberOfDesks.totalPrice +
                quote.services.numberOfBathrooms.totalPrice +
                quote.services.options.totalPrice;
            callback(quote.total);
        }
    }
}());
