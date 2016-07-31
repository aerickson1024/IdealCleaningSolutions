(function() {
    angular
        .module('app.contact')
        .controller('contact', Contact);

    Contact.$inject = [];

    function Contact() {
        var vm = this;
    }
}());
