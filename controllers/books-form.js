myApp.controller("booksFormCtrl", ['$scope', 'BookService', '$state', '$stateParams', 'AuthorService', 'PublisherService', 'AlertMessage', function ($scope, BookService, $state, $stateParams, AuthorService, PublisherService, AlertMessage) {
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
        
        $scope.loading = true;
        BookService.find($stateParams.id).then(response => {
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

        if (!$scope.form.publication_date) {
            AlertMessage.error('Informe uma data de nascimento!')
            return false;
        }

        if (!moment($scope.form.publication_date).isValid()) {
            AlertMessage.error('o campo data precisar ser preenchido!')
            return false;
        }

        if (!$scope.form.authors_id) {
            AlertMessage.error('Informe um autor!')
            return false;
        }

        if (!$scope.form.publishers_id) {
            AlertMessage.error('Informe uma editora!')
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

        $scope.loading = true;
        if ($scope.isEdit) {
            BookService.edit(data).then(() => {
                AlertMessage.success('Livro editado com sucesso')
                $state.reload();
            }).catch(() => {
                AlertMessage.error('Erro ao editar!')
            }).finally(() => {
                $scope.loading = false;
            });
        } else {
            BookService.add(data).then(() => {
                AlertMessage.success('Livro cadastrado com sucesso')
                $state.reload();
            }).catch((e) => {
                console.log(e);
                AlertMessage.error('Erro ao cadastrar!')
            }).finally(() => {
                $scope.loading = false;
            });
        }
    };

    init();
    $scope.submit = submit;
}]);