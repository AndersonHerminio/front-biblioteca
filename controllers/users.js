myApp.controller("usersCtrl", ['$scope', 'UserService', function($scope, UserService) {
    $scope.users = [];

    const init = () => {
        listUsers();
    };

    const listUsers = () => {
        UserService.list().then(response => {
            $scope.users = response.data;
        });
    }

    init();
}]);