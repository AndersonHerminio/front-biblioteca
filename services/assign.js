myApp.service("AssignService", function ($http) {
  const add = (data) => {
    return $http.post(`${apiBaseUrl}/students/${data.student_id}/assign-book`, data);
  };

  const edit = (data) => {
    return $http.put(`${apiBaseUrl}/students/:student_id/assign-book/${data.id}`, data);
  };

  const list = () => {
    return $http.get(`${apiBaseUrl}/students/:student_id/assign-book`);
  };

  const find = (id) => {
    return $http.get(`${apiBaseUrl}/students/:student_id/assign-book/${id}`);
  };

  const destroy = (id) => {
    return $http.post(`${apiBaseUrl}/students/:student_id/assign-book/remove`, {
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
