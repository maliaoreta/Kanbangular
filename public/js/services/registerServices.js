(function() {
  function RegisterService($http) {
    this.register = function(username, password) {
      return $http.post('/register', {
        username: username,
        password: password
      });
    };
  }

  angular.module('kanbangular')
    .service('RegisterService', ['$http', RegisterService]);
})();