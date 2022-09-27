myApp.directive('directiveMenu',["$state", function($state) {
    return {
        restrict: 'E',
        templateUrl: '../views/menu.html',
        controller: function($scope) {
            const logout =  () => {
                localStorage.clear();
                $state.go("login")
            };
 
            $scope.logout = logout;
        }
    };
}
]);