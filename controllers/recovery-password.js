myApp.controller("recoveryPasswordCtrl", ['$scope', 'RecoveryPasswordService', '$state', '$rootScope', 'AlertMessage', function($scope, RecoveryPasswordService, $state, $rootScope, AlertMessage) {
    $scope.form = {
        email: '',
    };

    const init = () => {
        if($rootScope.isLogged) {
            $state.go('home');
        }
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

        return true;
    };

    const submit = () => {
        if (!isValid()) {
            return;
        }

        RecoveryPasswordService.recovery($scope.form).then(() => {
            AlertMessage.success("Solicitação enviada com sucesso!")
            $state.reload();
            $state.go("home");
        }).catch(() => {
            AlertMessage.error("Erro ao enviar sua solicitação!")
        });
        
    };

    init();
    $scope.submit = submit;
}]);