const changeImageBtn = document.getElementById("changeImageBtn");
const closePopupBtn = document.getElementById("closePopupBtn");
const imagePopup = document.getElementById("imagePopup");
const applyImageBtn = document.getElementById("applyImageBtn");
const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const imageUrlInput = document.querySelector('input[name="image_url"]');

changeImageBtn.addEventListener("click", () => {
  imagePopup.classList.remove("hidden");
  imageInput.value = imageUrlInput.value || "";
});

imagePopup.addEventListener("click", (e) => {
  if (e.target === imagePopup) {
    imagePopup.classList.add("hidden");
  }
});

closePopupBtn.addEventListener("click", () => {
  imagePopup.classList.add("hidden");
});

applyImageBtn.addEventListener("click", () => {
  const url = imageInput.value.trim();
  const pattern = /^(.+\.(jpg|jpeg|png|gif|webp))|(\/?.+\/.+\.(jpg|jpeg|png|gif|webp))$/i;
  if (!pattern.test(url)) {
    alert("Ссылка некорректна. Убедитесь, что она заканчивается на .jpg, .png и т.д.");
    return;
  }

  previewImage.src = url;
  imageUrlInput.value = url;
  imagePopup.classList.add("hidden");
});
