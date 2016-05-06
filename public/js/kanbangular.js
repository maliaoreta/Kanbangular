(function () {

  angular.module('kanbangular', ['ngRoute']);

  var kanbangular = angular.module('kanbangular');
    kanbangular.config(['$routeProvider', function ($routeProvider) {

      $routeProvider
        .when('/', {
          templateUrl: 'views/index.html',
          controller: 'TasksController'
        })
        .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'LoginController'
        })
        .when('/register', {
          templateUrl: 'views/register.html',
          controller: 'RegisterController'
        });
    }])
    .run([function () {

    }]);
})();