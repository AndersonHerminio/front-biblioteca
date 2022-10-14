myApp.controller("assignsConcludedCtrl", ['$scope', 'AssignService', function ($scope, AssignService) {
  const init = () => {
    AssignService.find().then(response => {
      $scope.assigns = response.data;
    }).catch(error => console.log(error));
  };

  init();
}]);