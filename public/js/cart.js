document.addEventListener("DOMContentLoaded", function () {
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

  document.querySelectorAll(".quantity-btn").forEach((button) => {
    button.addEventListener("click", async function () {
      const form = this.closest(".quantity-form");
      const cartItem = this.closest(".cart-item");
      const priceElement = cartItem.querySelector(".price");
      const input = form.querySelector(".quantity-input");
      const display = form.querySelector(".quantity-display");

      let quantity = parseInt(input.value);

      if (this.classList.contains("plus") && quantity < 99) {
        quantity++;
      } else if (this.classList.contains("minus") && quantity > 1) {
        quantity--;
      }

      input.value = quantity;
      display.textContent = quantity;

      try {
        const response = await fetch(form.action, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: quantity,
            _method: "PUT",
          }),
        });

        const result = await response.json();

        if (result.success) {
          const price = parseFloat(priceElement.textContent);
          cartItem.querySelector(".total").textContent =
            `${(price * quantity).toFixed(2)} ₽`;

          document.querySelector(".cart-summary p span").textContent =
            `${result.newTotal} ₽`;

          updateCartCountInHeader();
        }
      } catch (error) {
        console.error("Ошибка:", error);
      }
    });
  });
});
