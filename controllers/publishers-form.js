myApp.controller("publishersFormCtrl", ['$scope', 'PublisherService', '$state', '$stateParams', function($scope, PublisherService, $state, $stateParams ) {
    $scope.isEdit = !!$stateParams.id;
    $scope.form = {
        name: '',
    };

    const init = () => {
        if (!$scope.isEdit) {
            return;
        }
        
        PublisherService.find($stateParams.id).then(response => {
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
        return true;
    };

    const submit = () => {
        if (!isValid()) {
            return;
        }

        if ($scope.isEdit) {
            PublisherService.edit($scope.form).then(() => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Editora editada com sucesso',
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
            PublisherService.add($scope.form).then(() => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Editora cadastrada com sucesso',
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