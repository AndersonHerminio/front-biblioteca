myApp.service("LoginService", function ($http) {
  const login = (data) => {
    return $http.post(`${apiBaseUrl}/login`, data);
  };

  return {
    login,
  };
});
