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
            alert('Informe o nome');
            return false;
        }

        if ($scope.form.name.length < 3) {
            alert('O campo nome deve conter no mínimo 3 caracteres.');
            return false;
        }

        if (!$scope.form.publication_date) {
            alert('Informe a data de nascimento');
            return false;
        }

        if (!moment($scope.form.publication_date).isValid()) {
            alert('O campo data precisa ser preenchido.');
            return false;
        }

        if (!$scope.form.authors_id) {
            alert('Selecione um autor.');
            return false;
        }

        if (!$scope.form.publishers_id) {
            alert('Selecione uma editora.');
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
                alert('Livro editado com sucesso!');
                $state.reload();
            }).catch(() => {
                alert('Erro ao editar');
            });
        } else {
            BookService.add(data).then(() => {
                alert('Livro cadastrado com sucesso!');
                $state.reload();
            }).catch((e) => {
                console.log(e);
                alert('Erro ao cadastrar');
            });
        }
    };

    init();
    $scope.submit = submit;
}]);