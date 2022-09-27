myApp.controller("usersAddCtrl", ['$scope', 'UserService', '$state', '$rootScope', 'AlertMessage', function($scope, UserService, $state, $rootScope, AlertMessage) {
    $scope.form = {
        name: '',
        email: '',
        password: ''
    };

    const init = () => {
        if($rootScope.isLogged) {
            $state.go('home');
        }
    };

    const isValid = () => {
        if (!$scope.form.name) {
            AlertMessage.error("Informe um nome!")
            return false;
        }

        if ($scope.form.name.length < 3) {
            AlertMessage.error("O campo nome deve conter no mínimo 3 caracteres!")
            return false;
        }

        if (!$scope.form.email) {
            AlertMessage.error("Informe um email!")
            return false;
        }

        if ($scope.form.email.length < 3) {
            AlertMessage.error("O campo email deve conter no mínimo 3 caracteres!")
            return false;
        }

        if (!$scope.form.password && !$scope.isEdit) {
            AlertMessage.error("Insira uma senha!")
            return false;
        }

        return true;
    };

    const submit = () => {
        if (!isValid()) {
            return;
        }

        UserService.add($scope.form).then(() => {
            AlertMessage.success("Usuário cadastrado com sucesso!")
            $state.reload();
            $state.go("home");
        }).catch(() => {
            AlertMessage.error("Erro ao cadastrar!")
        });
        
    };

    init();
    $scope.submit = submit;
}]);