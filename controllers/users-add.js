myApp.controller("usersAddCtrl", ['$scope', 'UserService', '$state', '$stateParams', function($scope, UserService, $state, $stateParams) {
    $scope.form = {
        name: '',
        email: '',
        password: ''
    };

    const init = () => {
        UserService.find($stateParams.id).then(response => {
            $scope.form = response.data;
        });
    };

    const isValid = () => {
        if (!$scope.form.name) {
            Swal.fire({
                icon: 'error',
                title: 'Informe um nome!',
              })
            return false;
        }

        if ($scope.form.name.length < 3) {
            Swal.fire({
                icon: 'error',
                title: 'O campo nome deve conter no mínimo 3 caracteres!',
              })
            return false;
        }

        if (!$scope.form.email) {
            Swal.fire({
                icon: 'error',
                title: 'Informe um email!',
              })
            return false;
        }

        if ($scope.form.email.length < 3) {
            Swal.fire({
                icon: 'error',
                title: 'O campo email deve conter no mínimo 3 caracteres!',
              })
            return false;
        }

        if (!$scope.form.password && !$scope.isEdit) {
            Swal.fire({
                icon: 'error',
                title: 'Insira uma senha!',
              })
            return false;
        }

        return true;
    };

    const submit = () => {
        if (!isValid()) {
            return;
        }

            UserService.add($scope.form).then(() => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Usuário editado com sucesso',
                    showConfirmButton: false,
                    timer: 2000
                  })
                $state.reload();
                $state.go("home");
            }).catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Erro ao editar!',
                  })
            });
        
    };

    init();
    $scope.submit = submit;
}]);