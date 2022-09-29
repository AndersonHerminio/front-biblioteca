myApp.service("AssignService", function ($http) {
  const add = (data) => {
    return $http.post(`${apiBaseUrl}/students/${data.student_id}/assign-book`, data);
  };

  const list = () => {
    return $http.get(`${apiBaseUrl}/student-assigns`);
  };

  const find = () => {
    return $http.get(`${apiBaseUrl}/student-assigns-concluded`);
  };

  const destroy = ({ book_id, student_id }) => {
    return $http.post(`${apiBaseUrl}/student-assigns/${student_id}/return-book`, {
      book_id: [book_id]
    });
  };

  return {
    add,
    find,
    list,
    destroy,
  };
});
