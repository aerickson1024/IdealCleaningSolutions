(function(){
    angular
        .module('app.home')
        .controller('home', Home);
    
    Home.$inject = [];
    
    function Home(){
        var vm = this;
        vm.welcome = 'Future site of Ideal Cleaning Solutions';
    }
}());