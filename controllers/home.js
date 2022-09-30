myApp.controller("homeCtrl", ['$scope', 'HomeService', function ($scope, HomeService) {
    $scope.books = [];
    $scope.students = [];

    const init = () => {
        listTop3();
        listReturnedBooks();
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