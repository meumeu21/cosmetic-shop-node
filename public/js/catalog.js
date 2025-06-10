document.addEventListener("DOMContentLoaded", function () {
  const productListContainer = document.querySelector(
    ".product-list > div > .pt-\\[50px\\]",
  );
  const categoryFilterBtn = document.getElementById("categoryFilterBtn");
  const sortFilterBtn = document.getElementById("sortFilterBtn");
  const categoryOpenFilter = document.getElementById("categoryOpenFilter");
  const sortOpenFilter = document.getElementById("sortOpenFilter");

  const itemsPerPage = 8;
  let currentCategory = "Все";
  let currentSort = "default";
  let currentPage = 1;

  const productsStorage = document.createElement("div");
  productsStorage.className = "products-storage hidden";
  document.body.appendChild(productsStorage);

  const allOriginalProducts = Array.from(productListContainer.children);
  allOriginalProducts.forEach((product) =>
    productsStorage.appendChild(product.cloneNode(true)),
  );

  let filteredProducts = [...productsStorage.children];
  let totalPages = calculateTotalPages();

  initPagination();
  attachFilterEvents();
  applyFiltersFromURL();

  function calculateTotalPages() {
    return Math.ceil(filteredProducts.length / itemsPerPage);
  }

  function updateProductDisplay() {
    productListContainer.innerHTML = "";

    if (filteredProducts.length === 0) {
      const noProducts = document.createElement("div");
      noProducts.className = "w-full text-center py-10";
      noProducts.textContent = "Товары не найдены";
      productListContainer.appendChild(noProducts);
      return;
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    filteredProducts.slice(start, end).forEach((product) => {
      productListContainer.appendChild(product.cloneNode(true));
    });
  }

  function updatePagination() {
    const container = document.querySelector(".pagination .flex.gap-2");
    if (!container) return;
    container.innerHTML = "";

    const buttons = generatePageButtons();
    buttons.forEach((btn) => container.appendChild(btn));

    setButtonState(".pagination-first", currentPage === 1);
    setButtonState(".pagination-prev", currentPage === 1);
    setButtonState(".pagination-next", currentPage === totalPages);
    setButtonState(".pagination-last", currentPage === totalPages);
  }

  function setButtonState(selector, disabled) {
    const btn = document.querySelector(selector);
    if (btn) btn.disabled = disabled;
  }

  function generatePageButtons() {
    const buttons = [createPageNumberButton(1)];

    if (totalPages <= 5) {
      for (let i = 2; i <= totalPages; i++)
        buttons.push(createPageNumberButton(i));
    } else {
      if (currentPage <= 3) {
        buttons.push(
          createPageNumberButton(2),
          createPageNumberButton(3),
          createEllipsis(),
          createPageNumberButton(totalPages - 1),
          createPageNumberButton(totalPages),
        );
      } else if (currentPage >= totalPages - 2) {
        buttons.push(createPageNumberButton(2), createEllipsis());
        for (let i = totalPages - 2; i <= totalPages; i++)
          buttons.push(createPageNumberButton(i));
      } else {
        buttons.push(
          createEllipsis(),
          createPageNumberButton(currentPage - 1),
          createPageNumberButton(currentPage),
          createPageNumberButton(currentPage + 1),
          createEllipsis(),
          createPageNumberButton(totalPages),
        );
      }
    }

    return buttons;
  }

  function createPaginationButton(type, imgSrc) {
    const btn = document.createElement("button");
    btn.className = `pagination-${type} w-[20px] h-[20px] flex items-center justify-center`;

    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = type;
    img.className = "w-full h-full object-contain";
    btn.appendChild(img);

    btn.addEventListener("click", () => {
      switch (type) {
        case "first":
          currentPage = 1;
          break;
        case "prev":
          if (currentPage > 1) currentPage--;
          break;
        case "next":
          if (currentPage < totalPages) currentPage++;
          break;
        case "last":
          currentPage = totalPages;
          break;
      }
      updateProductDisplay();
      updatePagination();
    });

    return btn;
  }

  function createPageNumberButton(page) {
    const btn = document.createElement("button");
    btn.className = `page-number font-quicksand text-lg flex items-center justify-center ${currentPage === page ? "underline" : ""}`;
    btn.textContent = page;
    btn.addEventListener("click", () => {
      currentPage = page;
      updateProductDisplay();
      updatePagination();
    });
    return btn;
  }

  function createEllipsis() {
    const span = document.createElement("span");
    span.textContent = "...";
    return span;
  }

  function initPagination() {
    const container = document.createElement("div");
    container.className =
      "pagination flex justify-center items-center gap-2 mt-[80px]";

    container.appendChild(
      createPaginationButton("first", "/svgs/arrow-start-pag.svg"),
    );
    container.appendChild(
      createPaginationButton("prev", "/svgs/arrow-left-pag.svg"),
    );

    const pageContainer = document.createElement("div");
    pageContainer.className = "flex items-center gap-2";
    container.appendChild(pageContainer);

    container.appendChild(
      createPaginationButton("next", "/svgs/arrow-right-pag.svg"),
    );
    container.appendChild(
      createPaginationButton("last", "/svgs/arrow-end-pag.svg"),
    );

    productListContainer.parentNode.insertBefore(
      container,
      productListContainer.nextSibling,
    );
  }

  function attachFilterEvents() {
    categoryFilterBtn.addEventListener("click", (e) =>
      toggleFilter(e, categoryOpenFilter, categoryFilterBtn),
    );
    sortFilterBtn.addEventListener("click", (e) =>
      toggleFilter(e, sortOpenFilter, sortFilterBtn),
    );

    document.addEventListener("click", closeAllFilters);
    categoryOpenFilter.addEventListener("click", (e) => e.stopPropagation());
    sortOpenFilter.addEventListener("click", (e) => e.stopPropagation());

    categoryOpenFilter.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentCategory = btn.querySelector("p").textContent;
        categoryFilterBtn.querySelector("p").textContent = currentCategory;
        filterAndSortProducts();
        closeAllFilters();
      });
    });

    sortOpenFilter.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const label = btn.querySelector("p").textContent;
        sortFilterBtn.querySelector("p").textContent = label;
        currentSort = label.includes("возрастанию")
          ? "asc"
          : label.includes("убыванию")
            ? "desc"
            : "default";
        filterAndSortProducts();
        closeAllFilters();
      });
    });
  }

  function toggleFilter(e, panel, btn) {
    e.stopPropagation();
    const isOpen = !panel.classList.contains("hidden");
    closeAllFilters();
    if (!isOpen) {
      panel.classList.remove("hidden");
      updateArrow(btn, "up");
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

  function filterAndSortProducts() {
    const all = Array.from(productsStorage.children).map((el) => ({
      element: el,
      category: el.querySelector("div > span:nth-child(1)").textContent.trim(),
      price: parseFloat(
        el
          .querySelector("div > span:nth-child(2)")
          .textContent.replace(/[^\d.]/g, ""),
      ),
    }));

    let result = all;
    if (currentCategory !== "Все")
      result = result.filter((p) => p.category === currentCategory);
    if (currentSort === "asc") result.sort((a, b) => a.price - b.price);
    if (currentSort === "desc") result.sort((a, b) => b.price - a.price);

    filteredProducts = result.map((p) => p.element);
    totalPages = calculateTotalPages();
    currentPage = 1;

    updateProductDisplay();
    updatePagination();
    updateURL();
  }

  function updateURL() {
    const params = new URLSearchParams();
    if (currentCategory !== "Все") params.set("category", currentCategory);
    if (currentSort !== "default") params.set("sort", currentSort);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);
  }

  function applyFiltersFromURL() {
    const params = new URLSearchParams(window.location.search);
    currentCategory = params.get("category") || "Все";
    currentSort = params.get("sort") || "default";

    categoryFilterBtn.querySelector("p").textContent = currentCategory;
    sortFilterBtn.querySelector("p").textContent = getSortLabel(currentSort);

    filterAndSortProducts();
  }

  function getSortLabel(value) {
    if (value === "asc") return "Цена: по возрастанию";
    if (value === "desc") return "Цена: по убыванию";
    return "Сортировать";
  }
});
