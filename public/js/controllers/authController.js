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
            $window.sessionStorage.setItem('userInfo', JSON.stringify({
                          username: user.username
                        }));
            console.log('LOGIN', $window.sessionStorage);
            console.log('IS LOGGED IN', AuthService.isLoggedIn());
            $location.path(response.data.path);
          });
        };

        $scope.register = function(user) {
          AuthService.register(user.username, user.password)
          .then(function(response) {
            $location.path(response.data.path);
          });
        };

        $rootScope.isLoggedIn = AuthService.isLoggedIn();

        $rootScope.logout = function () {
          AuthService.logout()
          .then(function (response) {
            $window.sessionStorage.removeItem('userInfo');
            console.log("IS LOGGED IN", AuthService.isLoggedIn());
            console.log('LOGOUT', $window.sessionStorage);
            $location.path('/login');
          })
          .catch(function (err) {
            console.log(err);
          });
        };
      }
    ]);
})();