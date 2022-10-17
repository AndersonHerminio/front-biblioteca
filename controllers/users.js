myApp.controller("usersCtrl", ["$scope", "UserService", '$state', 'AlertMessage', function ($scope, UserService, $state, AlertMessage) {
  $scope.users = [];

  const init = () => {
    $scope.loading = true;

    listUsers();
  };

  const listUsers = () => {
    UserService.list().then((response) => {
      $scope.users = response.data;
    }).finally(() => {
      $scope.loading = false;
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
    $scope.loading = true;

    UserService.destroy(id).then(() => {
      $state.reload();
      localStorage.clear();
      $state.go("login")
    }).catch(() => {
      AlertMessage.error("Erro ao remover usuário!")
    }).finally(() => {
      $scope.loading = false;
    });
  };

  init();
  $scope.deleteUser = deleteUser;
},
]);
