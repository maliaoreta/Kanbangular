(function () {

  angular.module('kanbangular')
    .controller('TasksController', [
      '$scope',
      'TasksService',
      function ($scope, TasksService) {

        $scope.taskList = [];

        TasksService.getTasks().then(function(response) {
          $scope.taskList = response.data.taskList;
          //console.log($scope.taskList);
        });

        $scope.postTask = function(newTask) {
          TasksService.postTask(newTask.title, newTask.description, newTask.status)
          .then(function(response) {
            $scope.taskList.push(response.data.newTask);
            newTask.title = '';
            newTask.description = '';
            newTask.status = '';
          });
        };

        $scope.deleteTask = function (task) {
          TasksService.deleteTask(task.id)
          .then(function (response) {
            $scope.taskList.splice($scope.taskList.indexOf(task), 1);
          });
        };

        $scope.moveNext = function (task) {
          TasksService.moveNext(task.id, task.status)
          .then(function (response) {
            task.status = response.data.updatedStatus;
          });
        };
      }]);
})();