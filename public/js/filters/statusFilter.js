(function() {
  var kanbangular = angular.module('kanbangular');

  kanbangular.filter('statusFilter', function() {
    return function(collection, status) {
      return collection.filter(function(task) {
        return task.status === status;
      });
    };
  });
}());