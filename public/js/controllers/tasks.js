(function () {

  angular.module('kanbangular')
    .controller('TasksController', [
      '$scope',
      'TasksService',
      function ($scope, TasksService) {

        TasksService.getTodo().then(function(response) {
          $scope.todoList = response.data.todoList;
        });
        TasksService.getInProgress().then(function (response) {
          $scope.inProgressList = response.data.inProgressList;
        });
        TasksService.getDone().then(function (response) {
          $scope.doneList = response.data.doneList;
        });

        $scope.postTask = function(newTask) {
          TasksService.postTask(newTask.title, newTask.description)
          .then(function(response) {
            $scope.todoList.push(response.data.newTask);
          });
        };
      }]);
})();