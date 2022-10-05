myApp.service("RecoveryPasswordService", function ($http) {
  
  const recovery = (data) => {
    return $http.post(`${apiBaseUrl}/recovery_password/`, data);
  };

  const validateToken = (token) => {
    return $http.get(`${apiBaseUrl}/validate-token-password/${token}`);
  };

  return {
    recovery,
    validateToken,
  };
});
