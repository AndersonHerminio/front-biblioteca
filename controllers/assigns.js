myApp.controller("assignsCtrl", ["$scope", "AssignService", '$state', 'AlertMessage', function ($scope, AssignService, $state, AlertMessage) {
    $scope.assigns = [];

    const init = () => {
      listAssigns();
    };

    const listAssigns = () => {
      AssignService.list().then((response) => {
        $scope.assigns = response.data;
      });
    };

    const deleteAssign = async (id) => {
      const result = await Swal.fire({
        title: "Deseja remover a solicitação?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Deletar",
        cancelButtonText: "Cancelar!",
        reverseButtons: true,
      });
      if (result.isConfirmed) {
        AlertMessage.success('A solicitação foi removida.')
      }

      if (!result.isConfirmed) {
        return;
      }

      AssignService.destroy(id).then(() => {
        // alert('Solicitação removida');
        $state.reload();
      }).catch(() => {
        AlertMessage.error('Erro ao remover solicitação!')
      })
    };

    init();
    $scope.deleteAssign = deleteAssign;
  },
]);
