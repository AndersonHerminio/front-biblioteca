myApp.controller("usersCtrl", ["$scope", "UserService", '$state', function ($scope, UserService, $state) {
    $scope.users = [];

    const init = () => {
      listUsers();
    };

    const listUsers = () => {
      UserService.list().then((response) => {
        $scope.users = response.data;
      });
    };

    const deleteUser = async (id) => {
      const result = await Swal.fire({
        title: "Deseja remover o usuário?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Deletar",
        cancelButtonText: "Cancelar!",
        reverseButtons: true,
      });
      if (result.isConfirmed) {
        Swal.fire(
          'Removido!',
          'O Usuário foi removido.',
          'success'
        )
      }

      if (!result.isConfirmed) {
        return;
      }

      UserService.destroy(id).then(() => {
        // alert('Usuário removido');
        $state.reload();
      }).catch(() => {
        alert('Erro ao remover usuário');
      })
    };

    init();
    $scope.deleteUser = deleteUser;
  },
]);
