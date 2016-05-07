(function () {

  angular.module('kanbangular', ['ngRoute']);

  var kanbangular = angular.module('kanbangular');
    kanbangular.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });

      $routeProvider
        .when('/', {
          templateUrl: 'views/index.html',
          controller: 'TasksController',
        })
        .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'AuthController'
        })
        .when('/register', {
          templateUrl: 'views/register.html',
          controller: 'AuthController'
        });
    }])
    .run(['$rootScope', '$http', '$location', function ($rootScope, $http, $location) {
      $rootScope.isLoggedIn = false;

      $rootScope.logout = function () {
        $http.get('/logout')
        .then(function (response) {
          $rootScope.isLoggedIn = false;
          $location.path('/login');
        });
      }
    }]);
})();