myApp.controller("usersFormCtrl", ['$scope', 'UserService', '$state', '$stateParams', function($scope, UserService, $state, $stateParams) {
    $scope.isEdit = !!$stateParams.id;
    $scope.form = {
        name: '',
        email: '',
        password: ''
    };

    const init = () => {
        if (!$scope.isEdit) {
            return;
        }

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

        if (!$scope.form.password && !$scope.isEdit) {
            alert('Informe a senha');
            return false;
        }

        return true;
    };

    const submit = () => {
        if (!isValid()) {
            return;
        }

        if ($scope.isEdit) {
            UserService.edit($scope.form).then(() => {
                alert('Usuário editado com sucesso!');
                $state.reload();
            }).catch(() => {
                alert('Erro ao editar');
            });
        } else {
            UserService.add($scope.form).then(() => {
                alert('Usuário cadastrado com sucesso!');
                $state.reload();
            }).catch(() => {
                alert('Erro ao cadastrar');
            });
        }
    };

    init();
    $scope.submit = submit;
}]);