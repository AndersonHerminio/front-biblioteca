myApp.controller("publishersFormCtrl", ['$scope', 'PublisherService', '$state', '$stateParams', 'AlertMessage',function($scope, PublisherService, $state, $stateParams, AlertMessage) {
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
            AlertMessage.error('Informe um nome!')
            return false;
        }

        if ($scope.form.name.length < 3) {
            AlertMessage.error('O campo nome deve conter no mínimo 3 caracteres!')
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
                AlertMessage.success("Editora editada com sucesso!")
                $state.reload();
            }).catch(() => {
                AlertMessage.error("Erro ao editar!")
            });
        } else {
            PublisherService.add($scope.form).then(() => {
                AlertMessage.success("Editora cadastrada com sucesso!")
                $state.reload();
            }).catch(() => {
                AlertMessage.error("Erro ao cadastrar!")
            });
        }
    };

    init();
    $scope.submit = submit;
}]);