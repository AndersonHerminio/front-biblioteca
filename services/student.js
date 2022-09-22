myApp.service("StudentService", function ($http) {
  const add = (data) => {
    return $http.post(`${apiBaseUrl}/students`, data);
  };

  const edit = (data) => {
    return $http.put(`${apiBaseUrl}/students/${data.id}`, data);
  };

  const list = () => {
    return $http.get(`${apiBaseUrl}/students`);
  };

  const find = id => {
    return $http.get(`${apiBaseUrl}/students/${id}`);
  };

  const destroy = (id) => {
    return $http.post(`${apiBaseUrl}/students/remove`, {
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
