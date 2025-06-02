document.addEventListener('DOMContentLoaded', function () {
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

  // Обработчики для кнопок +/-
  document.querySelectorAll('.quantity-btn').forEach((button) => {
    button.addEventListener('click', async function () {
    const form = this.closest('.quantity-form')
    const input = form.querySelector('.quantity-input')
    let quantity = parseInt(input.value)

    if (this.classList.contains('plus')) {
      quantity++
    } else if (this.classList.contains('minus') && quantity > 1) {
      quantity--
    }

    input.value = quantity

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: quantity,
          _method: 'PUT',
        }),
      })

      const result = await response.json()

      if (result.success) {
        const itemElement = form.closest('.cart-item');
        const price = parseFloat(itemElement.querySelector('.price').textContent);
        itemElement.querySelector('.total').textContent = `Итого: ${(price * quantity).toFixed(2)} ₽`;

        document.querySelector('.cart-summary h3 span').textContent = `${result.newTotal} ₽`;

        updateCartCountInHeader();
      }
    } catch (error) {
      console.error('Ошибка:', error)
    }
    })
  })
})
