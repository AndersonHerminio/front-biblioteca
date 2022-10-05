myApp.controller("changePasswordCtrl", ['$scope', 'RecoveryPasswordService', '$state', '$rootScope', 'AlertMessage', '$location', function($scope, RecoveryPasswordService, $state, $rootScope, AlertMessage, $location) {
    $scope.form = {
        password: '',
        confirm_password: '',
        token: $location.search().token
    };
    $scope.isTokenValid = false;

    const init = () => {
        if($rootScope.isLogged || !$scope.form.token) {
            $state.go('home');
            return;
        }

        RecoveryPasswordService.validateToken($scope.form.token).then(() => {
            $scope.isTokenValid = true;
        }).catch(() => {
            // $state.go('login')
        });
        // CHAMAR SERVICE MANDANDO O TOKEN
    };


    const isValid = () => {
        if (!$scope.form.password) {
            AlertMessage.error("Insira a senha!")
            return false;
        }

        if (!$scope.form.confirm_password) {
            AlertMessage.error("Insira a confirmação da senha!")
            return false;
        }

        if ($scope.form.password !== $scope.form.confirm_password) {
            AlertMessage.error("As senhas não conferem!")
            return false;
        }

        return true;
    };

    const submit = () => {
        if (!isValid()) {
            return;
        }

        RecoveryPasswordService.changePassword($scope.form).then(() => {
            AlertMessage.success("E-mail enviado com sucesso!")
            $state.reload();
            $state.go("home");
        }).catch(() => {
            AlertMessage.error("Erro ao enviar e-mail!")
        });
        
    };

    init();
    $scope.submit = submit;
}]);