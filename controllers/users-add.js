myApp.controller("usersAddCtrl", ['$scope', 'UserService', '$state', function($scope, UserService, $state) {
    $scope.form = {
        name: '',
        email: '',
        password: ''
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

        if (!$scope.form.password) {
            alert('Informe a senha');
            return false;
        }

        return true;
    };

    const submit = () => {
        if (!isValid()) {
            return;
        }

        UserService.add($scope.form).then(() => {
            alert('Usuário cadastrado com sucesso!');
            $state.reload();
        }).catch((error) => {
            alert('Erro ao cadastrar');
        })
    };

    $scope.submit = submit;
}]);