async function updateCartCountInHeader() {
  try {
    const res = await fetch("/cart/count");
    const data = await res.json();
    const cartLink = document.querySelector(".cart-link");
    if (cartLink) {
      cartLink.textContent = `Корзина (${data.count})`;
    }
  } catch (err) {
    console.error("Ошибка при обновлении количества в хедере:", err);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("submit", async function (e) {
    if (e.target.classList.contains("add-to-cart-form")) {
      e.preventDefault();

      const formData = new FormData(e.target);
      const response = await fetch("/cart/add", {
        method: "POST",
        body: new URLSearchParams(formData),
        headers: { Accept: "application/json" },
      });

      const result = await response.json();
      if (result.success) {
        alert("Товар добавлен в корзину");
        await updateCartCountInHeader();
      } else {
        alert(result.message || "Ошибка при добавлении");
      }
    }
  });
});
