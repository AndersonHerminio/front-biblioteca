myApp.controller("studentsFormCtrl", ['$scope', 'StudentService', '$state', '$stateParams', 'AlertMessage', function($scope, StudentService, $state, $stateParams, AlertMessage) {
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
            AlertMessage.error("Informe um nome!")
            return false;
        }

        if ($scope.form.name.length < 3) {
            AlertMessage.error("O campo nome deve conter no mínimo 3 caracteres!")
            return false;
        }

        if (!$scope.form.email) {
            AlertMessage.error("Informe um email!")
            return false;
        }

        if ($scope.form.email.length < 3) {
            AlertMessage.error("O campo email deve conter no mínimo 3 caracteres!")
            return false;
        }
        if (!$scope.form.birth_date) {
            AlertMessage.error("Informe uma data de nascimento!")
            return false;
        }

        if (!moment($scope.form.birth_date).isValid()) {
            AlertMessage.error("O campo data precisa ser preenchido!")
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
                AlertMessage.success("Estudante editado com sucesso!")
                $state.reload();
            }).catch(() => {
                AlertMessage.error("Erro ao editar!")
            });
        } else {
            StudentService.add(data).then(() => {
                AlertMessage.success("Estudante cadastrado com sucesso!")
                $state.reload();
            }).catch(() => {
                AlertMessage.error("Erro ao editar!")
            });
        }
    };

    init();
    $scope.submit = submit;
}]);