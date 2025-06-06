const popup = document.getElementById("itemPopup");
const closePopupBtn = document.getElementById("closePopupBtn");

function openItemPopup(el) {
  document.getElementById("popupId").innerText = el.dataset.id;
  document.getElementById("popupName").innerText = el.dataset.name;
  document.getElementById("popupQty").innerText = el.dataset.qty;
  document.getElementById("popupPrice").innerText = el.dataset.price;
  document.getElementById("popupTotal").innerText = el.dataset.total;
  document.getElementById("popupImage").src = el.dataset.image;
  popup.classList.remove("hidden");
}

popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.add("hidden");
  }
});

closePopupBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
});
