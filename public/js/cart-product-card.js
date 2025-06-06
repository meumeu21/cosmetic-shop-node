function changeQuantity(delta) {
  const qtyInput = document.getElementById("quantity-hidden");
  const qtyDisplay = document.getElementById("quantity-display");
  let current = parseInt(qtyInput.value);
  current = Math.max(1, current + delta);
  qtyInput.value = current;
  qtyDisplay.innerText = current;
}

async function updateCartCountInHeader() {
  try {
    const res = await fetch('/cart/count');
    const data = await res.json();
    const cartLink = document.querySelector('.cart-link');
  if (cartLink) {
    cartLink.textContent = `Корзина (${data.count})`;
  }
  } catch (err) {
    console.error('Ошибка при обновлении количества в хедере:', err);
  }
}

const form = document.getElementById("productAddForm");
  form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const response = await fetch("/cart/add", {
    method: "POST",
    body: new URLSearchParams(formData),
    headers: { Accept: "application/json" }
  });

  const result = await response.json();
  if (result.success) {
    alert("Товар добавлен в корзину");
    await updateCartCountInHeader();
  } else {
    alert(result.message || "Ошибка при добавлении");
  }
});
