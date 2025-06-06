document.addEventListener('DOMContentLoaded', function() {
  const productListContainer = document.querySelector('.product-list > div > .pt-\\[50px\\]');

  const allOriginalProducts = Array.from(productListContainer.children);

  const productsStorage = document.createElement('div');
  productsStorage.className = 'products-storage hidden';
  document.body.appendChild(productsStorage);

  allOriginalProducts.forEach(product => {
    productsStorage.appendChild(product.cloneNode(true));
  });

  let filteredProducts = [...allOriginalProducts];
  const itemsPerPage = 8;
  let totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  let currentPage = 1;

  const paginationContainer = document.createElement('div');
  paginationContainer.className = 'pagination flex justify-center items-center gap-2 mt-[80px]';

  const firstButton = createPaginationButton('first', '/svgs/arrow-start-pag.svg');
  const prevButton = createPaginationButton('prev', '/svgs/arrow-left-pag.svg');

  paginationContainer.appendChild(firstButton);
  paginationContainer.appendChild(prevButton);

  const pageNumbersContainer = document.createElement('div');
  pageNumbersContainer.className = 'flex items-center gap-2';
  paginationContainer.appendChild(pageNumbersContainer);

  const nextButton = createPaginationButton('next', '/svgs/arrow-right-pag.svg');
  const lastButton = createPaginationButton('last', '/svgs/arrow-end-pag.svg');
  paginationContainer.appendChild(nextButton);
  paginationContainer.appendChild(lastButton);

  productListContainer.parentNode.insertBefore(paginationContainer, productListContainer.nextSibling);

  function updateProductDisplay() {
    productListContainer.innerHTML = '';

    if (filteredProducts.length === 0) {
      const noProducts = document.createElement('div');
      noProducts.className = 'w-full text-center py-10';
      noProducts.textContent = 'Товары не найдены';
      productListContainer.appendChild(noProducts);
      return;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    productsToShow.forEach(product => {
      const productClone = product.cloneNode(true);
      productListContainer.appendChild(productClone);
    });
  }

  function updatePagination() {
    if (!pageNumbersContainer) return;

    pageNumbersContainer.innerHTML = '';

    pageNumbersContainer.appendChild(createPageNumberButton(1));

    if (totalPages <= 5) {
      for (let i = 2; i <= totalPages; i++) {
        pageNumbersContainer.appendChild(createPageNumberButton(i));
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 2; i <= 3; i++) {
          pageNumbersContainer.appendChild(createPageNumberButton(i));
        }
        pageNumbersContainer.appendChild(createEllipsis());
        for (let i = totalPages - 1; i <= totalPages; i++) {
          pageNumbersContainer.appendChild(createPageNumberButton(i));
        }
      } else if (currentPage >= totalPages - 2) {
        pageNumbersContainer.appendChild(createPageNumberButton(2));
        pageNumbersContainer.appendChild(createEllipsis());
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbersContainer.appendChild(createPageNumberButton(i));
        }
      } else {
        pageNumbersContainer.appendChild(createEllipsis());
        pageNumbersContainer.appendChild(createPageNumberButton(currentPage - 1));
        pageNumbersContainer.appendChild(createPageNumberButton(currentPage));
        pageNumbersContainer.appendChild(createPageNumberButton(currentPage + 1));
        pageNumbersContainer.appendChild(createEllipsis());
        pageNumbersContainer.appendChild(createPageNumberButton(totalPages));
      }
    }

    const first = document.querySelector('.pagination-first');
    const prev = document.querySelector('.pagination-prev');
    const next = document.querySelector('.pagination-next');
    const last = document.querySelector('.pagination-last');

    if (first && prev && next && last) {
      first.disabled = currentPage === 1;
      prev.disabled = currentPage === 1;
      next.disabled = currentPage === totalPages;
      last.disabled = currentPage === totalPages;
    }
  }

  window.updateFilteredProducts = function(newProducts) {
    filteredProducts = newProducts;
    totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    currentPage = 1;
    updateProductDisplay();
    updatePagination();
  };

  updateProductDisplay();
  updatePagination();

  function createPaginationButton(type, imgSrc) {
    const button = document.createElement('button');
    button.className = `pagination-${type} w-[20px] h-[20px] flex items-center justify-center`;

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = type;
    img.className = 'w-full h-full object-contain';
    button.appendChild(img);

    button.addEventListener('click', function() {
      switch(type) {
        case 'first':
          if (currentPage !== 1) currentPage = 1;
          break;
        case 'prev':
          if (currentPage > 1) currentPage--;
          break;
        case 'next':
          if (currentPage < totalPages) currentPage++;
          break;
        case 'last':
          if (currentPage !== totalPages) currentPage = totalPages;
          break;
      }

      updateProductDisplay();
      updatePagination();
    });

    return button;
  }

  function createPageNumberButton(page) {
    const button = document.createElement('button');
    button.className = `page-number font-quicksand text-lg flex items-center justify-center ${currentPage === page ? 'underline' : ''}`;
    button.textContent = page;

    button.addEventListener('click', function() {
      if (currentPage !== page) {
        currentPage = page;
        updateProductDisplay();
        updatePagination();
      }
    });

    return button;
  }

  function createEllipsis() {
    const ellipsis = document.createElement('span');
    ellipsis.className = 'flex items-end px-1';
    ellipsis.textContent = '...';
    return ellipsis;
  }

});
