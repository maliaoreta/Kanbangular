(function() {
  function TasksService($http) {

    this.getTasks = function() {
      return $http.get('/api/tasks/');
    };

    this.postTask = function(title, description, status) {
      return $http.post('/api/tasks/', {
        title: title,
        description: description,
        status: status
      });
    };

    this.deleteTask = function (id) {
      return $http.delete('/api/tasks/' + id);
    };

    this.edit = function(id, updatedTitle, updatedDescription, updatedStatus) {
      return $http.put('/api/tasks/' + id, {title: updatedTitle, description: updatedDescription, status: updatedStatus});
    };
  }

  angular.module('kanbangular')
    .service('TasksService', ['$http', TasksService]);
})();