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
            $window.sessionStorage.setItem('userInfo', {username: user.username});
            $rootScope.isLoggedIn = true;
            $location.path(response.data.path);
          })
          .catch(function(response) {
            $scope.loginError = response.data.errorMsg;
            $location.path(response.data.path);
          });
        };

        $scope.register = function(user) {
          AuthService.register(user.username, user.password)
          .then(function(response) {
            $window.sessionStorage.setItem('userInfo', {username: user.username});
            $rootScope.isLoggedIn = true;
            $scope.welcomeMsg = response.data.welcomeMsg;
            $location.path(response.data.path);
          })
          .catch(function(response) {
            if(response.data.loginErrorMsg) {
              $scope.loginErrorMsg = response.data.loginErrorMsg;
            } else if(response.data.userExistsErrorMsg) {
              $scope.userExistsError = response.data.userExistsErrorMsg;
            }else if(response.data.errorMsg) {
              $scope.usernameError = response.data.errorMsg.username;
              $scope.passwordError = response.data.errorMsg.password;
            }
            $location.path(response.data.path);
          });
        };
      }
    ]);
})();