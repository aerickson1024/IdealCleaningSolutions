(function(){
    angular
        .module('app.landingPage')
        .controller('landingPage', LandingPage);
    
    LandingPage.$inject = [];
    
    function LandingPage(){
        var vm = this;
        vm.welcome = 'Future site of Ideal Cleaning Solutions';
    }
}());