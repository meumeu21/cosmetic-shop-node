document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("authPopup");

  document.querySelectorAll('form[action="/cart/add"]').forEach((form) => {
    form.addEventListener("submit", function (e) {
      if (!window.isAuthenticated) {
        e.preventDefault();
        popup.style.display = "flex";
      }
    });
  });

  popup.addEventListener("click", function (e) {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
});
