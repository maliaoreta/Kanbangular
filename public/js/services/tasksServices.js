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

    this.move = function (id, currStatus, direction) {
      return $http.put('/api/tasks/' + id, {currStatus: currStatus, direction: direction});
    };
  }

  angular.module('kanbangular')
    .service('TasksService', ['$http', TasksService]);
})();