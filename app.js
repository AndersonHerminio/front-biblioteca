const myApp = angular.module("bookApp", ['ui.router']);

myApp.config(function($stateProvider) {
    $stateProvider
        .state({
            name: 'home',
            url: '',
            templateUrl: 'views/home.html',
            controller: 'homeCtrl'
        })

        .state({
            name: 'books',
            url: '/books',
            templateUrl: 'views/books.html',
            controller: 'booksCtrl'
        })
        .state({
            name: 'books-add',
            url: '/books-add',
            templateUrl: 'views/books-add.html',
            controller: 'booksAddCtrl'
        })
        .state({
            name: 'books-edit',
            url: '/books-edit',
            templateUrl: 'views/books-edit.html',
            controller: 'booksEditCtrl'
        })

        .state({
            name: 'users',
            url: '/users',
            templateUrl: 'views/users.html',
            controller: 'usersCtrl'
        })
        .state({
            name: 'users-add',
            url: '/users-add',
            templateUrl: 'views/users-add.html',
            controller: 'usersAddCtrl'
        })
        .state({
            name: 'users-edit',
            url: '/users-edit',
            templateUrl: 'views/users-edit.html',
            controller: 'usersEditCtrl'
        })

        .state({
            name: 'students',
            url: '/students',
            templateUrl: 'views/students.html',
            controller: 'studentsCtrl'
        })
        .state({
            name: 'students-add',
            url: '/students-add',
            templateUrl: 'views/students-add.html',
            controller: 'studentsAddCtrl'
        })
        .state({
            name: 'students-edit',
            url: '/students-edit',
            templateUrl: 'views/students-edit.html',
            controller: 'studentsEditCtrl'
        })

        .state({
            name: 'authors',
            url: '/authors',
            templateUrl: 'views/authors.html',
            controller: 'authorsCtrl'
        })
        .state({
            name: 'authors-add',
            url: '/authors-add',
            templateUrl: 'views/authors-add.html',
            controller: 'authorsAddCtrl'
        })
        .state({
            name: 'authors-edit',
            url: '/authors-edit',
            templateUrl: 'views/authors-edit.html',
            controller: 'authorsEditCtrl'
        })

        .state({
            name: 'publishers',
            url: '/publishers',
            templateUrl: 'views/publishers.html',
            controller: 'publishersCtrl'
        })
        .state({
            name: 'publishers-add',
            url: '/publishers-add',
            templateUrl: 'views/publishers-add.html',
            controller: 'publishersAddCtrl'
        })
        .state({
            name: 'publishers-edit',
            url: '/publishers-edit',
            templateUrl: 'views/publishers-edit.html',
            controller: 'publishersEditCtrl'
        })
});
