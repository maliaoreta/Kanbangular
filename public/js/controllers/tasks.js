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

        $scope.deleteTask = function (task) {
          TasksService.deleteTask(task.id)
          .then(function (response) {

            switch (task.status) {
              case 'Todo':
                $scope.todoList.splice($scope.todoList.indexOf(task), 1);
                break;
              case 'In-Progress':
                $scope.inProgressList.splice($scope.inProgressList.indexOf(task), 1);  
                break;
              case 'Done':
                $scope.doneList.splice($scope.doneList.indexOf(task), 1);
                break;
            };
          });
        };

        $scope.moveNext = function (task) {
          TasksService.moveNext(task.id, task.status)
          .then(function (response) {
            switch (task.status) {
              case 'Todo':
                $scope.todoList.splice($scope.todoList.indexOf(task), 1);
                task.status = response.data.updatedStatus;
                $scope.inProgressList.push(task);
                break;
              case 'In-Progress':
                $scope.inProgressList.splice($scope.inProgressList.indexOf(task), 1);
                task.status = response.data.updatedStatus;
                $scope.doneList.push(response.data.updatedTask);
                break;
            };
          });
        };
      }]);
})();