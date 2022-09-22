myApp.service("UserService", function ($http) {
  const add = (data) => {
    return $http.post(`${apiBaseUrl}/users`, data);
  };

  const edit = (data) => {
    return $http.put(`${apiBaseUrl}/users/${data.id}`, data);
  };

  const list = () => {
    return $http.get(`${apiBaseUrl}/users`);
  };

  const find = (id) => {
    return $http.get(`${apiBaseUrl}/users/${id}`);
  };

  const destroy = (id) => {
    return $http.post(`${apiBaseUrl}/users/remove`, {
      id,
    });
  };

  return {
    add,
    edit,
    find,
    list,
    destroy,
  };
});
