myApp.controller("assignsConcludedCtrl", ['$scope', 'AssignService', '$state', 'BookService', 'StudentService', 'AlertMessage',function($scope, AssignService, $state, BookService, StudentService, AlertMessage) {

  $scope.books = [];
  $scope.students = [];

  const init = () => {
    StudentService.find().then(response => {
        $scope.students = response.data;
    });

    AssignService.find().then(response => {
      $scope.assigns = response.data;
    }).catch(error => console.log(error));
  };
  init();
}]);