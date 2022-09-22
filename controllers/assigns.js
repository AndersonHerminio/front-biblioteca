myApp.controller("assignsCtrl", ["$scope", "AssignService", '$state', function ($scope, AssignService, $state) {
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
        Swal.fire(
          'Removido!',
          'A solicitação foi removida.',
          'success'
        )
      }

      if (!result.isConfirmed) {
        return;
      }

      AssignService.destroy(id).then(() => {
        // alert('Solicitação removida');
        $state.reload();
      }).catch(() => {
        alert('Erro ao remover solicitação');
      })
    };

    init();
    $scope.deleteAssign = deleteAssign;
  },
]);
