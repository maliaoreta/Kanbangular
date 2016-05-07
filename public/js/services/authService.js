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
  }

  angular.module('kanbangular')
    .service('AuthService', ['$http', '$window', AuthService]);
})();