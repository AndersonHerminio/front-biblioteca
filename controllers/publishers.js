myApp.controller("publishersCtrl", ['$scope', 'PublisherService', '$state', function($scope, PublisherService, $state) {

    $scope.publishers = [];

    const init = () => {
        listPublishers();
    };

    const listPublishers = () => {
        PublisherService.list().then(response => {
            $scope.publishers = response.data;
        });
    }

    const deletePublisher = async (id) => {
        const result = await Swal.fire({
          title: "Deseja remover a editora?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Deletar",
          cancelButtonText: "Cancelar!",
          reverseButtons: true,
        });
        if (result.isConfirmed) {
          Swal.fire(
            'Removido!',
            'A editora foi removida.',
            'success'
          )
        }
  
        if (!result.isConfirmed) {
          return;
        }
  
        PublisherService.destroy(id).then(() => {
          // alert('Editora removida');
          $state.reload();
        }).catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao remover editora!',
          })
        })
      };

    init();
    $scope.deletePublisher = deletePublisher;
}]);