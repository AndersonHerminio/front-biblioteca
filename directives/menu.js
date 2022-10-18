myApp.directive('directiveMenu', function() {
    return {
        restrict: 'E',
        templateUrl: '../views/menu.html',
        controller: function($scope, $rootScope, $state) {
            const logout = () => {
                localStorage.clear();
                $rootScope.isLogged = false;
                $state.go("login")
            };
 
            $scope.logout = logout;
        }
    };
});