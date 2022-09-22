myApp.service("AuthorService", function ($http) {
  const add = (data) => {
    return $http.post(`${apiBaseUrl}/authors`, data);
  };

  const edit = (data) => {
    return $http.put(`${apiBaseUrl}/authors/${data.id}`, data);
  };

  const list = () => {
    return $http.get(`${apiBaseUrl}/authors`);
  };

  const find = id => {
    return $http.get(`${apiBaseUrl}/authors/${id}`);
  };

  const destroy = (id) => {
    return $http.post(`${apiBaseUrl}/authors/remove`, {
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
