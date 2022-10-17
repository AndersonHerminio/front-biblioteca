myApp.controller("homeCtrl", ['$scope', 'HomeService', '$q', function ($scope, HomeService, $q) {
    $scope.books = [];
    $scope.students = [];

    const init = () => {
        $scope.loading = true;

        $q.all([listTop3(), listReturnedBooks()]).finally(() => {
            $scope.loading = false;
        });
    };

    const listTop3 = () => {
        return HomeService.top3Books().then(response => {
            $scope.topBooks = response.data.books;
            $scope.topStudents = response.data.students;
        });
    };

    const listReturnedBooks = () => {
        return HomeService.booksReturn().then(response => {
            $scope.todayReturnBooks = response.data.returnToday;
            $scope.delayedReturnBooks = response.data.returnDelayed;
        });
    };

    init();
}]);