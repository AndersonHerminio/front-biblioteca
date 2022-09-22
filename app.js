const myApp = angular.module("bookApp", ["ui.router"]);
const apiBaseUrl = "http://localhost:3000";

myApp.config(function ($stateProvider) {
  $stateProvider
    .state({
      name: "home",
      url: "",
      templateUrl: "views/home.html",
      controller: "homeCtrl",
    })

    .state({
      name: "books",
      url: "/books",
      templateUrl: "views/books.html",
      controller: "booksCtrl",
    })
    .state({
      name: "books-form",
      url: "/books-form/:id",
      params: {
        id: null
      },
      templateUrl: "views/books-form.html",
      controller: "booksFormCtrl",
    })
    .state({
      name: "users",
      url: "/users",
      templateUrl: "views/users.html",
      controller: "usersCtrl",
    })
    .state({
      name: "users-form",
      url: "/users-form/:id",
      params: {
        id: null,
      },
      templateUrl: "views/users-form.html",
      controller: "usersFormCtrl",
    })
    .state({
      name: "students",
      url: "/students",
      templateUrl: "views/students.html",
      controller: "studentsCtrl",
    })
    .state({
      name: "students-form",
      url: "/students-form/:id",
      params: {
        id: null,
      },
      templateUrl: "views/students-form.html",
      controller: "studentsFormCtrl",
    })
    .state({
      name: "authors",
      url: "/authors",
      templateUrl: "views/authors.html",
      controller: "authorsCtrl",
    })
    .state({
      name: "authors-form",
      url: "/authors-form/:id",
      params: {
        id: null,
      },
      templateUrl: "views/authors-form.html",
      controller: "authorsFormCtrl",
    })
    .state({
      name: "publishers",
      url: "/publishers",
      templateUrl: "views/publishers.html",
      controller: "publishersCtrl",
    })
    .state({
      name: "publishers-form",
      url: "/publishers-form/:id",
      params: {
        id: null,
      },
      templateUrl: "views/publishers-form.html",
      controller: "publishersFormCtrl",
    })
    .state({
      name: "assigns",
      url: "/assigns",
      templateUrl: "views/assigns.html",
      controller: "assignsCtrl",
    })
    .state({
      name: "assigns-form",
      url: "/assigns-form/:id",
      params: {
        id: null,
      },
      templateUrl: "views/assigns-form.html",
      controller: "assignsFormCtrl",
    })
});

// myApp.run(function ($http) {
  
//   $http.defaults.headers.common["Content-Type"] = "application/json";
//   delete $http.defaults.headers.common.Accept;
//   console.log($http.defaults.headers);
// });
