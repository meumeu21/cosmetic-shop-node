document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("authPopup");
  const openBtn = document.getElementById("authPopupBtn");
  const cartBtn = document.getElementById("cartPopupBtn");
  const closeBtn = document.getElementById("closeAuthPopup");
  const tabBtns = document.querySelectorAll(".tab-btn");
  const authForms = document.querySelectorAll(".auth-form");

  function showPopup() {
    popup.classList.remove("hidden");
  }

  function hidePopup() {
    popup.classList.add("hidden");
  }

  if (openBtn) openBtn.addEventListener("click", showPopup);
  if (cartBtn) cartBtn.addEventListener("click", showPopup);
  if (closeBtn) closeBtn.addEventListener("click", hidePopup);

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active", "border-black"));
      authForms.forEach((f) => f.classList.add("hidden"));

      btn.classList.add("active", "border-black");
      document.getElementById(btn.dataset.tab + "Form").classList.remove("hidden");
    });
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) hidePopup();
  });

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => {
        b.classList.remove("text-black", "border-black");
        b.classList.add("text-hoverb", "border-white");
      });

      authForms.forEach((form) => form.classList.add("hidden"));

      btn.classList.add("text-black", "border-black");
      btn.classList.remove("text-hoverb", "border-white");

      document
        .getElementById(btn.dataset.tab + "Form")
        .classList.remove("hidden");
    });
  });
});

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(registerForm);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Accept": "application/json",
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || "Произошла ошибка при регистрации.");
      return;
    }

    alert("Регистрация прошла успешно");
    window.location.reload(); // или window.location.href = '/';
  } catch (error) {
    alert("Ошибка соединения с сервером.");
  }
});

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(loginForm);

  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Accept": "application/json",
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || "Ошибка при входе.");
      return;
    }

    window.location.reload(); // или window.location.href = '/';
  } catch (error) {
    alert("Ошибка соединения с сервером.");
  }
});
