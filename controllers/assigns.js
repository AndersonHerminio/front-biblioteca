myApp.controller("assignsCtrl", ['$scope', 'AssignService', '$state', 'BookService', 'StudentService', 'AlertMessage',function($scope, AssignService, $state, BookService, StudentService, AlertMessage) {

  $scope.books = [];
  $scope.students = [];

  const init = () => {
    StudentService.list().then(response => {
        $scope.students = response.data;
    });

    AssignService.list().then(response => {
      $scope.assigns = response.data;
    }).catch(error => console.log(error));
  };

  const deleteAssign = async (book_id, student_id) => {
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
      $state.reload();
    }
      
    if (!result.isConfirmed) {
      return;
    }

    const filter = {
      book_id,
      student_id
    };

    AssignService.destroy(filter).then(() => {
      // alert('Autor removido');
      $state.reload();
    }).catch(() => {
      AlertMessage.error('Erro ao remover a solicitação!')
    })
  };

  init();
  $scope.deleteAssign = deleteAssign;
}]);