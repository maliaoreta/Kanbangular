(function() {
  function TasksService($http) {

    this.getTodo = function() {
      return $http.get('/api/tasks/todo');
    };

    this.postTask = function(title, description) {
      return $http.post('/api/tasks/', {
        title: title,
        description: description
      });
    };

    this.getInProgress = function() {
      return $http.get('/api/tasks/inProgress');
    };

    this.getDone = function() {
      return $http.get('/api/tasks/done');
    };

    this.deleteTask = function (id) {
      return $http.delete('/api/tasks/' + id);
    }

    this.moveNext = function (id, currStatus) {
      return $http.put('/api/tasks/' + id, {currStatus: currStatus});
    }
  }

  angular.module('kanbangular')
    .service('TasksService', ['$http', TasksService]);
})();