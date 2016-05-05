(function () {

  angular.module('kanbangular', ['ngRoute']);

  var kanbangular = angular.module('kanbangular');
    kanbangular.config(['$routeProvider', function ($routeProvider) {

      $routeProvider
        .when('/', {
          templateUrl: 'views/index.html',
          controller: 'TasksController'
        })
    }])
    .run([function () {

    }]);
})();