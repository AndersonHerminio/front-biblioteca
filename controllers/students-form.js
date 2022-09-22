myApp.controller("studentsFormCtrl", ['$scope', 'StudentService', '$state', '$stateParams', function($scope, StudentService, $state, $stateParams) {
    $scope.isEdit = !!$stateParams.id;
    $scope.form = {
        name: '',
        email: '',
        birth_date: '',
    };

    const init = () => {
        if (!$scope.isEdit) {
            return;
        }

        StudentService.find($stateParams.id).then(response => {
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
        if (!$scope.form.birth_date) {
            alert('Informe a data de nascimento');
            return false;
        }

        if (!moment($scope.form.birth_date).isValid()) {
            alert('O campo data precisa ser preenchido.');
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
            StudentService.edit(data).then(() => {
                alert('Estudante editado com sucesso!');
                $state.reload();
            }).catch(() => {
                alert('Erro ao editar');
            });
        } else {
            StudentService.add(data).then(() => {
                alert('Estudante cadastrado com sucesso!');
                $state.reload();
            }).catch(() => {
                alert('Erro ao cadastrar');
            });
        }
    };

    init();
    $scope.submit = submit;
}]);