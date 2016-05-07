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

    this.edit = function(id, updatedFields) {
      console.log('EDIT SERVICE', id);
      return $http.put('/api/tasks/' + id, {updatedFields: updatedFields});
    };
  }

  angular.module('kanbangular')
    .service('TasksService', ['$http', TasksService]);
})();