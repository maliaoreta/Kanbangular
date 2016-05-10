(function () {

  angular.module('kanbangular', ['ngRoute']);

  var kanbangular = angular.module('kanbangular');

    kanbangular.factory('ErrorHttpInterceptor', ['$q', '$location', function($q, $location) {
      return  {
        'response': function(response) {
          return response;
        },
        'responseError': function(response) {
            if(response.status === 500) {
              $location.path('/500');
            }
            if(response.status === 401) {
              $location.path('/login');
            }
            return $q.reject(response);
          }
        };
    }]);

    var checkLoggedin = ['$q', '$location', '$window', function($q, $location, $window){
      // Initialize a new promise
      var deferred = $q.defer();

      if($window.sessionStorage.getItem('userInfo')) {
        deferred.resolve();
      } else {
        deferred.reject();
        $location.url('/login');
      }
      return deferred.promise;
    }];

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
          resolve: {
            loggedin: checkLoggedin
          }
        })
        .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'AuthController'
        })
        .when('/register', {
          templateUrl: 'views/register.html',
          controller: 'AuthController'
        })
        .when('/500', {
          templateUrl: 'views/500.html'
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