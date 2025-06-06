function changeQuantity(delta) {
  const display = document.getElementById('quantity-display');
  const hiddenInput = document.getElementById('quantity-hidden');

  let value = parseInt(hiddenInput.value, 10);
  const min = 1;
  const max = 10;

  value = Math.min(max, Math.max(min, value + delta));

  display.textContent = value;
  hiddenInput.value = value;
}

const buttons = document.querySelectorAll('.toggle-btn');
const contents = document.querySelectorAll('.toggle-content');
const description = document.getElementById('product-description');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.target;
    const content = document.getElementById(targetId);
    const icon = button.querySelector('.toggle-icon');

    const isActive = !content.classList.contains('hidden');
    contents.forEach(c => c.classList.add('hidden'));
    document.querySelectorAll('.toggle-icon').forEach(i => i.src = '/svgs/dropdown.svg');

    if (isActive) {
      description.classList.remove('hidden');
    } else {
      content.classList.remove('hidden');
      icon.src = '/svgs/updown.svg';
      description.classList.add('hidden');
    }
  });
});
