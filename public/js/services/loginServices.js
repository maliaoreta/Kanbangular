(function() {
  function LoginService($http, $window) {
    this.login = function(username, password) {
      return $http.post('/login', {
        username: username,
        password: password
      });
    };

    this.isLoggedIn = function () {
      console.log('userInfo: ', $window.sessionStorage.userInfo);
      return ($window.sessionStorage.userInfo) ? true : false;
    }
  }

  angular.module('kanbangular')
    .service('LoginService', ['$http', LoginService]);
})();