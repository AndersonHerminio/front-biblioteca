myApp.service("HomeService", function ($http) {
  const top3Books = () => {
    return $http.get(`${apiBaseUrl}/home/top3`);
  };

  const booksReturn = () => {
    return $http.get(`${apiBaseUrl}/home/return`);
  };

  return {
    top3Books,
    booksReturn
  };
});