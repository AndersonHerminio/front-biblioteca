myApp.controller("assignsConcludedCtrl", ['$scope', 'AssignService', function ($scope, AssignService) {
  const init = () => {
    $scope.loading = true;
    AssignService.find().then(response => {
      $scope.assigns = response.data;
    }).catch(error => console.log(error)).finally(() => {
      $scope.loading = false;
    })
  };

  init();
}]);