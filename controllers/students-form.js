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
        if (!$scope.form.birth_date) {
            Swal.fire({
                icon: 'error',
                title: 'Informe a data de nascimento!',
              })
            return false;
        }

        if (!moment($scope.form.birth_date).isValid()) {
            Swal.fire({
                icon: 'error',
                title: 'O campo data precisa ser preenchido!',
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
            StudentService.edit(data).then(() => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Estudante editado com sucesso',
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
            StudentService.add(data).then(() => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Estudante cadastrado com sucesso',
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