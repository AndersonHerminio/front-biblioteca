myApp.controller("booksCtrl", [
  "$scope",
  "BookService",
  "$state",
  'AlertMessage',
  function ($scope, BookService, $state, AlertMessage) {

    $scope.books = [];

    const init = () => {
      $scope.loading = true;
      listBooks();
    };

    const listBooks = () => {
      BookService.list().then((response) => {
        $scope.books = response.data;
      }).finally(() => {
        $scope.loading = false;
      });
    };

    const deleteBook = async (id) => {
      const result = await Swal.fire({
        title: "Deseja remover o livro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Deletar",
        cancelButtonText: "Cancelar!",
        reverseButtons: true,
      });
      if (result.isConfirmed) {
        AlertMessage.success('O livro foi removido.')
      }
      
      if (!result.isConfirmed) {
        return;
      }
      
      $scope.loading = true;
      BookService.destroy(id)
        .then(() => {
          $state.reload();
        })
        .catch(() => {
          AlertMessage.error('Erro ao remover livro!')
        }).finally(() => {
          $scope.loading = false;
        });
    };

    init();
    $scope.deleteBook = deleteBook;
  },
]);
