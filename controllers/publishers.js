myApp.controller("publishersCtrl", ['$scope', 'PublisherService', '$state', 'AlertMessage',function($scope, PublisherService, $state, AlertMessage) {

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
          AlertMessage.success('A editora foi removida!')
        }
  
        if (!result.isConfirmed) {
          return;
        }
  
        PublisherService.destroy(id).then(() => {
          $state.reload();
        }).catch(() => {
          AlertMessage.error('Erro ao remover editora!')
        })
      };

    init();
    $scope.deletePublisher = deletePublisher;
}]);