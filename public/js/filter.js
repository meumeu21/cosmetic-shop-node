document.addEventListener("DOMContentLoaded", function () {
  const categoryFilterBtn = document.getElementById("categoryFilterBtn");
  const sortFilterBtn = document.getElementById("sortFilterBtn");
  const categoryOpenFilter = document.getElementById("categoryOpenFilter");
  const sortOpenFilter = document.getElementById("sortOpenFilter");

  let currentCategory = "Все";
  let currentSort = "default";

  categoryFilterBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    const isOpen = !categoryOpenFilter.classList.contains("hidden");

    closeAllFilters();

    if (!isOpen) {
      categoryOpenFilter.classList.remove("hidden");
      updateArrow(categoryFilterBtn, "up");
    }
  });

  sortFilterBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    const isOpen = !sortOpenFilter.classList.contains("hidden");

    closeAllFilters();

    if (!isOpen) {
      sortOpenFilter.classList.remove("hidden");
      updateArrow(sortFilterBtn, "up");
    }
  });

  document.addEventListener("click", function () {
    closeAllFilters();
  });

  categoryOpenFilter.addEventListener("click", function (e) {
    e.stopPropagation();
  });
  sortOpenFilter.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  document
    .querySelectorAll("#categoryOpenFilter button")
    .forEach((btn, index) => {
      btn.addEventListener("click", function () {
        const label = this.querySelector("p").textContent;
        categoryFilterBtn.querySelector("p").textContent = label;
        currentCategory = label === "Все" ? "Все" : label;
        closeAllFilters();
        filterAndSortProducts();
      });
    });

  document.querySelectorAll("#sortOpenFilter button").forEach((btn, index) => {
    btn.addEventListener("click", function () {
      const label = this.querySelector("p").textContent;
      sortFilterBtn.querySelector("p").textContent = label;

      if (label.includes("возрастанию")) {
        currentSort = "asc";
      } else if (label.includes("убыванию")) {
        currentSort = "desc";
      } else {
        currentSort = "default";
      }

      closeAllFilters();
      filterAndSortProducts();
    });
  });

  function filterAndSortProducts() {
    const productsStorage = document.querySelector(".products-storage");
    if (!productsStorage) return;

    const allProducts = Array.from(productsStorage.children);

    const productsData = allProducts.map((productEl) => {
      return {
        element: productEl,
        category: productEl
          .querySelector("div > span:nth-child(1)")
          .textContent.trim(),
        price: parseFloat(
          productEl
            .querySelector("div > span:nth-child(2)")
            .textContent.replace(/[^\d.]/g, ""),
        ),
      };
    });

    let filtered = productsData;
    if (currentCategory !== "Все") {
      filtered = filtered.filter(
        (product) => product.category === currentCategory,
      );
    }

    if (currentSort === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    updateURL();

    if (window.updateFilteredProducts) {
      window.updateFilteredProducts(filtered.map((p) => p.element));
    }

    function updateURL() {
      const params = new URLSearchParams();
      if (currentCategory && currentCategory !== "Все") {
        params.set("category", currentCategory);
      }
      if (currentSort && currentSort !== "default") {
        params.set("sort", currentSort);
      }
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({}, "", newUrl);
    }
  }

  function closeAllFilters() {
    categoryOpenFilter.classList.add("hidden");
    sortOpenFilter.classList.add("hidden");
    updateArrow(categoryFilterBtn, "down");
    updateArrow(sortFilterBtn, "down");
  }

  function updateArrow(button, direction) {
    const img = button.querySelector("img");
    img.src = direction === "up" ? "/svgs/updown.svg" : "/svgs/dropdown.svg";
  }

  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get("category") || "Все";
  const initialSort = urlParams.get("sort") || "default";

  categoryFilterBtn.querySelector("p").textContent = initialCategory;
  sortFilterBtn.querySelector("p").textContent =
    sortLabelFromValue(initialSort);

  currentCategory = initialCategory;
  currentSort = initialSort;

  filterAndSortProducts();

  function sortLabelFromValue(value) {
    if (value === "asc") return "Цена: по возрастанию";
    if (value === "desc") return "Цена: по убыванию";
    return "Сортировать";
  }

  window.filterAndSortProducts = filterAndSortProducts;
});
