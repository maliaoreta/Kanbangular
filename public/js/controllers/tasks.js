(function () {

  angular.module('kanbangular')
    .controller('TasksController', [
      '$scope',
      'TasksService',
      function ($scope, TasksService) {
        $scope.test = 'ohhai';
      }]);
})();