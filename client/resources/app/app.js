(function(){
    angular
        .module('app', [
            'ngRoute',
            'app.home',
            'app.schedule',
            'app.hours'
        ])
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
                .when('/hours', {
                    templateUrl: 'resources/app/hours/hours.html',
                    controller: 'hours',
                    controllerAs: 'vm'
                })
                .otherwise({ redirectTo: '/' });
        }]);
}());
