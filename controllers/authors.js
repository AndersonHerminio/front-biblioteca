myApp.controller("authorsCtrl", ['$scope', 'AuthorService', '$state', 'AlertMessage', function ($scope, AuthorService, $state, AlertMessage) {

  $scope.authors = [];

  const init = () => {
    $scope.loading = true;
    listAuthors();
  };

  const listAuthors = () => {
    AuthorService.list().then(response => {
      $scope.authors = response.data;
    }).finally(() => {
      $scope.loading = false;
    })
  };

  const deleteAuthor = async (id) => {
    $scope.loading = true;
    const result = await Swal.fire({
      title: "Deseja remover o autor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Deletar",
      cancelButtonText: "Cancelar!",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      AlertMessage.success('O Autor foi removido.')
    }

    if (!result.isConfirmed) {
      return;
    }

    AuthorService.destroy(id).then(() => {
      $state.reload();
    }).catch(() => {
      AlertMessage.error('Erro ao remover autor!')
    }).finally(() => {
      $scope.loading = false;
    });
  };

  init();
  $scope.deleteAuthor = deleteAuthor;
},
]);