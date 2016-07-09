(function(){
    angular
        .module('app', ['app.home', 'ngRoute'])
        .config(['$routeProvider', function($routeProvider){
            $routeProvider
                .when('/', {
                    templateUrl: 'resources/app/home/home.html',
                    controller: 'home',
                    controllerAs: 'vm'
                })
                .otherwise({ redirectTo: '/' });
        }]);
}());