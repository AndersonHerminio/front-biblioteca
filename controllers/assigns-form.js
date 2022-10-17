myApp.controller("assignsFormCtrl", ['$scope', 'AssignService', '$state', '$stateParams', 'BookService', 'StudentService', 'AlertMessage', function ($scope, AssignService, $state, $stateParams, BookService, StudentService, AlertMessage) {
    $scope.isEdit = !!$stateParams.id;
    $scope.form = {
        book_id: '',
        student_id: ''
    };

    $scope.books = [];
    $scope.students = [];

    const init = () => {
        BookService.list().then(response => {
            $scope.books = response.data.map(book => {
                return {
                    ...book,
                    selected: false
                };
            });
        });

        StudentService.list().then(response => {
            $scope.students = response.data;
        });

        if (!$scope.isEdit) {
            return;
        }
        $scope.loading = true;

        AssignService.find($stateParams.id).then(response => {
            $scope.form = response.data;
        }).finally(() => {
            $scope.loading = false;
        })
    };

    const isValid = () => {
        const hasSelectedBooks = $scope.books.some(book => book.selected);

        if (!hasSelectedBooks) {
            AlertMessage.error('Selecione um livro!')
            return false;
        }

        if (!$scope.form.student_id) {
            AlertMessage.error('Selecione um aluno!')
            return false;
        }

        return true;
    };

    const submit = () => {
        if (!isValid()) {
            return;
        }
        $scope.loading = true;
        const action = $scope.isEdit ? 'edit' : 'add';
        const selectedBookIds = $scope.books.filter(book => book.selected).map(book => book.id);
        const bookForm = {
            student_id: ~~$scope.form.student_id,
            book_id: selectedBookIds
        };
        AssignService[action](bookForm).then(() => {
            AlertMessage.success(`Solicitação ${$scope.isEdit ? 'editada' : 'efetuada'} com sucesso`)
            $state.reload();
        }).catch(() => {
            AlertMessage.error('Este livro não está disponível no momento!')
        }).finally(() => {
            $scope.loading = false;
        });
    };

    const addBook = () => {
        $scope.books.forEach(book => {
            if (book.id === ~~$scope.form.book_id) {
                book.selected = true;
            }
        });

        $scope.form.book_id = '';
    };

    const removeBook = book => {
        book.selected = false;
    };

    init();
    $scope.submit = submit;
    $scope.addBook = addBook;
    $scope.removeBook = removeBook;
}]);