(function() {
  angular.module('kanbangular')
    .controller('LoginController',[
      '$scope',
      '$location',
      'LoginService',
      function($scope, $location, LoginService) {
        $scope.login = function(user) {
          LoginService.login(user.username, user.password)
          .then(function(response) {
            console.log(response.data.path);
            $location.path('/');
          });
        };
      }
    ]);
})();