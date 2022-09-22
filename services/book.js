myApp.service("BookService", function ($http) {
  const add = (data) => {
    return $http.post(`${apiBaseUrl}/books`, data);
  };

  const edit = (data) => {
    return $http.put(`${apiBaseUrl}/books/${data.id}`, data);
  };

  const list = () => {
    return $http.get(`${apiBaseUrl}/books`);
  };

  const find = id => {
    return $http.get(`${apiBaseUrl}/books/${id}`);
  };

  const destroy = (id) => {
    return $http.post(`${apiBaseUrl}/books/remove`, {
      id,
    });
  };

  return {
    add,
    edit,
    find,
    list,
    destroy
  };
});
