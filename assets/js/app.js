/**
 * ROCHELLES Streetwear - Aplicação Principal
 * Interações, Modais, Renderização de Produtos e UI/UX
 */

document.addEventListener("DOMContentLoaded", () => {
  // Estado local da UI
  let currentCategory = "todos";
  let activeModalProduct = null;
  let selectedModalSize = null;
  let selectedModalQty = 1;

  // Elementos do DOM
  const productsGrid = document.getElementById("products-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cartToggleBtn = document.getElementById("cart-toggle-btn");
  const mobileCartToggleBtn = document.getElementById("mobile-cart-toggle-btn");
  const cartDrawer = document.getElementById("cart-drawer");
  const cartBackdrop = document.getElementById("cart-backdrop");
  const closeCartBtn = document.getElementById("close-cart-btn");
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartEmptyState = document.getElementById("cart-empty-state");
  const cartSubtotalEl = document.getElementById("cart-subtotal");
  const cartBadgeCount = document.getElementById("cart-badge-count");
  const mobileCartBadgeCount = document.getElementById("mobile-cart-badge-count");
  const checkoutBtn = document.getElementById("checkout-btn");
  const shippingProgressBar = document.getElementById("shipping-progress-bar");
  const shippingText = document.getElementById("shipping-text");

  // Modal de Detalhes
  const productModal = document.getElementById("product-modal");
  const modalBackdrop = document.getElementById("modal-backdrop");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const modalMainImg = document.getElementById("modal-main-img");
  const modalThumbnails = document.getElementById("modal-thumbnails");
  const modalCategory = document.getElementById("modal-category");
  const modalTitle = document.getElementById("modal-title");
  const modalPrice = document.getElementById("modal-price");
  const modalInstallments = document.getElementById("modal-installments");
  const modalDesc = document.getElementById("modal-desc");
  const modalSpecsList = document.getElementById("modal-specs-list");
  const modalSizesContainer = document.getElementById("modal-sizes-container");
  const modalQtyInput = document.getElementById("modal-qty-input");
  const modalQtyMinus = document.getElementById("modal-qty-minus");
  const modalQtyPlus = document.getElementById("modal-qty-plus");
  const modalAddToCartBtn = document.getElementById("modal-add-to-cart-btn");
  const modalSizeError = document.getElementById("modal-size-error");

  // Modal de Checkout Demonstrativo
  const checkoutModal = document.getElementById("checkout-modal");
  const checkoutBackdrop = document.getElementById("checkout-backdrop");
  const closeCheckoutBtn = document.getElementById("close-checkout-btn");
  const checkoutConfirmBtn = document.getElementById("checkout-confirm-btn");
  const checkoutSummaryList = document.getElementById("checkout-summary-list");
  const checkoutTotalEl = document.getElementById("checkout-total");

  // Menu Mobile
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenuDrawer = document.getElementById("mobile-menu-drawer");
  const closeMobileMenuBtn = document.getElementById("close-mobile-menu-btn");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  // Header Scroll Effect
  const mainHeader = document.getElementById("main-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      mainHeader.classList.add("header-scrolled");
    } else {
      mainHeader.classList.remove("header-scrolled");
    }
  });

  // 1. RENDERIZAÇÃO DA GRADE DE PRODUTOS
  function renderProducts(category = "todos") {
    if (!productsGrid) return;

    const filtered = category === "todos"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === category);

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="col-span-full py-16 text-center text-secondary">
          <p class="text-xl">Nenhuma peça encontrada para esta categoria.</p>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = filtered
      .map((product) => {
        const hasBack = product.backImage && product.backImage !== product.frontImage;
        const installmentValue = (product.price / 3).toFixed(2).replace(".", ",");

        return `
        <article class="product-card group" data-product-id="${product.id}">
          <div class="product-image-wrapper">
            ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}
            
            <div class="product-image-container" onclick="openProductModal('${product.id}')">
              <img 
                src="${product.frontImage}" 
                alt="${product.name} - Vista Frontal" 
                class="product-img product-img-front"
                loading="lazy"
              />
              ${
                hasBack
                  ? `
                <img 
                  src="${product.backImage}" 
                  alt="${product.name} - Vista Traseira" 
                  class="product-img product-img-back"
                  loading="lazy"
                />
                <span class="view-indicator-pill">Frente / Verso</span>
              `
                  : ""
              }
            </div>

            <!-- Botões de Ação Rápida no Card -->
            <div class="product-card-actions">
              <button 
                type="button" 
                class="btn-card-action btn-quick-view" 
                onclick="openProductModal('${product.id}')"
                aria-label="Ver detalhes de ${product.name}"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span>Ver Detalhes</span>
              </button>
            </div>
          </div>

          <div class="product-info">
            <span class="product-category">${product.categoryLabel}</span>
            <h3 class="product-name" onclick="openProductModal('${product.id}')">${product.name}</h3>
            
            <div class="product-price-row">
              <span class="product-price">${formatPrice(product.price)}</span>
              <span class="product-installments">3x de R$ ${installmentValue}</span>
            </div>

            <div class="product-sizes-badge">
              <span>Tamanhos: ${product.sizes.join(" · ")}</span>
            </div>
          </div>
        </article>
      `;
      })
      .join("");
  }

  // Filtros de Categoria
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.getAttribute("data-category");
      renderProducts(currentCategory);
    });
  });

  // 2. MODAL DE DETALHES DO PRODUTO
  window.openProductModal = function (productId) {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    activeModalProduct = product;
    selectedModalQty = 1;
    modalQtyInput.value = 1;
    modalSizeError.classList.add("hidden");

    // Seleciona automaticamente o tamanho se for único (ex: boné)
    if (product.sizes.length === 1) {
      selectedModalSize = product.sizes[0];
    } else {
      selectedModalSize = null;
    }

    // Preenche dados
    modalCategory.textContent = product.categoryLabel.toUpperCase();
    modalTitle.textContent = product.name;
    modalPrice.textContent = formatPrice(product.price);
    modalInstallments.textContent = `Em até 3x de R$ ${(product.price / 3).toFixed(2).replace(".", ",")} sem juros`;
    modalDesc.textContent = product.description;

    // Especificações
    modalSpecsList.innerHTML = product.specs
      .map((spec) => `<li><span class="bullet">✦</span> ${spec}</li>`)
      .join("");

    // Renderiza Galeria de Miniaturas
    const images = [];
    if (product.frontImage) images.push({ label: "Frente", src: product.frontImage });
    if (product.backImage && product.backImage !== product.frontImage) {
      images.push({ label: "Costas", src: product.backImage });
    }
    if (product.fullImage && product.fullImage !== product.frontImage) {
      images.push({ label: "Visão Geral", src: product.fullImage });
    }

    // Imagem Principal
    modalMainImg.src = images[0].src;
    modalMainImg.alt = `${product.name} - Imagem Principal`;

    modalThumbnails.innerHTML = images
      .map(
        (img, idx) => `
        <button 
          type="button" 
          class="modal-thumb-btn ${idx === 0 ? "active" : ""}" 
          onclick="switchModalImage('${img.src}', this)"
          title="${img.label}"
        >
          <img src="${img.src}" alt="${img.label}" />
          <span class="thumb-label">${img.label}</span>
        </button>
      `
      )
      .join("");

    // Renderiza Tamanhos
    modalSizesContainer.innerHTML = product.sizes
      .map(
        (size) => `
        <button 
          type="button" 
          class="size-pill ${selectedModalSize === size ? "selected" : ""}"
          onclick="selectModalSize('${size}', this)"
        >
          ${size}
        </button>
      `
      )
      .join("");

    // Exibe modal
    productModal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  };

  window.switchModalImage = function (src, btn) {
    modalMainImg.src = src;
    document.querySelectorAll(".modal-thumb-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  };

  window.selectModalSize = function (size, btn) {
    selectedModalSize = size;
    modalSizeError.classList.add("hidden");
    document.querySelectorAll(".size-pill").forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
  };

  function closeProductModal() {
    productModal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    activeModalProduct = null;
    selectedModalSize = null;
  }

  closeModalBtn.addEventListener("click", closeProductModal);
  modalBackdrop.addEventListener("click", closeProductModal);

  // Quantidade no Modal
  modalQtyMinus.addEventListener("click", () => {
    if (selectedModalQty > 1) {
      selectedModalQty--;
      modalQtyInput.value = selectedModalQty;
    }
  });

  modalQtyPlus.addEventListener("click", () => {
    selectedModalQty++;
    modalQtyInput.value = selectedModalQty;
  });

  // Adicionar à sacola pelo modal
  modalAddToCartBtn.addEventListener("click", () => {
    if (!activeModalProduct) return;

    if (!selectedModalSize) {
      modalSizeError.classList.remove("hidden");
      modalSizeError.textContent = "Por favor, selecione um tamanho (P, M, G ou GG).";
      modalSizesContainer.classList.add("shake-animation");
      setTimeout(() => {
        modalSizesContainer.classList.remove("shake-animation");
      }, 500);
      return;
    }

    const res = cart.addItem(activeModalProduct.id, selectedModalSize, selectedModalQty);
    if (res.success) {
      showToast(res.message);
      closeProductModal();
      openCartDrawer();
    }
  });

  // 3. SACOLA DE COMPRAS (DRAWER)
  function openCartDrawer() {
    cartDrawer.classList.remove("translate-x-full");
    cartBackdrop.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  }

  function closeCartDrawer() {
    cartDrawer.classList.add("translate-x-full");
    cartBackdrop.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }

  cartToggleBtn.addEventListener("click", openCartDrawer);
  if (mobileCartToggleBtn) mobileCartToggleBtn.addEventListener("click", openCartDrawer);
  closeCartBtn.addEventListener("click", closeCartDrawer);
  cartBackdrop.addEventListener("click", closeCartDrawer);

  // Atualização reativa da sacola
  cart.subscribe((state) => {
    // Badges no header
    cartBadgeCount.textContent = state.totalCount;
    if (mobileCartBadgeCount) mobileCartBadgeCount.textContent = state.totalCount;

    if (state.totalCount > 0) {
      cartBadgeCount.classList.remove("scale-0");
      if (mobileCartBadgeCount) mobileCartBadgeCount.classList.remove("scale-0");
    } else {
      cartBadgeCount.classList.add("scale-0");
      if (mobileCartBadgeCount) mobileCartBadgeCount.classList.add("scale-0");
    }

    // Subtotal
    cartSubtotalEl.textContent = formatPrice(state.subtotal);

    // Barra de Frete Grátis
    if (shippingProgressBar && shippingText) {
      shippingProgressBar.style.width = `${state.shippingProgress}%`;
      if (state.isFreeShipping) {
        shippingText.innerHTML = `<span class="text-white font-medium">✦ Parabéns!</span> Você ganhou <strong>FRETE GRÁTIS</strong>`;
      } else {
        shippingText.innerHTML = `Faltam <strong>${formatPrice(state.remainingForFreeShipping)}</strong> para ganhar <strong>FRETE GRÁTIS</strong>`;
      }
    }

    // Itens da sacola
    if (state.items.length === 0) {
      cartEmptyState.classList.remove("hidden");
      cartItemsContainer.classList.add("hidden");
      checkoutBtn.disabled = true;
      checkoutBtn.classList.add("opacity-50", "cursor-not-allowed");
    } else {
      cartEmptyState.classList.add("hidden");
      cartItemsContainer.classList.remove("hidden");
      checkoutBtn.disabled = false;
      checkoutBtn.classList.remove("opacity-50", "cursor-not-allowed");

      cartItemsContainer.innerHTML = state.items
        .map(
          (item) => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
            
            <div class="cart-item-details">
              <div class="flex justify-between items-start gap-2">
                <h4 class="cart-item-title">${item.name}</h4>
                <button 
                  type="button" 
                  class="cart-item-remove-btn" 
                  onclick="cart.removeItem('${item.id}', '${item.size}')"
                  title="Remover peça da sacola"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div class="cart-item-meta">
                <span class="cart-item-size">Tam: <strong>${item.size}</strong></span>
                <span class="cart-item-category">${item.categoryLabel}</span>
              </div>

              <div class="cart-item-bottom">
                <div class="qty-counter">
                  <button 
                    type="button" 
                    class="qty-btn" 
                    onclick="cart.updateQuantity('${item.id}', '${item.size}', -1)"
                    title="Diminuir"
                  >
                    -
                  </button>
                  <span class="qty-display">${item.quantity}</span>
                  <button 
                    type="button" 
                    class="qty-btn" 
                    onclick="cart.updateQuantity('${item.id}', '${item.size}', 1)"
                    title="Aumentar"
                  >
                    +
                  </button>
                </div>

                <span class="cart-item-price">${formatPrice(item.price * item.quantity)}</span>
              </div>
            </div>
          </div>
        `
        )
        .join("");
    }
  });

  // 4. CHECKOUT DEMONSTRATIVO
  checkoutBtn.addEventListener("click", () => {
    const state = cart.getState();
    if (state.items.length === 0) return;

    checkoutTotalEl.textContent = formatPrice(state.subtotal);
    checkoutSummaryList.innerHTML = state.items
      .map(
        (item) => `
        <div class="checkout-summary-row">
          <span>${item.name} (${item.size}) × ${item.quantity}</span>
          <span>${formatPrice(item.price * item.quantity)}</span>
        </div>
      `
      )
      .join("");

    closeCartDrawer();
    checkoutModal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  });

  function closeCheckoutModal() {
    checkoutModal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }

  closeCheckoutBtn.addEventListener("click", closeCheckoutModal);
  checkoutBackdrop.addEventListener("click", closeCheckoutModal);

  checkoutConfirmBtn.addEventListener("click", () => {
    cart.clearCart();
    closeCheckoutModal();
    showToast("Demonstração concluída com sucesso! Sacola reiniciada.");
  });

  // 5. MENU MOBILE
  if (mobileMenuToggle && mobileMenuDrawer) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenuDrawer.classList.remove("-translate-x-full");
      document.body.classList.add("overflow-hidden");
    });

    closeMobileMenuBtn.addEventListener("click", () => {
      mobileMenuDrawer.classList.add("-translate-x-full");
      document.body.classList.remove("overflow-hidden");
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuDrawer.classList.add("-translate-x-full");
        document.body.classList.remove("overflow-hidden");
      });
    });
  }

  // 6. TOAST NOTIFICATIONS
  window.showToast = function (message) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-white">✦</span>
        <span>${message}</span>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("toast-show");
    }, 10);

    setTimeout(() => {
      toast.classList.remove("toast-show");
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3500);
  };

  // 7. GUIA DE TAMANHOS / TABELA DE MEDIDAS (MODAL)
  const sizeGuideModal = document.getElementById("size-guide-modal");
  const openSizeGuideBtn = document.getElementById("open-size-guide-btn");
  const closeSizeGuideBtn = document.getElementById("close-size-guide-btn");
  const sizeGuideBackdrop = document.getElementById("size-guide-backdrop");

  if (openSizeGuideBtn && sizeGuideModal) {
    openSizeGuideBtn.addEventListener("click", () => {
      sizeGuideModal.classList.remove("hidden");
    });

    const closeGuide = () => sizeGuideModal.classList.add("hidden");
    if (closeSizeGuideBtn) closeSizeGuideBtn.addEventListener("click", closeGuide);
    if (sizeGuideBackdrop) sizeGuideBackdrop.addEventListener("click", closeGuide);
  }

  // 8. POLÍTICA DE PRIVACIDADE DEMONSTRATIVA
  const privacyModal = document.getElementById("privacy-modal");
  const openPrivacyBtn = document.getElementById("open-privacy-btn");
  const closePrivacyBtn = document.getElementById("close-privacy-btn");
  const privacyBackdrop = document.getElementById("privacy-backdrop");

  if (openPrivacyBtn && privacyModal) {
    openPrivacyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      privacyModal.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
    });

    const closePrivacy = () => {
      privacyModal.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    };
    if (closePrivacyBtn) closePrivacyBtn.addEventListener("click", closePrivacy);
    if (privacyBackdrop) privacyBackdrop.addEventListener("click", closePrivacy);
  }

  // 9. NEWSLETTER DEMONSTRATIVA
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector("input[type='email']");
      if (emailInput && emailInput.value) {
        showToast("Inscrição VIP confirmada! Você receberá os avisos de novos drops.");
        emailInput.value = "";
      }
    });
  }

  // 10. SIMULADOR DE CEP DEMO
  const shippingCalcBtn = document.getElementById("shipping-calc-btn");
  const shippingInput = document.getElementById("shipping-cep-input");
  const shippingResult = document.getElementById("shipping-calc-result");

  if (shippingCalcBtn && shippingInput && shippingResult) {
    shippingCalcBtn.addEventListener("click", () => {
      const cep = shippingInput.value.replace(/\D/g, "");
      if (cep.length !== 8) {
        shippingResult.innerHTML = `<span class="text-rose-400">Digite um CEP válido com 8 dígitos.</span>`;
        shippingResult.classList.remove("hidden");
        return;
      }
      shippingResult.innerHTML = `
        <div class="shipping-option">
          <span>Sedex Express (1 a 2 dias úteis)</span>
          <strong class="text-white">R$ 18,90</strong>
        </div>
        <div class="shipping-option">
          <span>PAC Standard (4 a 6 dias úteis)</span>
          <strong class="text-white">Grátis acima de R$ 199</strong>
        </div>
      `;
      shippingResult.classList.remove("hidden");
    });
  }

  // Inicialização
  renderProducts("todos");
});
