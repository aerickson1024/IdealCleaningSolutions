(function(){
    angular
        .module('app', ['app.landingPage', 'ngRoute'])
        .config(['$routeProvider', function($routeProvider){
            $routeProvider
                .when('/', {
                    templateUrl: 'resources/app/landingPage/landingPage.html',
                    controller: 'landingPage',
                    controllerAs: 'vm'
                })
                .otherwise({ redirectTo: '/' });
        }]);
}());