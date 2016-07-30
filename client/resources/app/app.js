(function(){
    angular
        .module('app', ['app.home', 'app.schedule', 'ngRoute'])
        .config(['$routeProvider', function($routeProvider){
            $routeProvider
                .when('/', {
                    templateUrl: 'resources/app/home/home.html',
                    controller: 'home',
                    controllerAs: 'vm'
                })
                .when('/schedule', {
                    templateUrl: 'resources/app/schedule/schedule.html',
                    controller: 'schedule',
                    controllerAs: 'vm'
                })
                .otherwise({ redirectTo: '/' });
        }]);
}());
