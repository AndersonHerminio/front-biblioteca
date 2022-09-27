myApp.controller("usersEditCtrl", ['$scope', 'UserService', '$state', '$stateParams', 'AlertMessage', function($scope, UserService, $state, $stateParams, AlertMessage) {
    $scope.form = {
        name: '',
        email: '',
    };

    const init = () => {
        UserService.find($stateParams.id).then(response => {
            $scope.form = response.data;
        }).catch(() => $state.go('home'));
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

        return true;
    };

    const submit = () => {
        if (!isValid()) {
            return;
        }
            UserService.edit($scope.form).then(() => {
                AlertMessage.success("Usuário editado com sucesso!")
                $state.reload();
            }).catch(() => {
                AlertMessage.error("Erro ao editar!")
            });
    };

    init();
    $scope.submit = submit;
}]);