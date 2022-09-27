myApp.controller("loginCtrl", ["$scope", "$state", "LoginService",
  function ($scope, $state, LoginService) {
    $scope.form = {
      email: "",
      password: "",
    };

    const isValid = () => {
      if (!$scope.form.email) {
        Swal.fire({
          icon: 'error',
          title: 'Informe um email!',
        })
        return false;
      }

      if ($scope.form.email.length < 3) {
        Swal.fire({
          icon: 'error',
          title: 'O campo email deve conter no mínimo 3 caracteres!',
        })
        return false;
      }

      if (!$scope.form.password) {
        Swal.fire({
          icon: 'error',
          title: 'Informe uma senha!',
        })
        return false;
      }

      return true;
    };

    const submit = () => {
      if (!isValid()) {
        return;
      }
      LoginService.login($scope.form)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          $state.go("home");
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Dados Inválidos!',
          })
        });
    };
	$scope.submit = submit;
  },
]);
