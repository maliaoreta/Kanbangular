(function() {
  function AuthService($http, $window) {
    this.register = function(username, password) {
      return $http.post('/register', {
        username: username,
        password: password
      });
    };

    this.login = function(username, password) {
      return $http.post('/login', {
        username: username,
        password: password
      });
    };

    this.isLoggedIn = function () {
      console.log('userInfo: ', $window.sessionStorage.userInfo);
      return ($window.sessionStorage.userInfo) ? true : false;
    };

    this.logout = function () {
      console.log('service');
      return $http.get('/logout');
    };
  }

  angular.module('kanbangular')
    .service('AuthService', ['$http', '$window', AuthService]);
})();