(function() {
  function TasksService($http) {
    this.getTodo = function() {
      return $http.get('/api/tasks/todo');
    };

    this.getInProgress = function() {
      return $http.get('/api/tasks/inProgress');
    };

    this.getDone = function() {
      return $http.get('/api/tasks/done');
    };
  }

  angular.module('kanbangular')
    .service('TasksService', ['$http', TasksService]);
})();