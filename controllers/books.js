myApp.controller("booksCtrl", [
  "$scope",
  "BookService",
  "$state",
  'AlertMessage',
  function ($scope, BookService, $state, AlertMessage) {
    
    $scope.books = [];

    const init = () => {
      listBooks();
    };

    const listBooks = () => {
      BookService.list().then((response) => {
        $scope.books = response.data;
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

      BookService.destroy(id)
        .then(() => {
          // alert("Livro removido");
          $state.reload();
        })
        .catch(() => {
          AlertMessage.error('Erro ao remover livro!')
        });
    };

    init();
    $scope.deleteBook = deleteBook;
  },
]);
