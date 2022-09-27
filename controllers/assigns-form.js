myApp.controller("assignsFormCtrl", ['$scope', 'AssignService', '$state', '$stateParams', 'BookService', 'StudentService', function($scope, AssignService, $state, $stateParams, BookService, StudentService) {
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

        AssignService.find($stateParams.id).then(response => {
            $scope.form = response.data;
        });
    };

    const isValid = () => {
        const hasSelectedBooks = $scope.books.some(book => book.selected);
    
        if (!hasSelectedBooks) {
            Swal.fire({
                icon: 'error',
                title: 'Selecione um livro!',
              })
            return false;
        }

        if (!$scope.form.student_id) {
            Swal.fire({
                icon: 'error',
                title: 'Selecione um aluno!',
              })
            return false;
        }

        return true;
    };

    const submit = () => {
        if (!isValid()) {
            return;
        }

        const action = $scope.isEdit ? 'edit' : 'add';
        const selectedBookIds = $scope.books.filter(book => book.selected).map(book => book.id);
        const bookForm = {
            student_id: ~~$scope.form.student_id,
            book_id: selectedBookIds
        };
        AssignService[action](bookForm).then(() => {
            Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: `Solicitação ${$scope.isEdit ? 'editada' : 'efetuada'} com sucesso`,
                    showConfirmButton: false,
                    timer: 2000
                  })
            $state.reload();
        }).catch((e) => {
            console.log(e);
            Swal.fire({
                icon: 'error',
                title: `Erro ao ${$scope.isEdit ? 'editar' : 'solicitar'}!`,
              })
            
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