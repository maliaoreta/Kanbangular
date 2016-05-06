(function () {

  angular.module('kanbangular')
    .controller('TasksController', [
      '$scope',
      '$window',
      '$location',
      'TasksService',
      'AuthService',
      function ($scope, $window, $location, TasksService, AuthService) {

        $scope.taskList = [];

        TasksService.getTasks().then(function(response) {
          $scope.taskList = response.data.taskList;
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

        $scope.move = function (task, direction) {
          TasksService.move(task.id, task.status, direction)
          .then(function (response) {
            task.status = response.data.updatedStatus;
          });
        };

        $scope.isLoggedIn = AuthService.isLoggedIn();

        $scope.logout = function () {
          AuthService.logout()
          .then(function (response) {
            $window.sessionStorage.removeItem('userInfo');
            $scope.isLoggedIn = false;
            $location.path(response.data.path);
          });
        };

      }]);
})();