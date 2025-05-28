document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("authPopup");
  popup.style.display = "none";
  const openBtn = document.getElementById("authPopupBtn");
  const closeBtn = document.getElementById("closeAuthPopup");
  const tabBtns = document.querySelectorAll(".tab-btn");
  const authForms = document.querySelectorAll(".auth-form");

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      popup.style.display = "flex";
    });
  }

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      authForms.forEach((f) => f.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(btn.dataset.tab + "Form").classList.add("active");
    });
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
});
