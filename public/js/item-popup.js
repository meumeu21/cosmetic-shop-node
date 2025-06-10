const popup = document.getElementById("itemPopup");
const closePopupBtn = document.getElementById("closePopupBtn");

function openItemPopup(el) {
  document.getElementById("popupId").innerText = el.dataset.id;
  document.getElementById("popupName").innerText = el.dataset.name;
  document.getElementById("popupAge").innerText = el.dataset.age;
  document.getElementById("popupVolume").innerText = el.dataset.volume;
  document.getElementById("popupSetItems").innerText = el.dataset.setitems;
  document.getElementById("popupHypoallergenic").innerText =
    el.dataset.hypoallergenic;
  document.getElementById("popupQty").innerText = el.dataset.qty;
  document.getElementById("popupPrice").innerText = el.dataset.price;
  document.getElementById("popupTotal").innerText = el.dataset.total;
  document.getElementById("popupImage").src = el.dataset.image;
  popup.classList.remove("hidden");
  const volume = parseFloat(el.dataset.volume);
  const setItemsRow = document.getElementById("setItemsRow");
  const volumeRow = document.getElementById("volumeRow");

  if (volume > 0) {
    volumeRow.classList.remove("hidden");
    setItemsRow.classList.add("hidden");
  } else {
    setItemsRow.classList.remove("hidden");
    volumeRow.classList.add("hidden");
  }
}

popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.add("hidden");
  }
});

closePopupBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
});
