myApp.service("PublisherService", function ($http) {
  const add = (data) => {
    return $http.post(`${apiBaseUrl}/publishers`, data);
  };

  const edit = (data) => {
    return $http.put(`${apiBaseUrl}/publishers/${data.id}`, data);
  };

  const list = () => {
    return $http.get(`${apiBaseUrl}/publishers`);
  };

  const find = id => {
    return $http.get(`${apiBaseUrl}/publishers/${id}`);
  };

  const destroy = (id) => {
    return $http.post(`${apiBaseUrl}/publishers/remove`, {
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
