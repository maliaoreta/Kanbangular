(function() {
  angular.module('kanbangular')
    .controller('RegisterController',[
      '$scope',
      '$location',
      'RegisterService',
      function($scope, $location, RegisterService) {
        $scope.register = function(user) {
          RegisterService.register(user.username, user.password)
          .then(function(response) {
            $location.path(response.data.path);
          });
        };
      }]);
})();