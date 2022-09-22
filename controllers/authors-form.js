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
            alert('Informe o nome');
            return false;
        }

        if ($scope.form.name.length < 3) {
            alert('O campo nome deve conter no mínimo 3 caracteres.');
            return false;
        }

        if (!$scope.form.birth_date) {
            alert('Informe a data de nascimento');
            return false;
        }

        if (!moment($scope.form.birth_date).isValid()) {
            alert('O campo data precisa ser preenchido.');
            return false;
        }
    
        if (!$scope.form.biography) {
            alert('Informe uma biografia');
            return false;
        }

        if ($scope.form.biography.length < 3) {
            alert('O campo biografia deve conter no mínimo 3 caracteres.');
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
                alert('Autor editado com sucesso!');
                $state.reload();
            }).catch(() => {
                alert('Erro ao editar');
            });
        } else {
            AuthorService.add(data).then(() => {
                alert('Autor cadastrado com sucesso!');
                $state.reload();
            }).catch(() => {
                alert('Erro ao cadastrar');
            });
        }
    };

    init();
    $scope.submit = submit;
}]);