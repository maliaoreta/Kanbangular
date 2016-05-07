(function() {
  angular.module('kanbangular')
    .controller('AuthController',[
      '$scope',
      '$rootScope',
      '$location',
      'AuthService',
      '$window',
      function($scope, $rootScope, $location, AuthService, $window) {
        $scope.login = function(user) {
          AuthService.login(user.username, user.password)
          .then(function(response) {
            $rootScope.isLoggedIn = true;
            $location.path(response.data.path);
          });
        };

        $scope.register = function(user) {
          AuthService.register(user.username, user.password)
          .then(function(response) {
            $location.path(response.data.path);
          });
        };
      }
    ]);
})();