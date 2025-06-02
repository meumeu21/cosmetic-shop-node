document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("authPopup");

  // Отлов всех форм добавления в корзину
  document.querySelectorAll('form[action="/cart/add"]').forEach(form => {
    form.addEventListener("submit", function (e) {
      if (!window.isAuthenticated) {
        e.preventDefault();
        popup.style.display = "flex";
      }
    });
  });
});
