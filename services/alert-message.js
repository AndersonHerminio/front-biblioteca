myApp.service("AlertMessage", function () {
  const success = (title) => {
    return Swal.fire({
      title,
      icon: "success",
      showConfirmButton: false,
      timer: 2000
    });
  };
  const error = (text) => {
    return Swal.fire(text, "", "error");
  };
  return {
    success, error
  };
});
