myApp.controller("usersEditCtrl", ['$scope', 'UserService', '$state', '$stateParams', function($scope, UserService, $state, $stateParams) {
    $scope.form = {
        name: '',
        email: '',
    };

    const init = () => {

        UserService.find($stateParams.id).then(response => {
            $scope.form = response.data;
        });
    };

    const isValid = () => {
        if (!$scope.form.name) {
            alert('Informe o nome');
            return false;
        }

        if ($scope.form.name.length < 3) {
            alert('O campo nome deve conter no mínimo 3 caracteres.');
            return false;
        }

        if (!$scope.form.email) {
            alert('Informe o email');
            return false;
        }

        if ($scope.form.email.length < 3) {
            alert('O campo email deve conter no mínimo 3 caracteres.');
            return false;
        }

        return true;
    };

    const submit = () => {
        if (!isValid()) {
            return;
        }
            UserService.edit($scope.form).then(() => {
                alert('Usuário editado com sucesso!');
                $state.reload();
            }).catch(() => {
                alert('Erro ao editar');
            });
    };

    init();
    $scope.submit = submit;
}]);