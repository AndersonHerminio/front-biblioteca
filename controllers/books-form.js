myApp.controller("booksFormCtrl", ['$scope', 'BookService', '$state', '$stateParams', 'AuthorService', 'PublisherService', function($scope, BookService, $state, $stateParams, AuthorService, PublisherService) {
    $scope.isEdit = !!$stateParams.id;
    $scope.form = {
        name: '',
        publication_date: '',
        authors_id: '',
        publishers_id: ''
    };
    
    $scope.authors = [];
    $scope.publishers = [];

    const init = () => {
        AuthorService.list().then(response => {
            $scope.authors = response.data;
        });

        PublisherService.list().then(response => {
            $scope.publishers = response.data;
        });

        if (!$scope.isEdit) {
            return;
        }

        BookService.find($stateParams.id).then(response => {
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

        if (!$scope.form.publication_date) {
            Swal.fire({
                icon: 'error',
                title: 'Informe uma data de nascimento!',
              })
            return false;
        }

        if (!moment($scope.form.publication_date).isValid()) {
            Swal.fire({
                icon: 'error',
                title: 'o campo data precisar ser preenchido!',
              })
            return false;
        }

        if (!$scope.form.authors_id) {
            Swal.fire({
                icon: 'error',
                title: 'Informe um autor!',
              })
            return false;
        }

        if (!$scope.form.publishers_id) {
            Swal.fire({
                icon: 'error',
                title: 'Informe uma editora!',
              })
            return false;
        }

        return true;
    };

    const getObjData = () => {
        const data = {
            ...$scope.form,
            publication_date: moment($scope.form.publication_date).format('YYYY-MM-DD')
        };

        return data;
    }

    const submit = () => {
        if (!isValid()) {
            return;
        }

        const data = getObjData();


        if ($scope.isEdit) {
            BookService.edit(data).then(() => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Livro editado com sucesso',
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
            BookService.add(data).then(() => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Livro cadastrado com sucesso',
                    showConfirmButton: false,
                    timer: 2000
                  })
                $state.reload();
            }).catch((e) => {
                console.log(e);
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