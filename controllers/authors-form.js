myApp.controller("authorsFormCtrl", ['$scope', 'AuthorService', '$state', '$stateParams', 'AlertMessage',function($scope, AuthorService, $state, $stateParams, AlertMessage) {
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
        $scope.loading = true;

        AuthorService.find($stateParams.id).then(response => {
            $scope.form = response.data;
        }).finally(() => {
            $scope.loading = false;
        })
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

        if (!$scope.form.birth_date) {
            AlertMessage.error('Informe uma data de nascimento!')
            return false;
        }

        if (!moment($scope.form.birth_date).isValid()) {
            AlertMessage.error('O campo data deve ser preenchido!')
            return false;
        }
    
        if (!$scope.form.biography) {
            AlertMessage.error('Informe uma biografia!')
            return false;
        }

        if ($scope.form.biography.length < 3) {
            AlertMessage.error('O campo biografia deve conter no mínimo 3 caracteres!')
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

        $scope.loading = true;
        if ($scope.isEdit) {
            AuthorService.edit(data).then(() => {
                AlertMessage.success('Autor editado com sucesso')
                $state.reload();
            }).catch(() => {
                AlertMessage.error('Erro ao editar!')
            }).finally(() => {
                $scope.loading = false;
            });
        } else {
            AuthorService.add(data).then(() => {
                AlertMessage.success('Autor cadastrado com sucesso')
                $state.reload();
            }).catch(() => {
                AlertMessage.error('Erro ao cadastrar!')
            }).finally(() => {
                $scope.loading = false;
            });
        }
    };

    init();
    $scope.submit = submit;
}]);