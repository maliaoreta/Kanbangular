(function () {

  angular.module('kanbangular', ['ngRoute']);

  var kanbangular = angular.module('kanbangular');

    kanbangular.factory('ErrorHttpInterceptor', ['$q', '$location', function($q, $location) {
      return  {
        'response': function(response) {
          return response;
        },
        'responseError': function(response) {
            if(response.status === 400) {
              $location.path('/404');
            }
            if(response.status === 401) {
              $location.path('/login');
            }
            return $q.reject(response);
          }
        };
    }]);

    kanbangular.config([
      '$routeProvider',
      '$locationProvider',
      '$httpProvider',
      function ($routeProvider, $locationProvider, $httpProvider) {

      $httpProvider.interceptors.push('ErrorHttpInterceptor');

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
        })
        .otherwise({
          templateUrl: 'views/404.html'
        });

    }])
    .run(['$rootScope', '$http', '$location', '$window', function ($rootScope, $http, $location, $window) {

      if($window.sessionStorage.getItem('userInfo')) {
        $rootScope.isLoggedIn = true;
      } else {
        $rootScope.isLoggedIn = false;
      }

      $rootScope.logout = function () {
        $http.get('/logout')
        .then(function (response) {
          $window.sessionStorage.removeItem('userInfo');
          $rootScope.isLoggedIn = false;
          $location.path('/login');
        });
      };
    }]);
})();