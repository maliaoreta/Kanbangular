(function () {

  angular.module('kanbangular')
    .controller('TasksController', [
      '$scope',
      'TasksService',
      function ($scope, TasksService) {
        TasksService.getTodo().then(function(response) {
          $scope.todos = response.data;
        });
        TasksService.getInProgress().then(function (response) {
          $scope.inProgress = response.data;
        });
        TasksService.getDone().then(function (response) {
          $scope.done = response.data;
        });
      }]);
})();