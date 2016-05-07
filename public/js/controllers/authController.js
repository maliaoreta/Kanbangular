(function() {
  angular.module('kanbangular')
    .controller('AuthController',[
      '$scope',
      '$location',
      'AuthService',
      '$window',
      function($scope, $location, AuthService, $window) {
        $scope.login = function(user) {
          AuthService.login(user.username, user.password)
          .then(function(response) {
            $window.sessionStorage.setItem('userInfo', JSON.stringify({
                          username: user.username
                        }))
            $scope.isLoggedIn = false;
            $location.path(response.data.path);
          });
        };

        $scope.register = function(user) {
          AuthService.register(user.username, user.password)
          .then(function(response) {
            $location.path(response.data.path);
          });
        };

        $scope.isLoggedIn = AuthService.isLoggedIn();

        $scope.logout = function () {
          AuthService.logout()
          .then(function (response) {
            $window.sessionStorage.removeItem('userInfo');
            $scope.isLoggedIn = false;
            $location.path(response.data.path);
          });
        };
      }
    ]);
})();