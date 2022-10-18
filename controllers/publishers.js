myApp.controller("publishersCtrl", ['$scope', 'PublisherService', '$state', 'AlertMessage', function ($scope, PublisherService, $state, AlertMessage) {

  $scope.publishers = [];

  const init = () => {
    $scope.loading = true;
    listPublishers();
  };

  const listPublishers = () => {
    PublisherService.list().then(response => {
      $scope.publishers = response.data;
    }).finally(() => {
      $scope.loading = false;
    })
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
    
    $scope.loading = true;
    PublisherService.destroy(id).then(() => {
      $state.reload();
    }).catch(() => {
      AlertMessage.error('Erro ao remover editora!')
    }).finally(() => {
      $scope.loading = false;
  });
  };

  init();
  $scope.deletePublisher = deletePublisher;
}]);