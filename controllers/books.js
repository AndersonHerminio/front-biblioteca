myApp.controller("booksCtrl", [
  "$scope",
  "BookService",
  "$state",
  function ($scope, BookService, $state) {
    
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
        Swal.fire(
          'Removido!',
          'O livro foi removido.',
          'success'
        )
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
          Swal.fire({
            icon: 'error',
            title: 'Erro ao remover livro!',
          })
        });
    };

    init();
    $scope.deleteBook = deleteBook;
  },
]);
