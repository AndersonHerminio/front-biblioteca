myApp.controller("studentsCtrl", ['$scope', 'StudentService', '$state', 'AlertMessage', function ($scope, StudentService, $state, AlertMessage) {
  $scope.students = [];

  const init = () => {
    $scope.loading = true;

    listStudents();
  };

  const listStudents = () => {
    StudentService.list().then(response => {
      $scope.students = response.data;
    }).finally(() => {
      $scope.loading = false;
    });
  }

  const deleteStudent = async (id) => {
    const result = await Swal.fire({
      title: "Deseja remover o estudante?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Deletar",
      cancelButtonText: "Cancelar!",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      AlertMessage.success("Estudante removido com sucesso!")
    }

    if (!result.isConfirmed) {
      return;
    }

    StudentService.destroy(id).then(() => {
      $state.reload();
    }).catch(() => {
      AlertMessage.error("Erro ao remover estudante!")
    }).finally(() => {
      $scope.loading = false;
    });
  };

  init();
  $scope.deleteStudent = deleteStudent;
},
]);