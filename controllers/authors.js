myApp.controller("authorsCtrl", ['$scope', 'AuthorService', '$state', function($scope, AuthorService, $state) {

    $scope.authors = [];

    const init = () => {
        listAuthors();
    };

    const listAuthors = () => {
        AuthorService.list().then(response => {
            $scope.authors = response.data;
        });
    };

    const deleteAuthor = async (id) => {
        const result = await Swal.fire({
          title: "Deseja remover o autor?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Deletar",
          cancelButtonText: "Cancelar!",
          reverseButtons: true,
        });
        if (result.isConfirmed) {
          Swal.fire(
            'Removido!',
            'O Autor foi removido.',
            'success'
          )
        }
          
        if (!result.isConfirmed) {
          return;
        }
  
        AuthorService.destroy(id).then(() => {
          // alert('Autor removido');
          $state.reload();
        }).catch(() => {
          alert('Erro ao remover Autor');
        })
      };
  
      init();
      $scope.deleteAuthor = deleteAuthor;
    },
  ]);