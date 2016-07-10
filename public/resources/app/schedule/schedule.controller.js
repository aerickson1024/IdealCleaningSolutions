(function(){
    angular
        .module('app.schedule')
        .controller('schedule', Schedule);

    Schedule.$inject = [];

    function Schedule(){
        var vm = this;
    }
}());
