(function () {

  angular.module('kanbangular')
    .controller('TasksController', [
      '$scope',
      'TasksService',
      function ($scope, TasksService) {
        TasksService.getTodo().then(function(response) {
          console.log(response);
          $scope.test = response.data;
        });
      }]);
})();