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
          // if (response.data.path) {
          //   $location.path(response.data.path);
          // }
          // else {
            if(response.data.taskList) {

              $scope.taskList = response.data.taskList;
            }
          // }
        });

        $scope.postTask = function(newTask) {
          TasksService.postTask(newTask.title, newTask.description, newTask.status)
          .then(function(response) {
            $scope.taskList.push(response.data.newTask);
            newTask.title = '';
            newTask.description = '';
            newTask.status = '';

            $scope.togglePostForm();
          })
          .catch(function(response) {
            if (response.data.errorMsg) {
              $scope.title = response.data.errorMsg.title;
              $scope.description = response.data.errorMsg.description;
              $scope.status = response.data.errorMsg.status;
            }

            console.log("POST", response);
          });
        };

        $scope.deleteTask = function (task) {
          TasksService.deleteTask(task.id)
          .then(function (response) {
            $scope.taskList.splice($scope.taskList.indexOf(task), 1);
          });
        };

        $scope.move = function (task, direction) {

          var updatedFields = {};

          if (direction === 'right') {

            switch (task.status) {
              case 'Todo':
                updatedFields.status = 'In-Progress';
                break;
              case 'In-Progress':
                updatedFields.status = 'Done';
                break;
            }
          }
          else if (direction === 'left') {

           switch (task.status) {
              case 'Done':
                updatedFields.status = 'In-Progress';
                break;
              case 'In-Progress':
                updatedFields.status = 'Todo';
                break;
            }
          }

          TasksService.edit(task.id, task.title, task.description, updatedFields.status)
          .then(function (response) {
            task.status = updatedFields.status;
          });
        };

        $scope.edit = function(task, updatedFields, context) {
          TasksService.edit(task.id, updatedFields.title, updatedFields.description, updatedFields.status)
          .then(function (response) {
            task.title = updatedFields.title;
            task.description = updatedFields.description;

            context.toggle = !context.toggle;
          })
          .catch(function (response) {
            if (response.data.errorMsg) {
              context.title = response.data.errorMsg.title;
              context.description = response.data.errorMsg.description;
              context.status = response.data.errorMsg.status;
            }

            console.log("POST", response);
          });
        };

        $scope.getForm = function (context) {
          return context.toggle;
        }

        $scope.toggleForm = function (context, task) {
          context.updatedFields.title = task.title;
          context.updatedFields.description = task.description;
          context.updatedFields.status = task.status;
          context.toggle = !context.toggle;
        }

        $scope.getPostForm = false;

        $scope.togglePostForm = function () {
          $scope.title ='';
          $scope.description ='';
          $scope.status ='';
          $scope.getPostForm = !$scope.getPostForm;
        }
      }]);
})();