document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("authPopup");
  const closeBtn = document.getElementById("closeAuthPopup");
  const tabBtns = document.querySelectorAll(".tab-btn");
  const authForms = document.querySelectorAll(".auth-form");

  function showPopup() {
    popup.classList.remove("hidden");
    popup.removeAttribute('style');
  }

  function hidePopup() {
    popup.classList.add("hidden");
    popup.removeAttribute('style');
  }

  document.addEventListener('click', function(e) {
    if (e.target.closest('#authPopupBtn, #cartPopupBtn')) {
      e.preventDefault();
      showPopup();
    }
  });

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

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(registerForm);
      const data = Object.fromEntries(formData.entries());
      const errorElement = document.getElementById("registerError");

      if (data.password !== data.confirmPassword) {
        // alert("Пароли не совпадают");
        errorElement.textContent = "Пароли не совпадают";
        errorElement.classList.remove("hidden");
        return;
      }

      try {
        const response = await fetch("/auth/check-unique", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.username,
            email: data.email,
          }),
        });

        const result = await response.json();

        if (!result.isUnique) {
          // alert(result.message);
          errorElement.textContent = result.message;
          errorElement.classList.remove("hidden");
          return;
        }

        errorElement.classList.add("hidden");
        registerForm.submit();
      } catch (error) {
        console.error("Ошибка при проверке уникальности:", error);
        // alert("Ошибка при проверке данных");
        errorElement.textContent = "Ошибка при проверке данных";
        errorElement.classList.remove("hidden");
      }
    });
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(loginForm);
      const data = Object.fromEntries(formData.entries());
      const errorElement = document.getElementById("loginError");

      try {
        const response = await fetch("/auth/validate-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        });

        const result = await response.json();

        if (!result.isValid) {
          // alert(result.message);
          errorElement.textContent = result.message;
          errorElement.classList.remove("hidden");
          return;
        }

        errorElement.classList.add("hidden");
        loginForm.submit();
      } catch (error) {
        console.error("Ошибка при валидации:", error);
        // alert("Ошибка при проверке данных");
        errorElement.textContent = "Ошибка при проверке данных";
        errorElement.classList.remove("hidden");
      }
    });
  }
});
