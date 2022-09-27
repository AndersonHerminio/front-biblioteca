myApp.controller("loginCtrl", ["$scope", "$state", "LoginService", '$rootScope', 'AlertMessage',
  function ($scope, $state, LoginService, $rootScope, AlertMessage) {
    $scope.form = {
      email: "",
      password: "",
    };

    const isValid = () => {
      if (!$scope.form.email) {
        AlertMessage.error("Informe um email!")
        return false;
      }

      if ($scope.form.email.length < 3) {
        AlertMessage.error("O campo email deve conter no mínimo 3 caracteres!")
        return false;
      }

      if (!$scope.form.password) {
        AlertMessage.error("Informe uma senha!")
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
          $rootScope.isLogged = true;
          $state.go("home");
        })
        .catch(() => {
          AlertMessage.error("Credenciais Inválidas!")
        });
    };
	$scope.submit = submit;
  },
]);
