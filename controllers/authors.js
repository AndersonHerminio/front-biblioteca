myApp.controller("authorsCtrl", ['$scope', 'AuthorService', '$state', 'AlertMessage',function($scope, AuthorService, $state, AlertMessage) {

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
          AlertMessage.success('O Autor foi removido.')
        }
          
        if (!result.isConfirmed) {
          return;
        }
  
        AuthorService.destroy(id).then(() => {
          // alert('Autor removido');
          $state.reload();
        }).catch(() => {
          AlertMessage.error('Erro ao remover autor!')
        })
      };
  
      init();
      $scope.deleteAuthor = deleteAuthor;
    },
  ]);