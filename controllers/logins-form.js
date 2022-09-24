myApp.controller("loginCtrl", ["$scope", "$state", "LoginService",
  function ($scope, $state, LoginService) {
    $scope.form = {
      email: "",
      password: "",
    };

    const isValid = () => {
      if (!$scope.form.email) {
        alert("Informe o email");
        return false;
      }

      if ($scope.form.email.length < 3) {
        alert("O campo email deve conter no mínimo 3 caracteres.");
        return false;
      }

      if (!$scope.form.password) {
        alert("Informe a senha");
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
          alert("Dados inválidos");
        });
    };
	$scope.submit = submit;
  },
]);
