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
            alert('Informe o nome');
            return false;
        }

        if ($scope.form.name.length < 3) {
            alert('O campo nome deve conter no mínimo 3 caracteres.');
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
                alert('Editora editada com sucesso!');
                $state.reload();
            }).catch(() => {
                alert('Erro ao editar');
            });
        } else {
            PublisherService.add($scope.form).then(() => {
                alert('Editora cadastrada com sucesso!');
                $state.reload();
            }).catch(() => {
                alert('Erro ao cadastrar');
            });
        }
    };

    init();
    $scope.submit = submit;
}]);