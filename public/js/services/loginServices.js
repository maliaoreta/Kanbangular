(function() {
  function LoginService($http) {
    this.login = function(username, password) {
      return $http.post('/login', {
        username: username,
        password: password
      });
    };
  }

  angular.module('kanbangular')
    .service('LoginService', ['$http', LoginService]);
})();