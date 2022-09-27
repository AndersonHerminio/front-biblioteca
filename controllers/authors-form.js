myApp.controller("authorsFormCtrl", ['$scope', 'AuthorService', '$state', '$stateParams', function($scope, AuthorService, $state, $stateParams ) {
    $scope.isEdit = !!$stateParams.id;
    $scope.form = {
        name: '',
        birth_date: '',
        biography: '',
    };

    const init = () => {
        if (!$scope.isEdit) {
            return;
        }

        AuthorService.find($stateParams.id).then(response => {
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

        if (!$scope.form.birth_date) {
            Swal.fire({
                icon: 'error',
                title: 'Informe uma data de nascimento!',
              })
            return false;
        }

        if (!moment($scope.form.birth_date).isValid()) {
            Swal.fire({
                icon: 'error',
                title: 'O campo data deve ser preenchido!',
              })
            return false;
        }
    
        if (!$scope.form.biography) {
            Swal.fire({
                icon: 'error',
                title: 'Informe uma biografia!',
              })
            return false;
        }

        if ($scope.form.biography.length < 3) {
            Swal.fire({
                icon: 'error',
                title: 'O campo biografia deve conter no mínimo 3 caracteres!',
              })
            return false;
        }
        return true;
    };

    const getObjData = () => {
        const data = {
            ...$scope.form,
            birth_date: moment($scope.form.birth_date).format('YYYY-MM-DD')
        };

        return data;
    }

    const submit = () => {
        if (!isValid()) {
            return;
        }

        const data = getObjData();

        if ($scope.isEdit) {
            AuthorService.edit(data).then(() => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Autor editado com sucesso',
                    showConfirmButton: false,
                    timer: 2000
                  })
                $state.reload();
            }).catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao editar!',
                  })
            });
        } else {
            AuthorService.add(data).then(() => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Autor cadastrado com sucesso',
                    showConfirmButton: false,
                    timer: 2000
                  })
                $state.reload();
            }).catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao cadastrar!',
                  })
            });
        }
    };

    init();
    $scope.submit = submit;
}]);