(function() {
  function TasksService($http) {
    this.getTodo = function() {
      return $http.get('/api/tasks/todo');
    };

    this.getInProgress = function() {

    };

    this.getDone = function() {

    };
  }

  angular.module('kanbangular')
    .service('TasksService', ['$http', TasksService]);
})();