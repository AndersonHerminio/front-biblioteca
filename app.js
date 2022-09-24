const myApp = angular.module("bookApp", ["ui.router"]);
const apiBaseUrl = "http://localhost:3000";

myApp.config(function ($stateProvider, $httpProvider) {
  $httpProvider.interceptors.push('BearerAuthInterceptor');

  $stateProvider
    .state({
      name: "home",
      url: "",
      templateUrl: "views/home.html",
      controller: "homeCtrl",
      resolve: {
        loggedIn: isAuthorized,
      },
    })
    .state({
      name: "home-2",
      url: "/",
      templateUrl: "views/home.html",
      controller: "homeCtrl",
      resolve: {
        loggedIn: isAuthorized,
      },
    })
    .state({
      name: "login",
      url: "/login",
      templateUrl: "views/login.html",
      controller: "loginCtrl",
    })
    .state({
      name: "books",
      url: "/books",
      templateUrl: "views/books.html",
      controller: "booksCtrl",
      resolve: {
        loggedIn: isAuthorized,
      },
    })
    .state({
      name: "books-form",
      url: "/books-form/:id",
      params: {
        id: null,
      },
      templateUrl: "views/books-form.html",
      controller: "booksFormCtrl",
      resolve: {
        loggedIn: isAuthorized,
      },
    })
    .state({
      name: "users",
      url: "/users",
      templateUrl: "views/users.html",
      controller: "usersCtrl",
      resolve: {
        loggedIn: isAuthorized,
      },
    })
    .state({
      name: "users-form",
      url: "/users-form/:id",
      params: {
        id: null,
      },
      templateUrl: "views/users-form.html",
      controller: "usersFormCtrl",
      resolve: {
        loggedIn: isAuthorized,
      },
    })
    .state({
      name: "students",
      url: "/students",
      templateUrl: "views/students.html",
      controller: "studentsCtrl",
      resolve: {
        loggedIn: isAuthorized,
      },
    })
    .state({
      name: "students-form",
      url: "/students-form/:id",
      params: {
        id: null,
      },
      templateUrl: "views/students-form.html",
      controller: "studentsFormCtrl",
      resolve: {
        loggedIn: isAuthorized,
      },
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
      resolve: {
        loggedIn: isAuthorized,
      },
    })
    .state({
      name: "publishers",
      url: "/publishers",
      templateUrl: "views/publishers.html",
      controller: "publishersCtrl",
      resolve: {
        loggedIn: isAuthorized,
      },
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
      resolve: {
        loggedIn: isAuthorized,
      },
    })
    .state({
      name: "assigns-form",
      url: "/assigns-form/:id",
      params: {
        id: null,
      },
      templateUrl: "views/assigns-form.html",
      controller: "assignsFormCtrl",
      resolve: {
        loggedIn: isAuthorized,
      },
    });
});

const isAuthorized = ($state, $rootScope) => {
  const isLogged = localStorage.getItem("token");

  if (!isLogged) {
    $state.go("login");
    return;
  }

  $rootScope.isLogged = true;
};
