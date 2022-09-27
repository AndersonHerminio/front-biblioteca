myApp.controller("studentsCtrl", ['$scope', 'StudentService', '$state', function($scope, StudentService, $state) {
    $scope.students = [];

    const init = () => {
        listStudents();
    };

    const listStudents = () => {
        StudentService.list().then(response => {
            $scope.students = response.data;
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
            Swal.fire(
              'Removido!',
              'O estudante foi removido.',
              'success'
            )
          }
  
        if (!result.isConfirmed) {
          return;
        }
  
        StudentService.destroy(id).then(() => {
        //   alert('Estudante removido');
          $state.reload();
        }).catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao remover estudante!',
          })
        })
      };
  
      init();
      $scope.deleteStudent = deleteStudent;
    },
  ]);