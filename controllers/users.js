myApp.controller("usersCtrl", ["$scope", "UserService", '$state', 'AlertMessage', function ($scope, UserService, $state, AlertMessage) {
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
        AlertMessage.success("Usuário removido com sucesso!")
      }

      if (!result.isConfirmed) {
        return;
      }

      UserService.destroy(id).then(() => {
        $state.reload();
        localStorage.clear();
        $state.go("login")
      }).catch(() => {
        AlertMessage.error("Erro ao remover usuário!")
      })
    };

    init();
    $scope.deleteUser = deleteUser;
  },
]);
