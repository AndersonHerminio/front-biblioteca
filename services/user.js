myApp.service("UserService", function ($http) {
  const add = (data) => {
    return $http.post(`${apiBaseUrl}/users`, data);
  };

  const list = () => {
    return $http.get(`${apiBaseUrl}/users`);
  };

  return {
    add,
    list
  };
});
